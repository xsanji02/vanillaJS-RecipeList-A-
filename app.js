import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://recipe-list-app-2f0f7-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const recipeListDB = ref(database, "recipeList");

const recipeInputElement = document.querySelector("input");
const addRecipeListButton = document.getElementById("add-btn");
const deleteAllRecipeListButton = document.getElementById("delete-all");
const recipeListElement = document.querySelector("ul");

document.addEventListener("keydown", (e) => {
  let inputValue = recipeInputElement.value;
  if (e.key === "Enter") {
    if (inputValue !== "") {
      push(recipeListDB, inputValue);
      clearRecipeInputElement();
    } else {
      alert("put something on text box");
    }
  }
});

addRecipeListButton.addEventListener("click", () => {
  let inputValue = recipeInputElement.value;
  if (inputValue !== "") {
    push(recipeListDB, inputValue);
    clearRecipeInputElement();
  } else {
    alert("put something on text box");
  }
});

onValue(recipeListDB, (snapshot) => {
  if (snapshot.exists()) {
    let getRecipeListOnDb = Object.entries(snapshot.val());
    recipeListElement.innerHTML = "";
    for (let i = 0; i < getRecipeListOnDb.length; i++) {
      let getRecipeList = getRecipeListOnDb[i];
      appendRecipeListOnElement(getRecipeList);
    }
  } else {
    recipeListElement.innerHTML = "No recipe list yet...";
    recipeListElement.style.color = "#ffefce";
  }
});

const appendRecipeListOnElement = (item) => {
  let itemKey = item[0];
  let itemValue = item[1];
  let newElement = document.createElement("li");

  newElement.innerHTML = itemValue;

  recipeListElement.appendChild(newElement);

  newElement.addEventListener("click", () => {
    newElement.style.textDecoration = "line-through";
  });

  deleteAllRecipeListButton.addEventListener("click", () => {
    let removeRecipeListOnDB = ref(database, `recipeList/${itemKey}`);
    remove(removeRecipeListOnDB);
  });
};

const clearRecipeInputElement = () => {
  recipeInputElement.value = "";
};
