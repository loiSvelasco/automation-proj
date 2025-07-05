import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Employee } from "./page"

interface DeleteEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  employee: Employee | null;
}

export default function DeleteEmployeeModal({ open, onClose, onDelete, employee }: DeleteEmployeeModalProps) {
  if (!employee) return null
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Employee</DialogTitle>
        </DialogHeader>
        <div className="py-4">Are you sure you want to delete <span className="font-semibold">{employee.firstName} {employee.lastName}</span>?</div>
        <DialogFooter>
          <Button onClick={() => onDelete(employee.id)} className="bg-red-600 text-white">Delete</Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 