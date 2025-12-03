import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProjectForm from "./ProjectForm";

type CreateProjectDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateProjectDialog({
  open,
  onClose,
}: CreateProjectDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 1,
        }}
      >
        <Stack spacing={0.5}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Create a new project
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Capture scope and deadlines. You can add collaborators later.
          </Typography>
        </Stack>
        <IconButton onClick={onClose} aria-label="Close dialog">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ px: { xs: 2, md: 3 }, py: { xs: 1.5, md: 2 } }}
      >
        <ProjectForm />
      </DialogContent>
    </Dialog>
  );
}

export default CreateProjectDialog;
