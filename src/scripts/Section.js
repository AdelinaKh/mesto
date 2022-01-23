export class Section {
  constructor({data, renderer}, container) {
    this._renderedItems = data;
    this._container = container;
    this._renderer = renderer;
  }
  addItem(element) {
    this._container.prepend(element)
  }
  renderItem() {
    Array.from(this._renderedItems).forEach(item => {
      this._renderer(item);
      this.addItem(this._renderer(item));
    });
  }
}
