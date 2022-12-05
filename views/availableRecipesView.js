class availableRecipesView {
  data;
  addHandlerRender(handlerFunction) {
    handlerFunction();
    document.addEventListener("click", function (e) {
      const target = e.target;
      const availableRecipes = target.closest(".nav-available");

      const modal = document.querySelector(".modal1");
      if (availableRecipes !== null) {
        if (availableRecipes.classList.contains("nav-available"))
          modal.classList.remove("hidden");
      }
      if (target.classList.contains("modal1")) modal.classList.add("hidden");
      if (target.classList.contains("close-btn")) modal.classList.add("hidden");
    });
  }

  renderData(data) {
    this.data = data;
    this.data.forEach((ele, ind, arr) => {
      const newEle = document.createElement("li");
      newEle.textContent = ele;
      document.querySelector(".options-list").appendChild(newEle);
    });
  }
}

export default new availableRecipesView();
