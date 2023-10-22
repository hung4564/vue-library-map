export default class FileReader {
  static async readAsText(file: File) {
    const content = await this.read(file, "text");
    return content;
  }

  static async read(
    file: File,
    type: "text" | "arraybuffer" | "dataurl"
  ): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onload = (e) => e.target && resolve(e.target.result);
      reader.onerror = (err) => reject(err);

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
