import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly formBuilder = inject(FormBuilder);

  protected currentUser: User | null = null;
  protected saving = false;
  protected saveError: string | null = null;
  protected saveSuccess = false;

  protected readonly form = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    headline: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    dateOfBirth: ['', [Validators.required]],
    location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    phone: [
      '',
      [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(20),
        Validators.pattern(/^\+?[0-9 ()-]{7,20}$/),
      ],
    ],
    website: [
      '',
      [Validators.required, Validators.maxLength(200), Validators.pattern(/^https?:\/\/.+/i)],
    ],
    about: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  });

  ngOnInit(): void {
    this.usersService.currentUser().subscribe((user) => {
      this.currentUser = user;

      this.form.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        headline: user.headline,
        dateOfBirth: user.dateOfBirth,
        location: user.location,
        email: user.email,
        phone: user.phone,
        website: user.website,
        about: user.about,
      });
    });
  }

  protected submit(): void {
    this.saveSuccess = false;
    this.saveError = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.currentUser) {
      return;
    }

    const updated: User = {
      ...this.currentUser,
      ...this.form.getRawValue(),
    };

    this.saving = true;

    this.usersService.updateUser(updated).subscribe({
      next: () => {
        this.saving = false;
        this.saveSuccess = true;
      },
      error: (err: unknown) => {
        this.saving = false;
        this.saveError = err instanceof Error ? err.message : 'Failed to save changes.';
      },
    });
  }
}
