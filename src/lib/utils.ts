export type ClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const push = (input: ClassValue): void => {
    if (!input) {
      return;
    }

    if (typeof input === "string" || typeof input === "number") {
      classes.push(String(input));
      return;
    }

    if (Array.isArray(input)) {
      input.forEach(push);
      return;
    }

    Object.entries(input).forEach(([className, enabled]) => {
      if (enabled) {
        classes.push(className);
      }
    });
  };

  inputs.forEach(push);

  return classes.join(" ");
}
