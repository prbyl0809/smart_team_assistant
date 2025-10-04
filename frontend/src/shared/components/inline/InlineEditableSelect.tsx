import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export type InlineEditableSelectOption<T extends string> = {
  value: T;
  label: string;
  color?: string;
};

export type InlineEditableSelectProps<T extends string> = {
  value: T;
  options: InlineEditableSelectOption<T>[];
  onSave: (value: T) => Promise<void> | void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
};

function InlineEditableSelect<T extends string>({
  value,
  options,
  onSave,
  label,
  placeholder,
  disabled = false,
}: InlineEditableSelectProps<T>) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<T>(value);
  const [saving, setSaving] = useState(false);

  const activeOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  useEffect(() => {
    if (!editing) {
      setDraft(value);
    }
  }, [value, editing]);

  const handleStartEdit = () => {
    if (disabled) return;
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setDraft(value);
  };

  const handleSave = async () => {
    if (draft === value) {
      setEditing(false);
      return;
    }

    setSaving(true);
    try {
      await onSave(draft);
      setEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <Box>
        <FormControl size="small">
          <Select
            value={draft}
            onChange={(event) => setDraft(event.target.value as T)}
            autoFocus
            displayEmpty
          >
            {label ? (
              <MenuItem disabled value={"" as T}>
                <em>{label}</em>
              </MenuItem>
            ) : null}
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" spacing={1} mt={1}>
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
          "&:hover .InlineEditableSelect-edit": {
            opacity: disabled ? 0 : 1,
          },
        }}
      >
        {activeOption ? (
          <Chip
            label={activeOption.label}
            size="small"
            sx={(theme) => {
              const background = activeOption.color ?? theme.palette.grey[200];
              return {
                bgcolor: background,
                color: theme.palette.getContrastText(background),
                fontWeight: 600,
              };
            }}
          />
        ) : (
          <Chip
            label={placeholder || "Select value"}
            size="small"
            variant="outlined"
          />
        )}
        {!disabled && (
          <EditIcon
            className="InlineEditableSelect-edit"
            fontSize="small"
            color="action"
            sx={{ opacity: 0, transition: "opacity 0.2s ease" }}
          />
        )}
      </Box>
    </Tooltip>
  );
}

export default InlineEditableSelect;
