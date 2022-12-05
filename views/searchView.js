class SearchView {
  _parentElement = document.querySelector(".search-form");

  query() {
    const query = this._parentElement.querySelector("input").value;
    this._clearInput();
    return query;
  }

  addHandlerRender(handlerFunction) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handlerFunction();
      document.querySelector(".search-results").dataset.type = "recipes";
    });
  }

  _clearInput() {
    this._parentElement.querySelector("input").value = "";
  }

  addHandlerHome(handlerFunction) {
    document.querySelector(".home-btn").addEventListener("click", function (e) {
      handlerFunction();
    });
  }
}

export default new SearchView();
