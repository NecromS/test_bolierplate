import ScrollObserver from './scroll-observer.js';
import SectionController from './section-controller.js';
import IMessage from './imessage.js';
import Tips from './tips.js';


window.onload = function () {

    const _canvas = document.getElementById('canvas');
    const navigation = document.getElementById('nav');
    const loading = document.getElementById('loading');
    const avatar = document.getElementById('bg-avatar');
    const _imessage = document.getElementById('imessage');

    const sections = document.getElementsByClassName('section');

    const imessage = new IMessage(_imessage);
    const scrollObserver = new ScrollObserver(_canvas);
    const sectionController = new SectionController({
        navigation,
        sections
    });

    function initialize() {
        _canvas.classList.remove('heading');
        scrollObserver.activate();
    }

    scrollObserver.onChange((points) => {
        sectionController.section = sectionController.getSectionByPoints(points);
    });

    // click by nav elements
    navigation.addEventListener('click', (event) => {
        event.stopPropagation();
        const { target } = event;

        // initialize scroll observe from main page
        if (_canvas.classList.contains('heading')) {
            initialize();
        }

        if (target.tagName === 'A') {
            scrollObserver.points = target.getAttribute('data-points');
        }
    });

    // click by photo image and get tips
    avatar.addEventListener('click', (event) => {
        event.stopPropagation();
        imessage.append(Tips.rand());
    });

    const urlHash = window.location.hash.substring(1);
    if (urlHash) {
        initialize();
        sectionController.section = sectionController.getSectionByAlias(urlHash);
    }

    setTimeout(() => {
        loading.style.display = 'none';
    }, 300);

}
