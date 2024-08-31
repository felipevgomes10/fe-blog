export function indentCode(code: string, indentLevel = 2) {
  const indent = " ".repeat(indentLevel);
  let currentIndent = 0;

  return code
    .split("\n")
    .map((line) => {
      line = line.trim();

      if (line.endsWith("}")) currentIndent -= 1;

      const indentedLine = indent.repeat(currentIndent) + line;

      if (line.endsWith("{")) currentIndent += 1;

      return indentedLine;
    })
    .filter((line, index) => index !== 0 || line)
    .join("\n");
}
