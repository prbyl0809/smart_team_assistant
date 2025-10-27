import { FormEvent, ReactNode, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { colors } from "../../../shared/styles/colors";
import { formatDateTime } from "../../../shared/utils/date";
import { ProjectComment } from "../../../types/comment";
import { useProjectComments } from "../hooks/useProjectComments";
import { useCreateProjectComment } from "../hooks/useCreateProjectComment";
import { useUpdateProjectComment } from "../hooks/useUpdateProjectComment";
import { useDeleteProjectComment } from "../hooks/useDeleteProjectComment";
import { useCurrentUser } from "../../users/hooks/useCurrentUser";

type ProjectCommentsCardProps = {
  projectId: number;
};

type TabKey = "comments" | "activity" | "history";

const getErrorMessage = (error: unknown) => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object"
  ) {
    const response = error.response as {
      data?: { detail?: string };
      statusText?: string;
    };
    return (
      response.data?.detail ??
      response.statusText ??
      "Request failed. Please try again."
    );
  }
  return error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";
};

export default function ProjectCommentsCard({
  projectId,
}: ProjectCommentsCardProps) {
  const { data: currentUser } = useCurrentUser();
  const currentUserId = currentUser?.id ?? null;
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: comments = [],
    isLoading,
    isError,
    error,
  } = useProjectComments(projectId);
  const { mutateAsync: createComment, isPending: isCreating } =
    useCreateProjectComment(projectId);
  const { mutateAsync: updateComment } = useUpdateProjectComment(projectId);
  const { mutateAsync: deleteComment } = useDeleteProjectComment(projectId);

  const [tab, setTab] = useState<TabKey>("comments");

  const sortedComments = useMemo(
    () =>
      [...comments].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ),
    [comments]
  );

  const handleCreateComment = async (body: string) => {
    const trimmed = body.trim();
    if (!trimmed) {
      enqueueSnackbar("Comment cannot be empty.", { variant: "warning" });
      throw new Error("Comment cannot be empty.");
    }
    try {
      await createComment({ body: trimmed });
      enqueueSnackbar("Comment posted.", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: "error" });
      throw err;
    }
  };

  const handleUpdateComment = async (commentId: number, body: string) => {
    const trimmed = body.trim();
    if (!trimmed) {
      enqueueSnackbar("Comment text cannot be empty.", { variant: "warning" });
      throw new Error("Comment text cannot be empty.");
    }
    try {
      await updateComment({ commentId, payload: { body: trimmed } });
      enqueueSnackbar("Comment updated.", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: "error" });
      throw err;
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmed) return;

    try {
      await deleteComment({ commentId });
      enqueueSnackbar("Comment deleted.", { variant: "success" });
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: "error" });
      throw err;
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: `1px solid ${colors.border.subtle}`,
        backgroundColor: colors.base.surface,
        px: { xs: 2.5, md: 3 },
        py: { xs: 2.5, md: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Stack spacing={0.5}>
        <Typography variant="h6">Collaboration</Typography>
        <Typography variant="body2" color="text.secondary">
          Capture decisions, hand-offs, and follow-ups in context.
        </Typography>
      </Stack>

      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        textColor="inherit"
        sx={{
          borderBottom: `1px solid ${colors.border.subtle}`,
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 500,
            color: colors.text.secondary,
            minWidth: 0,
          },
          "& .Mui-selected": {
            color: colors.text.primary,
          },
        }}
      >
        <Tab label="Comments" value="comments" />
        <Tab label="Activity" value="activity" />
        <Tab label="History" value="history" />
      </Tabs>

      {tab === "comments" && (
        <Stack spacing={2.5}>
          {isLoading ? (
            <Box display="flex" justifyContent="center" py={3}>
              <CircularProgress size={28} />
            </Box>
          ) : isError ? (
            <Typography color="error">{getErrorMessage(error)}</Typography>
          ) : (
            <CommentList
              comments={sortedComments}
              currentUserId={currentUserId}
              onUpdate={handleUpdateComment}
              onDelete={handleDeleteComment}
            />
          )}

          <CommentComposer
            disabled={isCreating}
            onSubmit={handleCreateComment}
          />
        </Stack>
      )}

      {tab === "activity" && (
        <PlaceholderPanel>
          Activity feed will appear here to show real-time updates and actions
          taken by team members.
        </PlaceholderPanel>
      )}

      {tab === "history" && (
        <PlaceholderPanel>
          Change history will be displayed here to track modifications and
          updates made to the project over time.
        </PlaceholderPanel>
      )}
    </Box>
  );
}

