import { Directive, HostListener, Input, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive({
  selector: '[appInfoIcon]',
  standalone: true,
})
export class InfoIconDirective {
  @Input() appInfoIcon = 'Please fill in all required fields and make changes before saving.';

  private readonly snackBar = inject(MatSnackBar);

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.snackBar.dismiss();
    this.snackBar.open(this.appInfoIcon, 'Close', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
