import { async } from "regenerator-runtime";

export const state = {
  recipes: {},
  recipeDetails: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: 6,
    page: 1,
  },
  bookmarkedRecipes: [],
  availableSearchParams: [],
};

// Api call to get ALL recipes information
export const loadRecipes = async function (food) {
  try {
    state.search.query = food;
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${food}`
    );
    const data = await res.json();
    if (!res.ok)
      if ((res.status = 400)) {
        throw new Error(
          `Theres no information for the dish you are looking for! Please try searching for a different one! (${res.status}) 🍣`
        );
      } else {
        throw new Error(`${data.message}(${res.status})`);
      }
    let { recipes } = data;
    state.recipes = recipes;
    state.search.results = recipes;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Api call to ger specific recipe
export const detailsRecipe = async function (idRecipe) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${idRecipe}`
    );
    const data = await res.json();
    const { recipe: recipeDetails } = data;
    console.log(recipeDetails);
    state.recipeDetails = recipeDetails;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Function that returns piece of the array in order to render it
export const searchResultsPerPage = function (page = state.search.page) {
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  state.search.page = page;
  return state.search.results.slice(start, end);
};

// Function that returns the number o breaks that the array can have
export const maxPartsOfArray = function (array) {
  let lenghtArray;
  if (array === "recipesApi") {
    lenghtArray = state.recipes.length / state.search.resultsPerPage;
  }
  if (array === "bookmarks") {
    lenghtArray = state.bookmarkedRecipes.length / state.search.resultsPerPage;
  }
  lenghtArray = Math.ceil(lenghtArray);
  return lenghtArray;
};

// Function to bookmark recipes
export function saveBookmark(id, action) {
  // const eleToAdd = state.recipes.map((ele) => ele.recipe_id);
  let eleToAdd;
  if (Object.keys(state.recipes).length > 0)
    eleToAdd = state.recipes.find((ele) => ele.recipe_id === id);

  const eleIndex = state.bookmarkedRecipes.findIndex(
    (ele) => ele.recipe_id === id
  );

  if (action === "addBookmark") {
    state.bookmarkedRecipes.push(eleToAdd);
  }
  if (action === "removeBookmark") {
    state.bookmarkedRecipes.splice(eleIndex, 1);
  }

  addBookmarksToStorage();
}

// Function that returns piece of the bookmarks array in order to render it
export const bookmarksResultsPerPage = function (page = state.search.page) {
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  state.search.page = page;
  return state.bookmarkedRecipes.slice(start, end);
};

// Function to use local storage of user
export function addBookmarksToStorage() {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarkedRecipes));
}

// Function to push new recipes
export function addOwnRecipe(object) {
  state.bookmarkedRecipes.push(object);
}

//
export function visualizeBookmarkDetails(recipeId) {
  const ele = state.bookmarkedRecipes.find((ele) => ele.recipe_id === recipeId);
  return ele;
}

// Function to fetch available search params of api

export async function availableSearchParams() {
  try {
    const response = await fetch(
      "https://first-scraper-andres-uribe.up.railway.app/recipes"
    );

    const data = await response.json();
    state.availableSearchParams = data;
  } catch (err) {
    console.log(err);
  }
}

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarkedRecipes = JSON.parse(storage);
  console.log(state);
};

init();
