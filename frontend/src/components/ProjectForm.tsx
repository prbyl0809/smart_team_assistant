import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCreateProject } from '../hooks/useCreateProject';

type FormData = {
  name: string;
  description: string;
};

export default function ProjectForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const mutation = useCreateProject();

  const onSubmit = (data: FormData) => {
    mutation.mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} mb={4}>
      <TextField
        label="Project Name"
        fullWidth
        margin="normal"
        {...register('name', { required: 'Project name is required' })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        {...register('description')}
      />
      <Button type="submit" variant="contained" color="primary" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create Project'}
      </Button>
    </Box>
  );
}
