import { ReactNode } from 'react';
import { SnackbarProvider as NotistackProvider } from 'notistack';

export function SnackbarProvider({ children }: { children: ReactNode }) {
  return (
    <NotistackProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={4000}
      preventDuplicate
    >
      {children}
    </NotistackProvider>
  );
}

