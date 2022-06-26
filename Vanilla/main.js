import { debounce } from "./utils.js";

const listElement = document.getElementById("listElement");
const addButton = document.getElementById("addButton");
const trashButton = document.getElementById("trashButton");
const addText = document.getElementById("addText");

let list;

const saveListInLocalStorage = debounce(() => {
    localStorage.setItem("list", JSON.stringify(list));
}, 200);

function init() {
    const savedList = localStorage.getItem("list");
    if (savedList) {
        list = JSON.parse(savedList);
    } else {
        list = [];
        saveListInLocalStorage();
    }
}

addButton.addEventListener("click", addItem);

function addItem() {
    const item = {
        name: "",
        done: false,
        id: crypto.randomUUID(),
        new: true,
    };
    list = [item, ...list];
    saveListInLocalStorage();
    console.log(list);
}

init();
