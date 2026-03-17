import { Directive, HostListener, Input, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[appSaveButton]',
  standalone: true,
})
export class SaveButtonDirective {
  @Input() appSaveButton = 'Profile changes saved successfully.';

  private readonly snackBar = inject(MatSnackBar);

  @HostListener('click')
  onClick(): void {
    this.snackBar.dismiss();
    this.snackBar.open(this.appSaveButton, 'Close', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
