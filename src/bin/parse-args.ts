/**
 * @module
 * @ignore
 */

export function parseArgs(argv: string[]): { flags: string; args: string[] } {
  const args = argv.slice(2);
  const flagsIdx = args.indexOf('--flags');
  let flags = '';
  if (flagsIdx !== -1) {
    flags = args[flagsIdx + 1];
    args.splice(flagsIdx, 2);
  }
  return { flags, args };
}
