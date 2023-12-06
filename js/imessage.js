const MAX_STACK = 4;
const MESSAGE_LIFETIME = 10000;

export default class IMessage {
  constructor(element) {
    this._element = element;
  }

  append(message) {

    if (!message) {
      return;
    }

    const node = document.createElement("p");
    node.classList.add('from-me');
    node.innerText = message;

    node.style.transition = 'opacity 1s, margin-right 0.5s';
    node.style['margin-right'] = '-300px';
    node.style.opacity = '0';

    node.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      this.removeMessage(node);
    });

    this._element.appendChild(node);

    setTimeout(() => {
      node.style['margin-right'] = '0';
      node.style.opacity = '1';
    }, 0);


    if (this._element.children.length > MAX_STACK) {
      this.removeMessage(this._element.children[0]);
    }

    setTimeout(() => {
      this.removeMessage(node);
    }, MESSAGE_LIFETIME);
  }

  removeMessage(node) {
    node.style.transition = 'opacity 0.3s, margin-right 1s';
    node.style['margin-right'] = '-300px';
    node.style.opacity = '0';
    setTimeout(() => this._element.removeChild(node), 600);
  }

  clear() {
    this._element.innerHTML = '';
  }

}
