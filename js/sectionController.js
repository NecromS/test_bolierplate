export default class SectionController {
  constructor(param) {
    const { navigation } = param;
    this._navigation = navigation;
    this._section = -1;
  }

  get section() {
    return this._section;
  }

  set section(value) {
    if (value === this._section) {
      return;
    }
    this._section = Number(value)
    this._removeNavSelection();
    this._navigation.children[this._section].classList.add('active')
  }

  setSectionByPoints(value) {
    if (value >= 0 && value <= 1000) {
      this.section = 1;
    } else if (value > 1000 && value <= 2000) {
      this.section = 2;
    } else if (value > 2000 && value <= 3000) {
      this.section = 3;
    }
  }

  _removeNavSelection() {
    [...this._navigation.children].forEach((element) => {
      element.classList.remove('active');
    });
  }

}

