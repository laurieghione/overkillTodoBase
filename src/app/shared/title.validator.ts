import { AbstractControl } from '@angular/forms';

export class TitleValidator {
  static blankValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (control.value && control.value.match(/^\s*$/)) {
      return { blank: true };
    }
    return null;
  }
}
