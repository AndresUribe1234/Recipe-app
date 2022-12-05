import ParentView from "./parentView.js";

class RecipesView extends ParentView {
  _parentElement = document.querySelector(".search-results");
  pageValue;

  addHandlerRender(handlerFunction1, handlerFunction2, handlerFunction3) {
    this._parentElement.addEventListener("click", function (e) {
      const target = e.target;
      const recipe = target.closest(".recipe-container");
      const pageControler = target.closest(".page-container");

      if (recipe === null && pageControler === null) return;

      if (recipe) {
        const recipeId = recipe.dataset.id;
        if (recipeId.split(" ").length === 1) {
          handlerFunction1(recipeId);
        } else {
          handlerFunction3(recipeId);
        }
      }

      if (pageControler) {
        if (target.closest(".page-btn") === null) return;
        let page = document.querySelector(".page-number");
        if (
          target.closest(".page-btn").classList.contains("right-btn") &&
          page.textContent < +this.dataset.maxPage
        )
          page.textContent = +page.textContent + 1;
        if (target.closest(".page-btn").classList.contains("left-btn"))
          if (page.textContent > 1) page.textContent = +page.textContent - 1;

        handlerFunction2();
      }
    });
  }

  pageRender(data) {
    this._data = data;
    this._parentElement.querySelector(".recipes-container").innerHTML = "";
    this.renderFunction();
  }

  maxPage(num) {
    this._parentElement.dataset.maxPage = num;
  }

  renderFunction() {
    if (this._parentElement.querySelector(".recipes-container") === null) {
      const html0 = `
    <div class="recipes-container"></div>
    `;
      this._parentElement.insertAdjacentHTML("afterbegin", html0);
    }

    this._data.forEach((ele) => {
      const html1 = `
        <div class="recipe-container" data-id="${ele.recipe_id}">
            <div class="recipe-image">
              <img src="${ele.image_url}" />
            </div>
            <h1>${ele.title}</h1>
          </div>
          `;
      this._parentElement
        .querySelector(".recipes-container")
        .insertAdjacentHTML("afterbegin", html1);
    });

    if (this._parentElement.querySelector(".page-container") === null) {
      const html2 = `
    <div class="page-container">
          <button class="page-btn left-btn">←</button>
          <span>Page <span class="page-number">${
            this._parentElement.dataset.type === "bookmarks"
              ? this.pageValue
              : 1
          }</span> </span>
          <button class="page-btn right-btn">→</button>
        </div>
    `;
      this._parentElement.insertAdjacentHTML("beforeend", html2);
    }
  }

  page() {
    let page;

    if (document.querySelector(".page-number")) {
      page = +document.querySelector(".page-number").textContent;
      this.pageValue = page;
      return page;
    } else {
      return 1;
    }
  }

  type() {
    const type = this._parentElement.dataset.type;
    return type;
  }
}

export default new RecipesView();
