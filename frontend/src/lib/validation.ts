const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HTML_TAG_REGEX = /<[^>]*>/g;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function sanitizeInput(input: string): string {
  return input.replace(HTML_TAG_REGEX, "").trim();
}

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value.trim()) return `${fieldName} is required`;
  return null;
}

export function validateMinLength(value: string, min: number, fieldName: string): string | null {
  if (value.trim().length < min) return `${fieldName} must be at least ${min} characters`;
  return null;
}

export function validateMaxLength(value: string, max: number, fieldName: string): string | null {
  if (value.length > max) return `${fieldName} must be at most ${max} characters`;
  return null;
}

export function validateFileSize(file: File, maxBytes = MAX_FILE_SIZE): string | null {
  if (file.size > maxBytes) return `File must be under ${Math.round(maxBytes / 1024 / 1024)}MB`;
  return null;
}

export function validateFileType(file: File, allowed: string[]): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !allowed.includes(ext)) return `File type must be: ${allowed.join(", ")}`;
  return null;
}

export function escapeHtml(str: string): string {
  const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return str.replace(/[&<>"']/g, (c) => map[c]);
}
