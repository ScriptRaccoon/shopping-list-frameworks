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
        // TODO: solve bug with order of items
        for (const item of list) {
            createItem(item);
        }
    } else {
        list = [];
        saveListInLocalStorage();
    }
    toggleListView();
}

addButton.addEventListener("click", addItem);
trashButton.addEventListener("click", deleteList);

function toggleListView() {
    if (list.length == 0) {
        listElement.style.display = "none";
        addText.style.display = "block";
    } else {
        addText.style.display = "none";
        listElement.style.display = "block";
    }
}

function deleteList() {
    if (
        window.confirm("Do you really want to delete the whole list?")
    ) {
        list = [];
        saveListInLocalStorage();
        toggleListView();
        listElement.innerHTML = "";
    }
}

function addItem() {
    const item = {
        name: "",
        done: false,
        id: crypto.randomUUID(),
    };

    list = [item, ...list];
    saveListInLocalStorage();
    toggleListView();

    const itemElement = createItem(item);
    const nameInput = itemElement.querySelector("input[type='text']");
    nameInput.focus();
}

function createItem(item) {
    const itemElement = document.createElement("li");
    itemElement.classList.add("item");

    const buyButton = document.createElement("button");
    buyButton.innerHTML = buyButton.innerHTML = item.done
        ? `<i class="fa-solid fa-check" />`
        : `<i class="fa-solid fa-basket-shopping" />`;
    buyButton.classList.add("buyButton", "actionButton");

    if (item.done) itemElement.classList.add("done");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = item.name;
    nameInput.placeholder = "Item name";

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-xmark" />`;
    deleteButton.classList.add("actionButton");

    itemElement.append(buyButton, nameInput, deleteButton);
    listElement.prepend(itemElement);

    nameInput.addEventListener("input", () => {
        item.name = nameInput.value;
        saveListInLocalStorage();
    });

    deleteButton.addEventListener("click", () => {
        itemElement.remove();
        list = list.filter((x) => x.id != item.id);
        saveListInLocalStorage();
        if (list.length == 0) toggleListView();
    });

    buyButton.addEventListener("click", () => {
        item.done = !item.done;
        buyButton.innerHTML = item.done
            ? `<i class="fa-solid fa-check" />`
            : `<i class="fa-solid fa-basket-shopping" />`;
        itemElement.classList.toggle("done");
        nameInput.disabled = item.done;
        saveListInLocalStorage();
    });

    return itemElement;
}

init();
