import { Directive, Input, OnInit, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Directive({
  selector: '[appTechIcons]',
  standalone: true,
  host: {
    '[style.color]': 'iconColor',
  },
})
export class TechIconsDirective implements OnInit {
  @Input() appTechIcons: string | null = null;

  protected iconColor = '#3178c6';

  private readonly matIcon = inject(MatIcon, { self: true });

  private readonly techIcons = [
    { keyword: 'angular', name: 'angular', color: '#dd0031' },
    { keyword: 'javascript', name: 'javascript', color: '#f7df1e' },
    { keyword: 'typescript', name: 'typescript', color: '#3178c6' },
    { keyword: 'nestjs', name: 'nestjs', color: '#e0234e' },
    { keyword: 'nest', name: 'nestjs', color: '#e0234e' },
    { keyword: 'node', name: 'nodejs', color: '#539e43' },
    { keyword: 'rxjs', name: 'rxjs', color: '#b7178c' },
    { keyword: 'html', name: 'html', color: '#e34f26' },
    { keyword: 'css', name: 'css', color: '#1572b6' },
    { keyword: 'sql', name: 'sql', color: '#4479a1' },
    { keyword: 'mysql', name: 'sql', color: '#4479a1' },
    { keyword: 'git', name: 'git', color: '#f05032' },
  ];

  ngOnInit(): void {
    const headline = (this.appTechIcons ?? '').toLowerCase();

    const match = this.techIcons.find((tech) => headline.includes(tech.keyword));

    if (match) {
      this.matIcon.svgIcon = match.name;
      this.iconColor = match.color;
      return;
    }

    this.matIcon.svgIcon = 'typescript';
    this.iconColor = '#3178c6';
  }
}
