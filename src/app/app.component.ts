import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Strength = 'easy' | 'medium' | 'strong';
enum SectionColors {
  grey = '#a3a2a2',
  red = '#bb2f2f',
  green = '#33a033',
  yellow = '#d8ae3a',
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  password: string = '';
  sections: SectionColors[] = [SectionColors.grey, SectionColors.grey, SectionColors.grey];
  minPasswordLength = 8;

  getPasswordStrength(): Strength {
    const hasLetters = /[a-zA-Z]/.test(this.password);
    const hasDigits = /\d/.test(this.password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);

    if ((!hasLetters && !hasDigits)
      || (!hasDigits && !hasSymbols)
      || (!hasLetters && !hasSymbols)) {
      return 'easy';
    }

    if (!hasLetters || !hasDigits || !hasSymbols) {
      return 'medium';
    }

    return 'strong';
  }

  updateSectionColors(): void {
    if (!this.password) {
      this.sections = this.sections.map(() => SectionColors.grey);
      return;
    }

    if (this.password.length < this.minPasswordLength) {
      this.sections = this.sections.map(() => SectionColors.red);
      return;
    }

    const strength = this.getPasswordStrength();

    switch (strength) {
      case 'easy':
        this.sections = [SectionColors.red, SectionColors.grey, SectionColors.grey];
        break;

      case 'medium':
        this.sections = [SectionColors.yellow, SectionColors.yellow, SectionColors.grey];
        break;

      case 'strong':
        this.sections = this.sections.map(() => SectionColors.green);
    }
  }
}
