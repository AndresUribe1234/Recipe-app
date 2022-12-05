import ParentView from "./parentView.js";

class RecipesDetailsView extends ParentView {
  _parentElement = document.querySelector(".recipe-details-container");

  instructions() {
    this.clear();
    const html = `
    <span class="initial-message"
          >Click on any of the dishes to see the details of its recipe! 📃</span
    `;
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  renderFunction() {
    const html = `
            <div class="image-details-container">
              <img src="${this._data.image_url}" />
            </div>         
            <h1>${this._data.title}</h1>
            <span class="list-title">Ingredients</span>
            <ul class="recipe-details-list"></ul>
            <a href="${this._data.source_url}">Website: ${this._data.publisher}</a>
            <div class="bookmark-btn">
              <div class="icon-container">
                <img class="bookmark-icon" src="https://cdn-icons-png.flaticon.com/128/3106/3106777.png" />
              </div>
              <h1>Bookmark recipe</h1>
            </div>
            `;
    this._parentElement.insertAdjacentHTML("afterbegin", html);
    this._data.ingredients.forEach((ele) => {
      const ingredient = document.createElement("li");
      ingredient.textContent = ele;
      const detailsList = document.querySelector(".recipe-details-list");
      detailsList.appendChild(ingredient);
    });

    this._parentElement.dataset.idRecipe = this._data.recipe_id;
  }

  checkRenderBookmark(data) {
    if (
      data.some((ele) => ele.recipe_id === this._parentElement.dataset.idRecipe)
    ) {
      const bookmark = this._parentElement.querySelector(".bookmark-icon");
      bookmark.classList.add("bookmarked");
      bookmark.src = "https://cdn-icons-png.flaticon.com/128/102/102279.png";
      bookmark.style.opacity = 0.6;
      this._parentElement.dataset.bookmark = "addBookmark";
    }
  }

  addHandlerRender(handlerFunction, handlerFunction2) {
    this._parentElement.addEventListener("click", function (e) {
      const target = e.target;
      const bookmark = target.closest(".bookmark-icon");

      if (!bookmark) return;

      bookmark.classList.toggle("bookmarked");

      if (bookmark.classList.contains("bookmarked")) {
        bookmark.src = "https://cdn-icons-png.flaticon.com/128/102/102279.png";
        bookmark.style.opacity = 0.6;
        this.dataset.bookmark = "addBookmark";
      } else {
        bookmark.src =
          "https://cdn-icons-png.flaticon.com/128/3106/3106777.png";
        bookmark.style.opacity = 1;
        this.dataset.bookmark = "removeBookmark";
      }

      handlerFunction();

      if (
        document.querySelector(".search-results").dataset.type === "bookmarks"
      )
        handlerFunction2();
    });
  }

  idRecipe() {
    const bookmark = { idRecipe: "", action: "" };
    const idRecipe = this._parentElement.dataset.idRecipe;
    const bookmarkAction = this._parentElement.dataset.bookmark;
    bookmark.idRecipe = idRecipe;
    bookmark.action = bookmarkAction;
    return bookmark;
  }
}

export default new RecipesDetailsView();
