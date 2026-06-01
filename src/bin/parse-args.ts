/**
 * @module
 * @ignore
 */

/**
 * Parse command line arguments, extracting flags and remaining arguments.
 * Recognizes the `--flags` option and its value, removing them from the positional arguments.
 * @param argv Command line arguments array (e.g., process.argv)
 * @returns flags and remaining positional arguments
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
