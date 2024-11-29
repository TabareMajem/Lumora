export const parseJsonField = <T>(field: string | null): T | null => {
  if (!field) return null;
  try {
    return JSON.parse(field) as T;
  } catch {
    return null;
  }
};

export const stringifyJsonField = (field: unknown): string => {
  return JSON.stringify(field);
};