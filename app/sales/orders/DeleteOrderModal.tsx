import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteOrderModalProps {
  open: boolean;
  order: {
    dr: string;
    description: string;
  } | null;
  onDelete: () => void;
  onClose: () => void;
}

export default function DeleteOrderModal({ open, order, onDelete, onClose }: DeleteOrderModalProps) {
  if (!order) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Order</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          Are you sure you want to delete order <b>{order.dr}</b> ({order.description})?
        </div>
        <DialogFooter>
          <Button variant="destructive" onClick={onDelete}>Delete</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 