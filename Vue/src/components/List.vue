<script setup>
    import { ref, watch, toRaw } from "vue";
    import Item from "./Item.vue";
    import { debounce } from "../util.js";

    const list = ref([]);

    const saveListInLocalStorage = debounce((stuff) => {
        localStorage.setItem("list", JSON.stringify(stuff));
    }, 200);

    watch(list, (updatedList) => {
        saveListInLocalStorage(toRaw(updatedList));
    },{ deep: true });

    function init() {
        const savedList = localStorage.getItem("list");
        if (savedList) {
            list.value = JSON.parse(savedList);
        } else {
            list.value = [];
        }
    }

    init();

    function deleteItem(id) {
        list.value = list.value.filter((item) => item.id != id);
    }

    function addItem() {
        const item = {
            name: "",
            done: false,
            id: crypto.randomUUID(),
            new: true,
        };
        list.value.unshift(item);
    }

    function deleteList() {
        if (window.confirm("Do you really want to delete the whole list?")) {
            list.value = [];
        }
    }
</script>

<template>
    <menu>
        <button @click="addItem" aria-label="Add item">
            <i aria-hidden="true" class="fa-solid fa-plus"></i>
        </button>
        <button
            v-if="list.length > 0"
            @click="deleteList"
            aria-label="Delete list"
        >
            <i aria-hidden="true" class="fa-solid fa-trash-can"></i>
        </button>
    </menu>
    <ul v-if="list.length > 0">
        <template v-for="item in list" :key="item.id">
            <Item :item="item" @delete="deleteItem(item.id)"></Item>
        </template>
    </ul>
    <p v-else style="text-align: center">Add items</p>
</template>

<style scoped>
    .done {
        opacity: 0.3;
    }

    ul {
        list-style-type: none;
    }
    menu {
        margin: 20px 0px;
        display: flex;
        gap: 20px;
        justify-content: center;
    }
    button {
        background-color: var(--secondary-color);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    button:hover,
    button:focus-visible {
        background-color: var(--primary-color);
    }
</style>