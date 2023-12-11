const MISSED_SECTION = -1;

/**
 * functional for switching between sections (areas), navigation items,
 *  controlling active element. link elements with each other
 */
export default class SectionController {

    constructor(param) {
        const {navigation, sections} = param;
        this._navigation = navigation;
        this._section = MISSED_SECTION;
        this._sections = sections;
        this._sectionEndPoint = [...this._navigation.children]
            .map((child) => Number(child.getAttribute('data-points')))
    }

    get section() {
        return this._section;
    }

    set section(value) {
        if (typeof value !== 'number' ||
            value === MISSED_SECTION ||
            value === this._section) {
            return;
        }
        // !important - don't break an order of methods
        this._removeSelection();
        this._section = Number(value)
        this.activeNavItem.classList.add('nav-active');
        this.activeSection.classList.add('section-active');
        const sectionAlias = this.activeNavItem.href.split('#')[1];
        if (sectionAlias === window.location.hash.substring(1)) {
            return;
        }
        window.history.pushState(null, this.activeNavItem.innerText, `#${sectionAlias}`)
    }

    get activeNavItem() {
        return this._navigation.children[this._section - 1];
    }

    get activeSection() {
        return [...this._sections]
            .find((elem) => Number(elem.getAttribute('data-section')) === this._section);
    }

    getSectionByPoints(value) {
        let bufferEnpPoint = 0;
        for (let i = 0; i < this._sectionEndPoint.length; i++) {
            let sectionEndPoint = this._sectionEndPoint[i];
            if (value >= bufferEnpPoint && value <= sectionEndPoint) {
                return i + 1;
            }
            bufferEnpPoint = ++sectionEndPoint;
        }
    }

    getSectionByAlias(value) {
        const navItem = [...this._navigation.children]
            .find((child) => child.href.split('#')[1] === value);
        if (!navItem) {
            return;
        }
        return this.getSectionByPoints(navItem.getAttribute('data-points'));
    }

    _removeSelection() {
        if (this._section === MISSED_SECTION) {
            return;
        }
        this.activeNavItem.classList.remove('nav-active');
        this.activeSection.classList.remove('section-active');
    }

}