type CommentListProps = {
  comments: ProjectComment[];
  currentUserId: number | null;
  onUpdate: (commentId: number, body: string) => Promise<void>;
  onDelete: (commentId: number) => Promise<void>;
};

type CommentComposerProps = {
  disabled: boolean;
  onSubmit: (body: string) => Promise<void>;
};

function CommentComposer({ disabled, onSubmit }: CommentComposerProps) {
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit(body);
      setBody("");
    } catch {
      // errors surfaced via toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={1.5}>
        <TextField
          label="Add a comment"
          placeholder="Share an update or ask a question..."
          multiline
          minRows={3}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          disabled={disabled || isSubmitting}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            disabled={disabled || isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post comment"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

function CommentList({
  comments,
  currentUserId,
  onUpdate,
  onDelete,
}: CommentListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [savingId, setSavingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const beginEdit = (comment: ProjectComment) => {
    setEditingId(comment.id);
    setEditingValue(comment.body);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingValue("");
  };

  const submitEdit = async (commentId: number) => {
    try {
      setSavingId(commentId);
      await onUpdate(commentId, editingValue);
      cancelEditing();
    } catch {
      // toast already displayed upstream
    } finally {
      setSavingId(null);
    }
  };

  const deleteComment = async (commentId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmed) return;

    try {
      setDeletingId(commentId);
      await onDelete(commentId);
      if (editingId === commentId) {
        cancelEditing();
      }
    } catch {
      // toast already displayed upstream
    } finally {
      setDeletingId(null);
    }
  };

  if (!comments.length) {
    return (
      <Typography color="text.secondary">
        No comments yet. Be the first to start the conversation.
      </Typography>
    );
  }

  return (
    <Stack spacing={2.5}>
      {comments.map((comment) => {
        const canManage = currentUserId === comment.author.id;
        const isEditing = editingId === comment.id;
        const isSaving = savingId === comment.id;
        const isRemoving = deletingId === comment.id;

        return (
          <Box
            key={comment.id}
            sx={{
              borderRadius: 2,
              border: `1px solid ${colors.border.subtle}`,
              backgroundColor: colors.base.surfaceAlt,
              px: 2.5,
              py: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1.25,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={1}
            >
              <Stack spacing={0.5}>
                <Typography fontWeight={600}>
                  {comment.author.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDateTime(comment.created_at)}
                  {comment.edited ? " • Edited" : ""}
                </Typography>
              </Stack>

              {canManage && (
                <Stack direction="row" spacing={1}>
                  {isEditing ? (
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => submitEdit(comment.id)}
                        disabled={isSaving}
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        size="small"
                        variant="text"
                        onClick={cancelEditing}
                        disabled={isSaving}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="small"
                        variant="text"
                        onClick={() => beginEdit(comment)}
                        disabled={isRemoving}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="text"
                        color="error"
                        onClick={() => deleteComment(comment.id)}
                        disabled={isRemoving}
                      >
                        {isRemoving ? "Deleting..." : "Delete"}
                      </Button>
                    </>
                  )}
                </Stack>
              )}
            </Stack>

            {isEditing ? (
              <TextField
                value={editingValue}
                onChange={(event) => setEditingValue(event.target.value)}
                multiline
                minRows={3}
                disabled={isSaving}
              />
            ) : (
              <Typography sx={{ whiteSpace: "pre-wrap" }}>
                {comment.body}
              </Typography>
            )}
          </Box>
        );
      })}
    </Stack>
  );
}

// Placeholder panel for non-implemented tabs
// TODO: Replace with real implementations later
function PlaceholderPanel({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: `1px dashed ${colors.border.subtle}`,
        backgroundColor: colors.base.surfaceAlt,
        px: 2.5,
        py: 2.5,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {children}
      </Typography>
    </Box>
  );
}
