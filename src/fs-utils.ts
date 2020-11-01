import * as fs from 'fs-extra';

export abstract class FsUtils {
  /**
   * Escape the '$' sign in the string for using the string as the second argument to String.replace(...)
   * @param input the original string
   * @returns a new string with all '$' in the original string being replaced by '$$'
   */
  static escapeRegExpReplacement(input: string): string {
    return input.replace(/\$/g, '$$');
  }

  /**
   * Change the text file content.
   * This function loads the full content of the file into memory as string, so that it is not suitable for huge (for example, > 500MB) files.
   * If the new content and original content are the same, the file won't be touched.
   * @param filePath path to the file
   * @param transformContent function for getting the new file content
   * @param fileEncoding encoding of the file
   */
  static async changeFileContent(filePath: string, transformContent: (originalContent: string, filePath: string) => string | PromiseLike<string>, fileEncoding: Parameters<Buffer['toString']>['0'] = 'utf-8'): Promise<void> {
    const originalContent = (await fs.readFile(filePath)).toString(fileEncoding);
    const newContent = await Promise.resolve(transformContent(originalContent, filePath));
    if (originalContent !== newContent) {
      await fs.writeFile(filePath, newContent);
    }
  }

  /**
   * Replace the matching sections in the text file.
   * @param filePath path to the file
   * @param matchPattern RegExp for deciding which section of the file would be replaced. You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?`
   * @param replacementOrBuilder The replacement string or a function for building the replacement string.
   *                              Please note that you can use special replacement patterns but also you need to take care of the escaping.
   *                              For details of special replacement patterns see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
   * @param fileEncoding encoding of the file
   */
  static async replaceInFile(filePath: string, matchPattern: RegExp, replacementOrBuilder: string | ((matchPattern: RegExp, filePath: string) => string | PromiseLike<string>), fileEncoding: Parameters<Buffer['toString']>['0'] = 'utf-8'): Promise<void> {
    await FsUtils.changeFileContent(
      filePath,
      fileContent => Promise.resolve(typeof replacementOrBuilder === 'string' ? replacementOrBuilder : replacementOrBuilder(matchPattern, filePath))
                            .then(replacementString => fileContent.replace(matchPattern, replacementString)),
      fileEncoding,
    );
  }

  /**
   * Add surrounding content to the matching sections in the text file.
   * @param filePath path to the file
   * @param matchPattern RegExp for deciding which section of the file would be processed.
   *                    You must have a capturing group in the pattern.
   *                    You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?`
   * @param addBefore the string to be added before the capturing group, no need to escape anything
   * @param addAfter the string to be added before the capturing group, no need to escape anything
   * @param fileEncoding encoding of the file
   */
  static async addSurroundingInFile(filePath: string, matchPattern: RegExp, addBefore: string, addAfter: string, fileEncoding: Parameters<Buffer['toString']>['0'] = 'utf-8'): Promise<void> {
    await FsUtils.changeFileContent(
      filePath,
      fileContent => fileContent.replace(matchPattern, FsUtils.escapeRegExpReplacement(addBefore ?? '') + '$1' + FsUtils.escapeRegExpReplacement(addAfter ?? '')),
      fileEncoding,
    );
  }

  /**
   * Replace the matching sections in the text file with content from another file.
   * @param filePath path of the file
   * @param matchPattern RegExp for deciding which section of the file would be replaced.
   *                    You must have a capturing group in the pattern.
   *                    You may want to use these tricks: `m` flag, `g` flag, `s` flag, `[\s\S]*`, `.*?`
   * @param contentFilePath path of the file for getting the replacement content
   * @param fileEncoding encoding of the files
   */
  static async replaceInFileWithFileContent(filePath: string, matchPattern: RegExp, contentFilePath: string, fileEncoding: Parameters<Buffer['toString']>['0'] = 'utf-8'): Promise<void> {
    await FsUtils.replaceInFile(
      filePath,
      matchPattern,
      () => fs.readFile(contentFilePath)
              .then(buffer => buffer.toString(fileEncoding))
              .then(content => FsUtils.escapeRegExpReplacement(content)),
      fileEncoding,
    );
  }
}

export const escapeRegExpReplacement = FsUtils.escapeRegExpReplacement;
export const changeFileContent = FsUtils.changeFileContent;
export const replaceInFile = FsUtils.replaceInFile;
export const addSurroundingInFile = FsUtils.addSurroundingInFile;
export const replaceInFileWithFileContent = FsUtils.replaceInFileWithFileContent;