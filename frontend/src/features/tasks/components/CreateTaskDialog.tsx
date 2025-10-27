import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import CreateTaskForm from "./CreateTaskForm";
import { User } from "../../../types/user";

type CreateTaskDialogProps = {
  open: boolean;
  onClose: () => void;
  projectId: number;
  users: User[];
};

export default function CreateTaskDialog({
  open,
  onClose,
  projectId,
  users,
}: CreateTaskDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" keepMounted={false}>
      <DialogTitle>Create task</DialogTitle>
      <DialogContent dividers>
        <CreateTaskForm
          projectId={projectId}
          users={users}
          hideHeading
          onSubmitted={onClose}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
