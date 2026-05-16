export function parseListInput(value: string): string[] {
  return value
    .split(/[\n,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function stringifyListInput(value: string[] | null | undefined): string {
  return Array.isArray(value) ? value.join('\n') : '';
}

export function contentToParagraphs(value: string | string[] | null | undefined): string[] {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (!value) {
    return [];
  }

  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
