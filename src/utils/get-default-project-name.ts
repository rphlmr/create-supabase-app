export function getDefaultProjectName(projectDir: string) {
  const separator = process.platform === "win32" ? `\\` : `/`;

  return projectDir.split(separator).pop();
}
