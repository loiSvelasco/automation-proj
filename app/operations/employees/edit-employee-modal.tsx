import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Employee } from "./page"

interface EditEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
  employee: Employee | null;
}

export default function EditEmployeeModal({ open, onClose, onEdit, employee }: EditEmployeeModalProps) {
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
  useEffect(() => {
    if (employee) {
      const { id, ...rest } = employee
      setForm(rest)
    }
  }, [employee])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (employee) onEdit({ ...form, id: employee.id } as Employee)
  }
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
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
            <Button type="submit" className="bg-gray-800 text-white">Save Changes</Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 