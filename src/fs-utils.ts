import * as fs from 'fs-extra';

function escapeReplacementString(input: string): string {
  return input.replace(/\$/g, '$$');
}

export abstract class FsUtils {
  static async changeFileContent(filePath: string, transformContent: (originalContent: string) => string | PromiseLike<string>, fileEncoding: Parameters<Buffer['toString']>['0'] = 'utf-8'): Promise<void> {
    const originalContent = (await fs.readFile(filePath)).toString(fileEncoding);
    const newContent = await Promise.resolve(transformContent(originalContent));
    if (originalContent !== newContent) {
      await fs.writeFile(filePath, newContent);
    }
  }

  static async replaceContentInFile(filePath: string, matchPattern: RegExp, buildReplacementString: () => string | PromiseLike<string>, fileEncoding: Parameters<Buffer['toString']>['0'] = 'utf-8'): Promise<void> {
    await FsUtils.changeFileContent(
      filePath,
      fileContent => Promise.resolve(buildReplacementString()).then(replacementString => fileContent.replace(matchPattern, replacementString)),
      fileEncoding,
    );
  }

  static async addSurrounding(filePath: string, matchPattern: RegExp, addBefore: string, addAfter: string, fileEncoding: Parameters<Buffer['toString']>['0'] = 'utf-8'): Promise<void> {
    await FsUtils.changeFileContent(
      filePath,
      fileContent => fileContent.replace(matchPattern, escapeReplacementString(addBefore ?? '') + '$1' + escapeReplacementString(addAfter ?? '')),
      fileEncoding,
    );
  }

  static async replaceWithFileContent(filePath: string, matchPattern: RegExp, contentFilePath: string, fileEncoding: Parameters<Buffer['toString']>['0'] = 'utf-8'): Promise<void> {
    const replacementFileContent = (await fs.readFile(contentFilePath)).toString(fileEncoding);
    const escapedReplacementString = escapeReplacementString(replacementFileContent);
    await FsUtils.replaceContentInFile(
      filePath,
      matchPattern,
      () => escapedReplacementString,
      fileEncoding,
    );
  }
}

export const changeFileContent = FsUtils.changeFileContent;
export const replaceContentInFile = FsUtils.replaceContentInFile;
export const addSurrounding = FsUtils.addSurrounding;
export const replaceWithFileContent = FsUtils.replaceWithFileContent;