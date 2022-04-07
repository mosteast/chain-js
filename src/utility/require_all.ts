import { Invalid_argument } from '../error/invalid_argument';

export function require_all(args: Record<string, any>): void {
  const lack = [];

  for (const key in args) {
    const value = args[key];
    if (value === undefined) {
      lack.push(key);
    }
  }

  if (lack.length) {
    throw new Invalid_argument(lack);
  }
}
