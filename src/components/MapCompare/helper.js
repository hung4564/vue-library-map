export function MapCompareSwiper(el, div_1, div_2) {
  let _bounds = div_2.getBoundingClientRect();

  let _onDown = (e) => {
    if (e.touches) {
      document.addEventListener("touchmove", _onMove);
      document.addEventListener("touchend", _onTouchEnd);
    } else {
      document.addEventListener("mousemove", _onMove);
      document.addEventListener("mouseup", _onMouseUp);
    }
  };

  let _onMove = (e) => {
    _setPosition(_getX(e));
  };
  let _getX = (e) => {
    e = e.touches ? e.touches[0] : e;
    var x = e.clientX - _bounds.left;
    if (x < 0) x = 0;
    if (x > _bounds.width) x = _bounds.width;
    return x;
  };
  let _onMouseUp = () => {
    document.removeEventListener("mousemove", _onMove);
    document.removeEventListener("mouseup", _onMouseUp);
  };

  let _onTouchEnd = () => {
    document.removeEventListener("touchmove", _onMove);
    document.removeEventListener("touchend", _onTouchEnd);
  };

  let _setPosition = (x) => {
    x = Math.min(x, _bounds.width);
    var pos = "translate(" + x + "px, 0)";
    el.style.transform = pos;
    el.style.WebkitTransform = pos;
    let clipA = "rect(0, " + x + "px, " + _bounds.height + "px, 0)";
    let clipB = "rect(0, 999em, " + _bounds.height + "px," + x + "px)";

    div_1.style.clip = clipA;
    div_2.style.clip = clipB;
  };
  el.addEventListener("mousedown", _onDown);
  el.addEventListener("touchstart", _onDown);
  let clear = () => {
    el.removeEventListener("mousedown", _onDown);
    el.removeEventListener("touchstart", _onDown);
  };
  var swiperPosition = _bounds.width / 2;
  _setPosition(swiperPosition);
  return {
    clear
  };
}
