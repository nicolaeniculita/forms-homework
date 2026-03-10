import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { UsersService } from '../../shared/services/users.service';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-network-table',
  standalone: true,
  imports: [MatCardModule, MatTableModule, AvatarComponent],
  templateUrl: './network-table.component.html',
  styleUrl: './network-table.component.scss',
})
export class NetworkTableComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly router = inject(Router);

  protected displayedColumns: Array<'name' | 'headline' | 'location' | 'connections'> = [
    'name',
    'headline',
    'location',
    'connections',
  ];

  protected users: User[] = [];

  ngOnInit(): void {
    this.usersService.allUsers().subscribe((users) => {
      this.users = users;
    });
  }

  protected openProfile(user: User): void {
    this.router.navigate(['/users', user.id]);
  }
}
