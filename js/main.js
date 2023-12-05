import ScrollObserver from './scrollObserver.js';
import SectionController from './sectionController.js';

window.onload = function() {

  const _canvas = document.getElementById('canvas');
  const navigation = document.getElementById('nav');

  const scrollObserver = new ScrollObserver(_canvas);
  const sectionController = new SectionController({
    navigation
  });

  scrollObserver.onChange((points) => {
    sectionController.setSectionByPoints(points);
  });

  navigation.addEventListener('click', (event) => {
    event.stopPropagation();
    const { target } = event;
    if (_canvas.classList.contains('heading')) {
      _canvas.classList.remove('heading');
      scrollObserver.activate();
    }
    if (target.tagName === 'A') {
      const points = target.getAttribute('data-points');
      scrollObserver.points = points;
    }
  });

}
