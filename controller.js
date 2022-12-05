import "./node_modules/core-js/stable";
import "./node_modules/regenerator-runtime/runtime.js";
import * as model from "./model";
import recipesView from "./views/recipesView.js";
import recipeDetailsView from "./views/recipeDetailsView.js";
import searchView from "./views/searchView.js";
import bookmarkView from "./views/bookmarkView.js";
import addRecipeView from "./views/addRecipeView.js";
import availableRecipesView from "./views/availableRecipesView.js";
import bodySectionView from "./views/bodySectionView";

// Controler section for the load of ALL recipes
async function controlRecipes() {
  try {
    const searchQuery = searchView.query();
    if (!searchQuery) return;
    // Load recipes
    await model.loadRecipes(searchQuery);
    const maxNumPage = model.maxPartsOfArray("recipesApi");
    recipesView.maxPage(maxNumPage);
    recipeDetailsView.clear();
    bodySectionView.clearInitialMessage();
    // Render instructions
    recipeDetailsView.instructions();
    // Render recipes
    recipesView.render(model.searchResultsPerPage(1));
  } catch (err) {
    console.log(err);
    recipesView.clear();
    recipeDetailsView.clear();
    bodySectionView.renderRecipeSearchedError(err);
  }
}

// Controler next page

async function controlPage() {
  try {
    const page = recipesView.page();
    const type = recipesView.type();
    if (type === "recipes")
      recipesView.pageRender(model.searchResultsPerPage(page));

    if (type === "bookmarks")
      recipesView.pageRender(model.bookmarksResultsPerPage(page));
  } catch (err) {
    console.log(err);
  }
}

// Controler section for the load of a specific recipe
async function controlDetailsVisualization(recipeId) {
  try {
    // Load specific recipe
    await model.detailsRecipe(recipeId);
    // Render specific recipe
    recipeDetailsView.render(model.state.recipeDetails);
    recipeDetailsView.checkRenderBookmark(model.state.bookmarkedRecipes);
  } catch (err) {
    console.log(err);
  }
}

// Controler section for bookmark functionality
function controlBookmarks() {
  const bookmark = recipeDetailsView.idRecipe();
  model.saveBookmark(bookmark.idRecipe, bookmark.action);
}

// Controler section for bookmarks visualization
function controlVisualizationBookmarks() {
  try {
    const maxNumPage = model.maxPartsOfArray("bookmarks");
    recipesView.maxPage(maxNumPage);
    bodySectionView.clearInitialMessage();
    // Render instructions
    recipeDetailsView.instructions();
    let page = recipesView.page();
    const type = recipesView.type();
    if (type === "recipes") page = 1;

    // Render recipes
    recipesView.render(model.bookmarksResultsPerPage(page));

    if (Object.keys(model.state.bookmarkedRecipes).length === 0) {
      bodySectionView.emptyBookmarkMessage();
      recipeDetailsView.clear();
      recipesView.clear();
    }
  } catch (err) {
    console.log(err);
    recipesView.clear();
    recipeDetailsView.renderError(err);
  }
}

// Controler to add a manuel recipe
function addRecipe(objectRecipe) {
  model.addOwnRecipe(objectRecipe);
  model.addBookmarksToStorage();
}

// Controler visualize details of own recipes
function controlBookmarkDetails(recipeId) {
  const element = model.visualizeBookmarkDetails(recipeId);
  recipeDetailsView.render(element);
  recipeDetailsView.checkRenderBookmark(model.state.bookmarkedRecipes);
}

// Controler visualize all available recipes

async function controlAvailableRecipes() {
  try {
    await model.availableSearchParams();
    availableRecipesView.renderData(model.state.availableSearchParams);
  } catch (err) {
    console.log(err);
  }
}

// Controler to go back to home state

function homeState() {
  recipesView.clear();
  recipeDetailsView.clear();
  bodySectionView.returnHomeMessage();
}

// Init function, adding events to views

const init = function () {
  searchView.addHandlerRender(controlRecipes);
  searchView.addHandlerHome(homeState);
  // prettier-ignore
  recipesView.addHandlerRender(controlDetailsVisualization,controlPage,controlBookmarkDetails);
  // prettier-ignore
  recipeDetailsView.addHandlerRender(controlBookmarks,controlVisualizationBookmarks);
  bookmarkView.addHandlerRender(controlVisualizationBookmarks);
  addRecipeView.addHandlerRender();
  addRecipeView.addHandlerSubmit(addRecipe);
  availableRecipesView.addHandlerRender(controlAvailableRecipes);
};

init();
