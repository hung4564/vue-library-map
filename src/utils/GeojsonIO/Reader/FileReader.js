export default class FileReader {
  /**
   * Read file as text
   *
   * @param {File} file
   */
  static async readAsText(file) {
    const content = await this.read(file, "Text");
    return content;
  }

  /**
   * Using FileReader to read file content
   *
   * @param {File} file
   * @param {String} type in:text,arraybuffer,dataurl
   */
  static async read(file, type) {
    return new Promise((resolve, reject) => {
      var reader = new window.FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (err) => reject(err);

      type = type.toLowerCase();

      if (type === "text") {
        reader.readAsText(file);
      } else if (type === "arraybuffer") {
        reader.readAsArrayBuffer(file);
      } else if (type === "dataurl") {
        reader.readAsDataURL(file);
      } else {
        reject(new Error(`Read file as ${type} is not available`));
      }
    });
  }
}
