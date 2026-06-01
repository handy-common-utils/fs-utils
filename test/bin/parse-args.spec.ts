import { expect } from 'chai';

import { parseArgs } from '../../src/bin/parse-args';

// Simulate process.argv: first two elements are node and script path.
function argv(...args: string[]): string[] {
  return ['node', 'script', ...args];
}

describe('parseArgs', () => {
  it('returns empty flags and all positional args when --flags is absent', () => {
    const { flags, args } = parseArgs(argv('file.txt', 'pattern', 'replacement'));
    expect(flags).to.eq('');
    expect(args).to.deep.eq(['file.txt', 'pattern', 'replacement']);
  });

  it('extracts --flags when placed before positional args', () => {
    const { flags, args } = parseArgs(argv('--flags', 'g', 'file.txt', 'pattern', 'replacement'));
    expect(flags).to.eq('g');
    expect(args).to.deep.eq(['file.txt', 'pattern', 'replacement']);
  });

  it('extracts --flags when placed in the middle of positional args', () => {
    const { flags, args } = parseArgs(argv('file.txt', '--flags', 'gi', 'pattern', 'replacement'));
    expect(flags).to.eq('gi');
    expect(args).to.deep.eq(['file.txt', 'pattern', 'replacement']);
  });

  it('extracts --flags when placed after positional args', () => {
    const { flags, args } = parseArgs(argv('file.txt', 'pattern', 'replacement', '--flags', 'gm'));
    expect(flags).to.eq('gm');
    expect(args).to.deep.eq(['file.txt', 'pattern', 'replacement']);
  });

  it('supports multi-character flags values', () => {
    const { flags, args } = parseArgs(argv('--flags', 'gims', 'file.txt', 'pattern'));
    expect(flags).to.eq('gims');
    expect(args).to.deep.eq(['file.txt', 'pattern']);
  });

  it('returns empty flags and empty args when no arguments are provided', () => {
    const { flags, args } = parseArgs(argv());
    expect(flags).to.eq('');
    expect(args).to.deep.eq([]);
  });

  it('does not mutate the original argv array', () => {
    const input = argv('--flags', 'g', 'file.txt', 'pattern');
    const original = [...input];
    parseArgs(input);
    expect(input).to.deep.eq(original);
  });
});
