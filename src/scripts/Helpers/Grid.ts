class Grid {
  root: CSSStyleDeclaration
  $el: HTMLDivElement
  columnsCount: number

  constructor() {

    this.root = getComputedStyle(document.querySelector(':root'));
    this.$el = document.createElement('div');

    document.body.append(this.$el);
    // this.$el.classList.add("grid-tpl");
    this.$el.classList.add("grid-tpl", "hide");

    this.init();
    this.bindEvents();
  }

  init() {
    this.handleColumns()
  }

  bindEvents() {
    window.addEventListener('resize', () => this._onResize());
    window.addEventListener('keydown', (evt) => {
      
      /*
        * ctrlKey: ctrl (window);
        * metaKey: CMD (apple);
      */
      const { key, shiftKey, ctrlKey, metaKey } = evt;
      const isWindow = key === 'G' && shiftKey && ctrlKey;
      const isApple = key === 'G' && shiftKey && metaKey;

      if( isWindow || isApple) {
        evt.preventDefault()
        this.$el.classList.toggle("hide");
      }
    })
  }

  _onResize() {
    this.handleColumns()
  }

  handleColumns() {
    this.columnsCount = parseInt(this.root.getPropertyValue('--columns-count'));
    this.createColumns()
  }

  createColumns() {
    let html = '';
    for (let index = 0; index < this.columnsCount; index++) {
      html += "<div class='col'></div>"
    }
    this.$el.innerHTML = html
  }
}

export default Grid