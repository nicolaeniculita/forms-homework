import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { Education } from '../../shared/models/education.model';
import { Experience } from '../../shared/models/experience.model';
import { User } from '../../shared/models/user.model';
import { UsersService } from '../../shared/services/users.service';
import { ProfileSectionComponent } from '../profile-section/profile-section.component';
import { RandomColorDirective } from '../../shared/directives/random-color.directive';
import { IfCurrentUserDirective } from '../../shared/directives/if-current-user.directive';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatChipsModule,
    MatIconModule,
    AvatarComponent,
    ProfileSectionComponent,
    RandomColorDirective,
    IfCurrentUserDirective,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly usersService = inject(UsersService);

  protected user: User | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (!Number.isFinite(id) || id <= 0) {
        this.user = null;
        return;
      }

      this.usersService.getUserById(id).subscribe((user) => {
        this.user = user;
      });
    });
  }

  protected get fullName(): string {
    if (!this.user) {
      return '';
    }

    return `${this.user.firstName} ${this.user.lastName}`;
  }

  protected get profileSubtitle(): string {
    if (!this.user) {
      return '';
    }

    return `${this.user.headline} · ${this.user.location}`;
  }

  protected trackExperience(index: number, exp: Experience): string {
    return `${exp.company}|${exp.title}|${exp.startDate}|${index}`;
  }

  protected trackEducation(index: number, edu: Education): string {
    return `${edu.institution}|${edu.degree}|${edu.fieldOfStudy}|${edu.startYear}|${index}`;
  }

  protected trackSkill(index: number, skill: string): string {
    return `${skill}|${index}`;
  }
}
