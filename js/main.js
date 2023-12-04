window.onload = function() {

  const elem = document.getElementById('canvas');

  if ('onwheel' in document) {
    // IE9+, FF17+, Ch31+
    elem.addEventListener("wheel", onWheel);
  } else if ('onmousewheel' in document) {
    // устаревший вариант события
    elem.addEventListener("mousewheel", onWheel);
  } else {
    // Firefox < 17
    elem.addEventListener("MozMousePixelScroll", onWheel);
  }

  function onWheel(_event) {
    _event = _event || window.event;

    // wheelDelta не даёт возможность узнать количество пикселей
    const delta = _event.deltaY || _event.detail || _event.wheelDelta;
    const info = document.getElementById('delta');

    info.innerHTML = +info.innerHTML + delta;
    // _event.preventDefault ? _event.preventDefault() : (_event.returnValue = false);
  }

}

