

export default class ScrollObserver {

  constructor(elem) {
    this._point = 0;
    this._state = 0;
    this._changeHandlers = [];
    this._onWheel = this._onWheel.bind(this);
    this._bindTo(elem);
  }

  get points() {
    return this._point;
  }

  set points(value) {
    value = Number(value)
    if (!this._state) {
      return;
    }
    if (this._point === value) {
      return;
    }
    if (this._point < 0) {
      this._point = 0;
    } else if (this._point > 3000) {
      this._point = 3;
    }
    this._changeHandlers.forEach((handler) => {
      handler(value, this._point);
    });
    this._point = value;
  }

  activate() {
    this._state = 1;
  }

  onChange(handler) {
    if (typeof handler !== 'function') {
      return;
    }
    this._changeHandlers.push(handler);
  }

  _bindTo(elem) {
    if ('onwheel' in document) {
      // IE9+, FF17+, Ch31+
      elem.addEventListener("wheel", this._onWheel);
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      elem.addEventListener("mousewheel", this._onWheel);
    } else {
      // Firefox < 17
      elem.addEventListener("MozMousePixelScroll", this._onWheel);
    }
  }

  _onWheel(event) {
    event = event || window.event;

    // wheelDelta не даёт возможность узнать количество пикселей
    const delta = event.deltaY || event.detail || event.wheelDelta;


    this.points = this.points + delta;

    // event.preventDefault ? event.preventDefault() : (event.returnValue = false);

    // todo remove
    // const info = document.getElementById('delta');
    // info.innerHTML = this.pos;
  }

}

