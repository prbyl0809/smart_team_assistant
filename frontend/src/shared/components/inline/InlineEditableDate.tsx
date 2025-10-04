import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export type InlineEditableDateProps = {
  value: string | null;
  onSave: (value: string | null) => Promise<void> | void;
  label?: string;
  disabled?: boolean;
};

const toInputValue = (value: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
};

const toDisplayValue = (value: string | null) => {
  if (!value) return "No due date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export default function InlineEditableDate({
  value,
  onSave,
  label,
  disabled = false,
}: InlineEditableDateProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(() => toInputValue(value));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editing) {
      setDraft(toInputValue(value));
    }
  }, [value, editing]);

  const handleStartEdit = () => {
    if (disabled) return;
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setDraft(toInputValue(value));
  };

  const handleSave = async () => {
    const hasChanges = draft !== toInputValue(value);
    if (!hasChanges) {
      setEditing(false);
      return;
    }

    const payload = draft ? `${draft}T00:00:00Z` : null;

    setSaving(true);
    try {
      await onSave(payload);
      setEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => {
    setDraft("");
  };

  if (editing) {
    return (
      <Box>
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <TextField
            type="date"
            label={label}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <Button onClick={handleClear} disabled={!draft} size="small">
            Clear
          </Button>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <CircularProgress size={18} /> : "Save"}
          </Button>
          <Button size="small" onClick={handleCancel} disabled={saving}>
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
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          cursor: disabled ? "default" : "pointer",
          color: value ? "text.primary" : "text.secondary",
          "&:hover .InlineEditableDate-edit": {
            opacity: disabled ? 0 : 1,
          },
        }}
      >
        <CalendarMonthIcon
          fontSize="small"
          color={value ? "action" : undefined}
        />
        <Typography fontWeight={500}>{toDisplayValue(value)}</Typography>
      </Box>
    </Tooltip>
  );
}
