"use client"

import { useState } from "react"
import { Users, Clock, DollarSign, Plus, UserCheck } from "lucide-react"
import {
  Button,
  ButtonGroup,
  Card,
  Input,
  Select,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  getKeyValue,
  Chip,
} from "@heroui/react"

const PatientQueue = () => {
  const today = new Date().toISOString().split("T")[0]

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      status: "Waiting",
      doctor: "Dr. Smith",
      queueNumber: 1,
      consultationFee: 150,
      appointmentTime: "09:00",
      joinedAt: new Date(),
    },
  ])

  const [newPatient, setNewPatient] = useState({
    name: "",
    doctor: "",
    appointmentTime: "",
    consultationFee: 150,
  })

  // Calculate summary metrics
  const totalPatients = patients.length
  const completedPatients = patients.filter((p) => p.status === "Completed").length
  const totalFees = patients.filter((p) => p.status === "Completed").reduce((sum, p) => sum + p.consultationFee, 0)
  const averageWaitTime = 15
  const nextPatient = patients.find((p) => p.status === "Waiting")

  const addPatient = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setNewPatient({ ...newPatient, appointmentTime:time })
    const newPatientData = {
      id: patients.length + 1,
      ...newPatient,
      status: "Waiting",
      queueNumber: Math.max(...patients.map((p) => p.queueNumber), 0) + 1,
      joinedAt: new Date(),
    }
    setPatients([...patients, newPatientData])
    setNewPatient({ name: "", doctor: "", appointmentTime: "", consultationFee: 150 })
    onOpenChange()
  }

  const updatePatientStatus = (patientId: number, newStatus: string) => {
    setPatients(patients.map((patient) => (patient.id === patientId ? { ...patient, status: newStatus } : patient)))
  }

  const columns = [
    { key: "queueNumber", label: "Queue #" },
    { key: "name", label: "Patient" },
    { key: "appointmentTime", label: "Time" },
    { key: "waitTime", label: "Wait Time" },
    { key: "status", label: "Status" },
    { key: "doctor", label: "Doctor" },
    { key: "actions", label: "Actions" },
  ]

  const rows = patients.map((patient) => ({
    ...patient,
    waitTime: patient.status !== "Completed"
      ? Math.floor((new Date().getTime() - new Date(patient.joinedAt).getTime()) / 60000) + " min"
      : "-",
    actions: (
      <ButtonGroup>
        {patient.status === "Waiting" && (
          <Button
            color="primary"
            size="sm"
            onClick={() => updatePatientStatus(patient.id, "In Progress")}
          >
            Start
          </Button>
        )}
        {patient.status === "In Progress" && (
          <Button
            color="success"
            size="sm"
            onClick={() => updatePatientStatus(patient.id, "Completed")}
          >
            Complete
          </Button>
        )}
      </ButtonGroup>
    ),
  }))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "success"
      case "In Progress":
        return "primary"
      case "Waiting":
        return "warning"
      default:
        return "default"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Today's Queue</h1>
          <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Users className="h-10 w-10 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Patients Today</p>
              <h3 className="text-2xl font-bold">{totalPatients}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Users className="h-10 w-10 text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <h3 className="text-2xl font-bold">{completedPatients}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Clock className="h-10 w-10 text-purple-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Wait Time</p>
              <h3 className="text-2xl font-bold">{averageWaitTime} min</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <DollarSign className="h-10 w-10 text-orange-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Today's Revenue</p>
              <h3 className="text-2xl font-bold">₹{totalFees}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <UserCheck className="h-10 w-10 text-red-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Next Patient</p>
              <h3 className="text-2xl font-bold">{nextPatient ? nextPatient.name : "None"}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Queue Management */}
      <Card>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">Current Queue</h2>
          <Button color="primary" size="sm" onClick={onOpen}>
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>

        <Modal isDismissable={false} isKeyboardDismissDisabled={true} isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add New Patient</ModalHeader>
                <ModalBody>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Patient Name</label>
                      <Input
                        value={newPatient.name}
                        onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                        placeholder="Enter patient name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Doctor</label>
                      <Input
                        value={newPatient.doctor}
                        onChange={(e) => setNewPatient({ ...newPatient, doctor: e.target.value })}
                        placeholder="Enter Doctor name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Consultation Fee</label>
                      <Input
                        type="text"
                        value={newPatient.consultationFee}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!isNaN(Number(value))) {
                            setNewPatient({ ...newPatient, consultationFee: Number(value) });
                          }
                        }}
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={addPatient}>
                    Add to Queue
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <div className="p-6">
          <Table aria-label="Patient Queue Table">
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.id} className={item.status === "In Progress" ? "border-2 border-blue-300" : ""}>

                  {(columnKey) => columnKey !== "queueNumber"? (
                    <TableCell>
                      {columnKey === "status" ? (
                        <Chip color={getStatusColor(item.status)}>{item.status}</Chip>
                      ) : (
                        getKeyValue(item, columnKey)
                      )}
                    </TableCell>
                  ):                  <TableCell>
                  {item.status === "In Progress" && (
                    <span className="inline-block w-2 h-2 mr-2 bg-blue-200 rounded-full animate-blink"></span>
                  )}
                  {item.queueNumber}
                </TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}

export default PatientQueue