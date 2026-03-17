import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() appHighlight: string | null = null;

  @HostBinding('style.background-color') backgroundColor: string | null = null;

  private readonly angularColor = '#fff3cd';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.hasAngularInHeadline()) {
      this.backgroundColor = this.angularColor;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.backgroundColor = null;
  }

  private hasAngularInHeadline(): boolean {
    return (this.appHighlight ?? '').toLowerCase().includes('angular');
  }
}