export default class ParentView {
  _data;

  render(data) {
    this._data = data;
    this.clear();
    this.renderFunction();
  }

  clear() {
    this._parentElement.innerHTML = "";
  }

  renderFunction() {}
}
