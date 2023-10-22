export function copyToClipboard(str: any) {
  if (!navigator.clipboard) {
    const el = document.createElement("textarea");
    el.value = str;
    el.style.position = "fixed";
    el.style.top = "0";
    el.style.left = "0";
    el.style.width = "2em";
    el.style.height = "2em";
    el.style.padding = "0";
    el.style.border = "none";
    el.style.outline = "none";
    el.style.boxShadow = "none";
    el.style.background = "transparent";

    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(el);
  } else {
    navigator.clipboard.writeText(str);
  }
}
