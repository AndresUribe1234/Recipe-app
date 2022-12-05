class BookmarkView {
  _parentElement = document.querySelector(".nav-bookmark");

  addHandlerRender(handlerFunction) {
    this._parentElement.addEventListener("click", function (e) {
      handlerFunction();
      document.querySelector(".search-results").dataset.type = "bookmarks";
    });
  }
}

export default new BookmarkView();
