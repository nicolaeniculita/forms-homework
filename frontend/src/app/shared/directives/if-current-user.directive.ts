import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { take } from 'rxjs';
import { UsersService } from '../services/users.service';

@Directive({
  selector: '[appIfCurrentUser]',
  standalone: true,
})
export class IfCurrentUserDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly usersService = inject(UsersService);

  @Input()
  set appIfCurrentUser(userId: number | string | null | undefined) {
    this.viewContainerRef.clear();

    if (userId == null) {
      return;
    }

    this.usersService
      .currentUser()
      .pipe(take(1))
      .subscribe((currentUser) => {
        if (String(currentUser.id) === String(userId)) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      });
  }
}