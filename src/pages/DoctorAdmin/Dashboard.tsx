import { Button, Card, CardFooter, CardHeader, TableHeader, TableRow, TableBody, TableCell, Avatar, Progress, TableColumn, CardBody, Table } from '@heroui/react';
import { Calendar, UserPlus, ArrowUp, Users, ArrowRight, ArrowUpRight, DollarSign, Heart, Badge, Clock, CreditCard, Activity, PieChart } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const DoctorDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
          <p className="text-gray-500">Welcome back, Dr. Smith</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="bordered">
            <Calendar className="mr-2 h-4 w-4" />
            Today
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            New Patient
          </Button>
        </div>
      </header>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardBody className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
                <h3 className="text-2xl font-bold mt-1">1,248</h3>
                <div className="flex items-center mt-1 text-emerald-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">12% from last month</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="text-blue-600 " onClick={() => navigate('/mypatients')}>
              View all patients
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardBody className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                <h3 className="text-2xl font-bold mt-1">8</h3>
                <div className="flex items-center mt-1 text-emerald-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="text-sm">3 pending</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="text-purple-600 " onClick={() =>navigate("/queue")} >
              View schedule
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardBody className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                <h3 className="text-2xl font-bold mt-1">₹45,820</h3>
                <div className="flex items-center mt-1 text-emerald-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">18% increase</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="text-green-600 " onClick={() => navigate('/payments')}>
              Financial reports
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardBody className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Patient Satisfaction</p>
                <h3 className="text-2xl font-bold mt-1">94%</h3>
                <div className="flex items-center mt-1 text-emerald-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">5% increase</span>
                </div>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Heart className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="text-amber-600 ">
              View feedback
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients Section */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            Recent Patients
            <Button variant="bordered" size="sm">View All</Button>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHeader>
                  <TableColumn>Patient</TableColumn>
                  <TableColumn>Status</TableColumn>
                  <TableColumn>Last Visit</TableColumn>
                  <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: 'Rahul Sharma',
                    avatar: 'RS',
                    status: 'scheduled',
                    lastVisit: 'Today, 10:30 AM',
                  },
                  {
                    name: 'Priya Patel',
                    avatar: 'PP',
                    status: 'completed',
                    lastVisit: 'Yesterday, 3:15 PM',
                  },
                  {
                    name: 'Amit Kumar',
                    avatar: 'AK',
                    status: 'pending',
                    lastVisit: 'Feb 18, 2025',
                  },
                  {
                    name: 'Neha Gupta',
                    avatar: 'NG',
                    status: 'cancelled',
                    lastVisit: 'Feb 15, 2025',
                  },
                  {
                    name: 'Vikram Singh',
                    avatar: 'VS',
                    status: 'completed',
                    lastVisit: 'Feb 12, 2025',
                  },
                ].map((patient, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600">
                            {patient.avatar}
                          </div>
                        </Avatar>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-gray-500">Patient ID: P-{1000 + i}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge color={
                        patient.status === 'completed' ? 'success' :
                          patient.status === 'scheduled' ? 'default' :
                            patient.status === 'pending' ? 'warning' : 'destructive'
                      }>
                        {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8">
                          <Clock className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8">
                          <CreditCard className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8">
                          <Activity className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
           Medications
            <Button variant="bordered" size="sm">Update Inventory</Button>
          </CardHeader>
          <CardBody>
            
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-500 mb-3">Most Prescribed Medications</p>
              <div className="space-y-2">
                {[
                  { name: 'Paracetamol', count: 42, stock: 'Good' },
                  { name: 'Amlodipine', count: 28, stock: 'Good' },
                  { name: 'Metformin', count: 26, stock: 'Low' },
                ].map((med, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <p className="text-sm">{med.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{med.count} prescriptions</span>
                      <Badge variant={med.stock === 'Good' ? 'success' : 'destructive'} className="text-xs">
                        {med.stock}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button variant="bordered" className="w-full">
              Manage Medications
            </Button>
          </CardFooter>
        </Card>

        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;