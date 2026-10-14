/** Storage is optional: blocked storage must never prevent someone exploring. */
export function readStorage(key: string, session = false): string | null {
  try {
    return (session ? sessionStorage : localStorage).getItem(key);
  } catch {
    return null;
  }
}
export function writeStorage(
  key: string,
  value: string,
  session = false,
): void {
  try {
    (session ? sessionStorage : localStorage).setItem(key, value);
  } catch {
    /* private/blocked storage: keep using the desktop */
  }
}
