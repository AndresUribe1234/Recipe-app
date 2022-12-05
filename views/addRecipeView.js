class addRecipeView {
  addHandlerRender() {
    document.addEventListener("click", function (e) {
      const target = e.target;
      const addRecipe = target.closest(".nav-add-recipe");
      const modal = document.querySelector(".modal");
      if (addRecipe !== null) {
        if (addRecipe.classList.contains("nav-add-recipe"))
          modal.classList.remove("hidden");
      }

      if (target.classList.contains("modal")) modal.classList.add("hidden");
      if (target.classList.contains("close-btn")) modal.classList.add("hidden");
      const numOfIngredients = document.querySelectorAll(".ingredient-input");

      if (
        target.classList.contains("add-ingredient-btn") &&
        document.querySelectorAll(".ingredient-input").length <= 22
      ) {
        const html = `
    <input id="website-url" placeholder="Enter ingredient" data-num-ingredient="${
      numOfIngredients.length + 1
    }" class="ingredient-input"/>
    `;
        document
          .querySelector(".new-recipe-btn")
          .insertAdjacentHTML("beforebegin", html);
      }

      if (
        target.classList.contains("remove-ingredient-btn") &&
        document.querySelectorAll(".ingredient-input").length > 1
      ) {
        const ingredients = document.querySelectorAll(".ingredient-input");
        ingredients[ingredients.length - 1].remove();
      }

      if (document.querySelectorAll(".ingredient-input").length === 23) {
        document.querySelector(".msg-submition").textContent =
          "Maximum fields of ingredients allowed";
      } else {
        document.querySelector(".msg-submition").textContent = "";
      }
    });
  }

  addHandlerSubmit(handlerFunction) {
    const newRecipeForm = document.querySelector(".new-recipe-form");
    newRecipeForm.addEventListener("submit", function (e) {
      const recipeName = document.querySelector("#recipe-name");
      const imageUrl = document.getElementById("image-url");
      const websiteName = document.getElementById("website-name");
      const websiteUrl = document.getElementById("website-url");
      const ingredients = document.querySelectorAll(".ingredient-input");
      const ingredientsArray = Array.from(ingredients);
      const ingredientsCondition = ingredientsArray
        .map((ele) => ele.value)
        .some((ele) => ele === "");
      e.preventDefault();
      if (
        recipeName.value !== "" &&
        imageUrl.value !== "" &&
        websiteUrl.value !== "" &&
        websiteName.value !== "" &&
        !ingredientsCondition
      ) {
        // prettier-ignore
        document.querySelector(".msg-submition").textContent = "Recipe was successfully added to bookmark recipes";
        const recipesObject = {
          image_url: imageUrl.value,
          publisher: websiteName.value,
          publisher_url: websiteUrl.value,
          source_url: websiteUrl.value,
          title: recipeName.value,
          recipe_id: `created ${recipeName.value}`,
          ingredients: ingredientsArray.map((ele) => ele.value),
        };
        handlerFunction(recipesObject);
        [recipeName, imageUrl, websiteUrl, websiteName].forEach(
          (ele) => (ele.value = "")
        );
        ingredients.forEach((ele) => (ele.value = ""));
      } else {
        // prettier-ignore
        document.querySelector(".msg-submition").textContent = "Error: All fields need to be filled before recipe can be added";
      }
    });
  }
}

export default new addRecipeView();
