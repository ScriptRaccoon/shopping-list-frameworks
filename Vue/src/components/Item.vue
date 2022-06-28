<script setup>
    import { onMounted, ref } from "vue";
    const { item } = defineProps(["item"]);
    defineEmits(["delete"]);

    const nameInput = ref(null);

    onMounted(() => {
        if (item.new) {
            nameInput.value?.focus();
            delete item.new;
        }
    });
</script>
<template>
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
            ref="nameInput"
            :disabled="item.done"
        />
        <button
            class="actionButton deleteBtn"
            aria-label="Delete item"
            @click="$emit('delete')"
        >
            <i aria-hidden="true" class="fa-solid fa-xmark"></i>
        </button>
    </li>
</template>

<style scoped>
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
    .deleteBtn :where(:not(:focus-visible, :hover)) {
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