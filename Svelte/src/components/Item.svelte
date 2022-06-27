<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let item;

    function deleteItem() {
        dispatch("delete", item.id);
    }

    function focusWhenNew(element) {
        if (item.new) {
            element.focus();
            delete item.new;
        }
    }
</script>

<li class:done={item.done}>
    <button
        class="actionButton buyButton"
        on:click={() => (item.done = !item.done)}
        aria-label="Buy item"
    >
        <i
            aria-hidden="true"
            class={item.done
                ? "fa-solid fa-check"
                : "fa-solid fa-basket-shopping"}
        />
    </button>

    <input
        use:focusWhenNew
        disabled={item.done}
        type="text"
        placeholder="Item name"
        aria-label="Item name"
        bind:value={item.name}
    />
    <button
        class="actionButton deleteBtn"
        on:click={deleteItem}
        aria-label="Delete item"
    >
        <i aria-hidden="true" class="fa-solid fa-xmark" />
    </button>
</li>

<style>
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
