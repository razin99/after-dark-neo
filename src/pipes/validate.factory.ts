import { UnprocessableEntityException, ValidationError } from '@nestjs/common';

export function classValidatorMessage(errors: ValidationError[]) {
  throw new UnprocessableEntityException(
    errors.map((e) => e.constraints).flatMap((c) => Object.values(c)),
  );
}
