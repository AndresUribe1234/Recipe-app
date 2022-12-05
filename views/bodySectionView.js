import ParentView from "./parentView.js";

class BodySectionView extends ParentView {
  _parentElement = document.querySelector(".body-container");

  clearInitialMessage() {
    this._parentElement.querySelector(".initial-message").textContent = "";
  }

  renderRecipeSearchedError(message) {
    this._parentElement.querySelector(".initial-message").textContent = message;
  }

  returnHomeMessage() {
    this._parentElement.querySelector(
      ".initial-message"
    ).textContent = `Start by typing in the upper left box the dish you want to cook
    😄`;
  }

  emptyBookmarkMessage() {
    this._parentElement.querySelector(
      ".initial-message"
    ).textContent = `You haven't added any bookmark 🔖!`;
  }
}

export default new BodySectionView();
