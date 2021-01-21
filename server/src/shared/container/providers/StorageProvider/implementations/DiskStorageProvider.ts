import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/UploadConfig';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, folder, file),
    );

    return file;
  }

  public async deleteFile(file: string, folder: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, folder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
