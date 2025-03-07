'use client'

import { Button, Input, Card, Text } from "@heroui/react"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <Card className="max-w-md w-full p-6 shadow-lg">
        <Text h2 className="text-center mb-4">
          Doctor Admin Login
        </Text>
        <form className="space-y-4">
          <Input
            fullWidth
            clearable
            bordered
            labelPlaceholder="Email"
            type="email"
            required
          />
          <Input
            fullWidth
            clearable
            bordered
            labelPlaceholder="Password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" color="primary">
            Sign In
          </Button>
        </form>
        <div className="text-center mt-4">
          <Text size={14}>
            Don't have an account? <a href="#" className="text-blue-500">Sign Up</a>
          </Text>
        </div>
      </Card>
    </div>
  )
}

