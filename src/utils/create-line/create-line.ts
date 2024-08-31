export function createLine(line: string, index: number) {
  return `<span class="text-slate-50 opacity-30">${index + 1}</span>\t ${line}`;
}
