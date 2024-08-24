export function trimCode(code: string) {
  const lines = code.split("\n");

  return lines
    .filter((_, index) => index !== 0 && index !== lines.length - 1)
    .join("\n")
    .trim();
}
