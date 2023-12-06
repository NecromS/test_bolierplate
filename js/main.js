import ScrollObserver from './scrollObserver.js';
import SectionController from './sectionController.js';
import IMessage from './imessage.js';
import Tips from './tips.js';

window.onload = function() {

  const _canvas = document.getElementById('canvas');
  const navigation = document.getElementById('nav');
  const avatar = document.getElementById('bg-avatar');
  const _imessage = document.getElementById('imessage');

  const sections = document.getElementsByClassName('section');

  const imessage = new IMessage(_imessage);
  const scrollObserver = new ScrollObserver(_canvas);
  const sectionController = new SectionController({
    navigation,
    sections
  });

  scrollObserver.onChange((points) => {
    sectionController.setSectionByPoints(points);
  });

  // click by nav elements
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

  // click by photo image and get tips
  avatar.addEventListener('click', (event) => {
    event.stopPropagation();
    imessage.append(Tips.rand());
  });

}
