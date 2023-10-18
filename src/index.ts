import { PackingError } from './PackingError';

export class Packer {
  /**
   * 
   * @param {String} filePath relative or absolute file path
   * @throws {PackingError} if unable to pack
   * @returns {Promise<String>} solution
   */
  async pack(filePath: string): Promise<string> {
    return 'solution'
  }
}