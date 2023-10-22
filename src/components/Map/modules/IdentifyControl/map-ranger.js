export function startBoxRangerMap(canvas, cb_bbox) {
  let can_draw = true;
  // Variable to hold the starting xy coordinates
  // when `mousedown` occured.
  let start;

  // Variable to hold the current xy coordinates
  // when `mousemove` or `mouseup` occurs.
  let current;

  // Variable for the draw box element.
  let box;

  // Set `true` to dispatch the event before other functions
  // call it. This is necessary for disabling the default map
  // dragging behaviour.
  canvas.addEventListener("mousedown", mouseDown, true);

  // Return the xy coordinates of the mouse position
  function mousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left - canvas.clientLeft,
      y: e.clientY - rect.top - canvas.clientTop
    };
  }

  function mouseDown(e) {
    // // Continue the rest of the function if the shiftkey is pressed.
    // if (!(e.shiftKey && e.button === 0)) return;
    // Disable default drag zooming when the shift key is held down.

    // Call functions for the following events
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("keydown", onKeyDown);

    // Capture the first xy coordinates
    start = mousePos(e);
  }

  function onMouseMove(e) {
    if (!can_draw) return;
    // Capture the ongoing xy coordinates
    current = mousePos(e);

    // Append the box element if it doesnt exist
    if (!box) {
      box = document.createElement("div");
      box.classList.add("boxdraw");
      canvas.appendChild(box);
    }

    const minX = Math.min(start.x, current.x),
      maxX = Math.max(start.x, current.x),
      minY = Math.min(start.y, current.y),
      maxY = Math.max(start.y, current.y);

    // Adjust width and xy position of the box element ongoing
    const pos = `translate(${minX}px, ${minY}px)`;
    box.style.transform = pos;
    box.style.width = maxX - minX + "px";
    box.style.height = maxY - minY + "px";
  }

  function onMouseUp(e) {
    // Capture xy coordinates
    finish([start, mousePos(e)]);
  }

  function onKeyDown(e) {
    // If the ESC key is pressed
    if (e.keyCode === 27) finish();
  }

  function finish(bbox) {
    // Remove these events now that finish has been called.
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("mouseup", onMouseUp);
    if (box) {
      box.parentNode.removeChild(box);
      box = null;
    }
    // If bbox exists. use this value as the argument for `queryRenderedFeatures`
    if (bbox && cb_bbox) {
      cb_bbox(bbox);
    }
  }
  function destroy() {
    // Remove these events now that finish has been called.
    canvas.removeEventListener("mousedown", mouseDown);
    can_draw = false;
    cb_bbox = null;
    finish();
  }
  return {
    destroy: destroy
  };
}
