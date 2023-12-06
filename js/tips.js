const TIPS = [{
  id: 1,
  group: 'start',
  html: 'эй, псссс...'
}, {
  id: 2,
  group: 'start',
  recycle: true,
  html: '666 🤘'
}, {
  id: 3,
  recycle: true,
  html: 'используй колесико мыши или навигационное меню для перемещения между секциями страницы'
}]

export default class Tips {
  static rand() {

    // todo удалить
    // localStorage.removeItem('tips');

    const tipsIds = (localStorage.getItem('tips') || '').split('|').map(Number);
    for (let i = 0; i < TIPS.length; i++) {
      const tip = TIPS[i];
      if (!tipsIds.includes(tip.id)) {
        tipsIds.push(tip.id);
        localStorage.setItem('tips', tipsIds.join('|'));
        return tip.html;
      }
    }

    const processedIds = TIPS
      .filter((tip) => !tip.recycle)
      .map((tip) => tip.id);
    localStorage.setItem('tips', processedIds.join('|'));
    return Tips.rand();
  }
}
