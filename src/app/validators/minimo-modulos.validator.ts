import { FormArray, ValidationErrors } from '@angular/forms';

export function minimoCincoModulos(formArray: FormArray): ValidationErrors | null {
  return formArray.length >= 5 ? null : { minimoModulos: true };
}
