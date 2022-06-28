<script setup>
    import { ref, computed } from "vue";
    const list = ref([
        { id: "1", name: "Brot", done: true },
        { id: "2", name: "Hafermilch", done: false },
        { id: "3", name: "Druckerpatronen", done: false },
    ]);

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

    const className = computed(() =>
        false ? "fa-solid fa-basket-shopping" : "fa-solid fa-check"
    );
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
            <li :class="{ done: item.done }">
                <button
                    class="actionButton buyButton"
                    aria-label="Buy item"
                    @click="item.done = !item.done"
                >
                    <i
                        aria-hidden="true"
                        :class="
                            item.done
                                ? ['fa-solid', 'fa-check']
                                : ['fa-solid', 'fa-basket-shopping']
                        "
                    ></i>
                </button>
                <input
                    type="text"
                    placeholder="Item name"
                    v-model="item.name"
                    aria-label="Item name"
                    :disabled="item.done"
                />
                <button
                    class="actionButton deleteBtn"
                    aria-label="Delete item"
                    @click="deleteItem(item.id)"
                >
                    <i aria-hidden="true" class="fa-solid fa-xmark"></i>
                </button>
            </li>
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
    menu button {
        background-color: var(--secondary-color);
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    menu button:hover,
    menu button:focus-visible {
        background-color: var(--primary-color);
    }

    /* item styles */

    .buyButton {
        width: 30px;
    }
    li {
        font-size: 20px;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 5px 0px;
    }
    input[type="text"] {
        flex: 1;
        padding: 10px;
        border-radius: 6px;
    }
    input[type="text"]:focus {
        background-color: #eee;
    }
    li.done {
        opacity: 0.3;
    }
    .deleteBtn:where(:not(:focus-visible, :hover)) {
        color: red;
    }
    .actionButton {
        color: var(--secondary-color);
    }

    .actionButton:hover,
    .actionButton:focus-visible {
        color: var(--primary-color);
    }
</style>