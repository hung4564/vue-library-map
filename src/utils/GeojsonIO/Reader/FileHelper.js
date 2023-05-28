export default class FileHelper {
  static getExtension(file) {
    return file.name.split(".").pop();
  }
}
