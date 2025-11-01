"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, Trash2, TriangleAlertIcon } from "lucide-react";

interface ConfirmDeleteModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteModal({
  open,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="w-auto flex flex-col gap-1200 rounded-800 bg-[var(--surface)] p-1200">
        <DialogHeader className="flex flex-col gap-600">
          <DialogTitle className="flex flex-row gap-300 items-center">
            <TriangleAlertIcon className="icon-size-l text-yellow-500"/>
            <span className="body-xxl-label text-secondary">
                Are you sure my dear friend?
            </span>
          </DialogTitle>
          <p className="body-l text-primary">
            If you go now, your information will be lost. <br/> 
            Do you  really want to delete your experience?
          </p>
        </DialogHeader>
        <div className="flex flex-row justify-between w-full">
          <Button variant="outlineDestructive" size="custom" className="px-600 py-400 gap-250" onClick={onConfirm}>
            Delete Experience
            <Trash2 className="icon-size-s"/>
          </Button>
          <Button variant="teal" size="custom" className="px-600 py-400 gap-250" onClick={onCancel}>
            Go Back
            <ChevronRight className="icon-size-s"/>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
