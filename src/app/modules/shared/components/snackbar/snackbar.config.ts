import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

type SnackbarState = 'success' | 'error' | 'warning';

export const SnackbarConfig = (
  state: SnackbarState,
  message: string,
  duration: number = 3000
) => ({
  duration: duration,
  data: { type: state, message },
  panelClass: [`snackbar--${state}`],
  verticalPosition: 'top' as MatSnackBarVerticalPosition,
});
