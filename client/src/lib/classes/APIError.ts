import { FieldError } from '../types/general-types';

export default class APIError {
  message: string;
  validationErrors?: FieldError[];
  constructor(message: string, validationErrors?: FieldError[]) {
    this.message = message;
    this.validationErrors = validationErrors;
  }

  getFieldError(field: string) {
    return this.validationErrors?.find((err) => err.path === field)?.message;
  }
}
