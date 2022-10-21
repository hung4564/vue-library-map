export class PrintableAreaManager {
  constructor(canvas, ratio = 1) {
    this.mapCanvas = canvas;
    this.ratio = ratio;
  }
  getCutSize() {
    return {
      width: this.cutWidth,
      height: this.cutHeight,
      startX: this.cutStartX,
      startY: this.cutStartY
    };
  }
  mapResize() {
    this.generateCutOut();
  }
  create() {
    this.createCanvas(this.mapCanvas.parentElement);
    this.generateCutOut();
  }
  createCanvas(container) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    const clientWidth = this.mapCanvas.clientWidth;
    const clientHeight = this.mapCanvas.clientHeight;
    svg.style.position = "absolute";
    svg.style.top = "0px";
    svg.style.left = "0px";
    svg.style["pointer-events"] = "none";
    svg.setAttribute("width", `${clientWidth}px`);
    svg.setAttribute("height", `${clientHeight}px`);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("style", "fill:#888888;stroke-width:0");
    path.setAttribute("fill-opacity", "0.5");
    svg.append(path);
    container.appendChild(svg);
    this.svgCanvas = svg;
    this.svgPath = path;
  }
  generateCutOut() {
    if (this.svgCanvas === undefined || this.svgPath === undefined) {
      return;
    }
    const clientWidth = this.mapCanvas.clientWidth;
    const clientHeight = this.mapCanvas.clientHeight;
    if (this.ratio >= 1) {
      this.cutWidth = Math.floor((clientHeight * 4) / 5 - 30);
      this.cutHeight = this.cutWidth / this.ratio;
    } else {
      this.cutHeight = Math.floor((clientHeight * 4) / 5 - 30);
      this.cutWidth = Math.floor(this.cutHeight * this.ratio);
    }
    this.cutStartX = clientWidth / 2 - this.cutWidth / 2;
    this.cutStartY = clientHeight / 2 - this.cutHeight / 2;
    const height = this.cutHeight;
    const width = this.cutWidth;
    const startX = this.cutStartX;
    const endX = startX + width;
    const startY = this.cutStartY;
    const endY = startY + height;

    this.svgCanvas.setAttribute("width", `${clientWidth}px`);
    this.svgCanvas.setAttribute("height", `${clientHeight}px`);
    this.svgPath.setAttribute(
      "d",
      `M 0 0 L ${clientWidth} 0 L ${clientWidth} ${clientHeight} L 0 ${clientHeight} M ${startX} ${startY} L ${startX} ${endY} L ${endX} ${endY} L ${endX} ${startY}`
    );
  }

  destroy() {
    if (this.svgCanvas !== undefined) {
      this.svgCanvas.remove();
      this.svgCanvas = undefined;
    }
  }
}
