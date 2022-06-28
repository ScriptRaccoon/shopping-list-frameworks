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
</script>

<template>
    <ul>
        <template v-for="item in list" :key="item.id">
            <li :class="{ done: item.done }">
                <button aria-label="Buy item" @click="item.done = !item.done">
                    <i
                        aria-hidden="true"
                        class="fa-solid fa-basket-shopping"
                    ></i>
                </button>
                <input type="text" :value="item.name" :disabled="item.done" />
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