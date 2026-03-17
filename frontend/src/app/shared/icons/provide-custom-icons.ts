import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {
  angularIcon,
  javascriptIcon,
  typescriptIcon,
  nestjsIcon,
  nodejsIcon,
  rxjsIcon,
  htmlIcon,
  cssIcon,
  sqlIcon,
  gitIcon,
} from './icons';

function registerCustomIcons(): void {
  const matIconRegistry = inject(MatIconRegistry);
  const domSanitizer = inject(DomSanitizer);

  matIconRegistry.addSvgIconLiteral('angular', domSanitizer.bypassSecurityTrustHtml(angularIcon));

  matIconRegistry.addSvgIconLiteral(
    'javascript',
    domSanitizer.bypassSecurityTrustHtml(javascriptIcon),
  );

  matIconRegistry.addSvgIconLiteral(
    'typescript',
    domSanitizer.bypassSecurityTrustHtml(typescriptIcon),
  );

  matIconRegistry.addSvgIconLiteral('nestjs', domSanitizer.bypassSecurityTrustHtml(nestjsIcon));

  matIconRegistry.addSvgIconLiteral('nodejs', domSanitizer.bypassSecurityTrustHtml(nodejsIcon));

  matIconRegistry.addSvgIconLiteral('rxjs', domSanitizer.bypassSecurityTrustHtml(rxjsIcon));

  matIconRegistry.addSvgIconLiteral('html', domSanitizer.bypassSecurityTrustHtml(htmlIcon));

  matIconRegistry.addSvgIconLiteral('css', domSanitizer.bypassSecurityTrustHtml(cssIcon));

  matIconRegistry.addSvgIconLiteral('sql', domSanitizer.bypassSecurityTrustHtml(sqlIcon));

  matIconRegistry.addSvgIconLiteral('git', domSanitizer.bypassSecurityTrustHtml(gitIcon));
}

export function provideCustomIcons(): Provider[] {
  return [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useValue: () => registerCustomIcons(),
    },
  ];
}
