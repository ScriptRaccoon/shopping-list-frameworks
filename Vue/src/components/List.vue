<script setup>
    import { ref } from "vue";
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
    <ul>
        <template v-for="item in list" :key="item.id">
            <li :class="{ done: item.done }">
                <button aria-label="Buy item" @click="item.done = !item.done">
                    <i
                        aria-hidden="true"
                        class="fa-solid fa-basket-shopping"
                    ></i>
                </button>
                <input
                    type="text"
                    placeholder="Item name"
                    v-model="item.name"
                    aria-label="Item name"
                    :disabled="item.done"
                />
                <button aria-label="Delete item" @click="deleteItem(item.id)">
                    <i aria-hidden="true" class="fa-solid fa-xmark"></i>
                </button>
            </li>
        </template>
    </ul>
</template>

<style scoped>
    .done {
        opacity: 0.3;
    }
</style>