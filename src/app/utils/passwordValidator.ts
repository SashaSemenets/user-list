import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    if (!/\d/.test(value)) {
      return { 'noNumber': true };
    }

    if (!/[a-zA-Z]/.test(value)) {
      return { 'noLetter': true };
    }

    return null;
  };
}
