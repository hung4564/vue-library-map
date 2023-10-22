export default class FileHelper {
  static getExtension(file: File) {
    return file.name.split(".").pop();
  }
}
