export default class FileReader {
  static readAsText(file: File): Promise<string | ArrayBuffer | null>;
  static read(
    file: File,
    type: "text" | "arraybuffer" | "dataurl"
  ): Promise<string | ArrayBuffer | null>;
}
