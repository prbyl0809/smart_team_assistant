import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export type InlineEditableTextProps = {
  value: string;
  onSave: (value: string) => Promise<void> | void;
  placeholder?: string;
  multiline?: boolean;
  minRows?: number;
  label?: string;
  validate?: (value: string) => string | null;
  disabled?: boolean;
};

export default function InlineEditableText({
  value,
  onSave,
  placeholder,
  multiline = false,
  minRows,
  label,
  validate,
  disabled = false,
}: InlineEditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editing) {
      setDraft(value);
    }
  }, [value, editing]);

  const handleStartEdit = () => {
    if (disabled) return;
    setEditing(true);
    setError(null);
  };

  const handleCancel = () => {
    setEditing(false);
    setDraft(value);
    setError(null);
  };

  const handleSave = async () => {
    const nextValue = multiline ? draft : draft.trim();
    const validationError = validate?.(nextValue) ?? null;

    if (validationError) {
      setError(validationError);
      return;
    }

    if (nextValue === value) {
      setEditing(false);
      return;
    }

    setSaving(true);
    try {
      await onSave(nextValue);
      setEditing(false);
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to save changes";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <Box>
        <TextField
          fullWidth
          label={label}
          value={draft}
          multiline={multiline}
          minRows={multiline ? minRows ?? 3 : undefined}
          onChange={(event) => setDraft(event.target.value)}
          autoFocus
          error={Boolean(error)}
          helperText={error ?? " "}
        />
        <Stack direction="row" spacing={1} mt={1}>
          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? <CircularProgress size={18} /> : "Save"}
          </Button>
          <Button onClick={handleCancel} disabled={saving}>
            Cancel
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Tooltip
      title={disabled ? "Editing disabled" : "Click to edit"}
      placement="top"
    >
      <Box
        onClick={handleStartEdit}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: disabled ? "default" : "pointer",
          "&:hover .InlineEditableText-edit": {
            opacity: disabled ? 0 : 1,
          },
        }}
      >
        <Typography
          variant={multiline ? "body1" : "h5"}
          sx={{
            fontWeight: multiline ? 400 : 600,
            color: value ? "text.primary" : "text.secondary",
            fontStyle: value ? "normal" : "italic",
            whiteSpace: multiline ? "pre-line" : "normal",
          }}
        >
          {value || placeholder || "Add text"}
        </Typography>
        {!disabled && (
          <IconButton
            size="small"
            className="InlineEditableText-edit"
            sx={{ opacity: 0, transition: "opacity 0.2s ease" }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Tooltip>
  );
}
