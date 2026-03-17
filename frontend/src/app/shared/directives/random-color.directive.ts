import { Directive, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appRandomColor]',
  standalone: true,
})
export class RandomColorDirective implements OnInit {
  @HostBinding('style.background-color') backgroundColor = '';

  private readonly colors = [
    '#e3f2fd',
    '#fce4ec',
    '#e8f5e9',
    '#fff3e0',
    '#ede7f6',
    '#f3e5f5',
    '#e0f7fa',
  ];

  ngOnInit(): void {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    this.backgroundColor = this.colors[randomIndex];
  }
}