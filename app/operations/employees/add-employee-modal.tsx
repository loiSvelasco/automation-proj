import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Employee } from "./page"

interface AddEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (employee: Employee) => void;
}

export default function AddEmployeeModal({ open, onClose, onAdd }: AddEmployeeModalProps) {
  const [form, setForm] = useState<Omit<Employee, "id">>({
    employeeId: "",
    firstName: "",
    lastName: "",
    position: "",
    permissions: "",
    status: "Active",
    email: "",
    username: "",
    password: ""
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({ ...form, id: Date.now() } as Employee)
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input name="employeeId" placeholder="Employee ID" value={form.employeeId} onChange={handleChange} required />
          <Input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
          <Input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          <Input name="position" placeholder="Position" value={form.position} onChange={handleChange} required />
          <Input name="permissions" placeholder="Permissions" value={form.permissions} onChange={handleChange} required />
          <Input name="status" placeholder="Status" value={form.status} onChange={handleChange} required />
          <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <Input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          <Input name="password" placeholder="Password" value={form.password} onChange={handleChange} required type="password" />
          <DialogFooter>
            <Button type="submit" className="bg-gray-800 text-white">Add Employee</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 