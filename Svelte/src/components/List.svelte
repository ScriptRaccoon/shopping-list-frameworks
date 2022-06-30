<script>
    import Item from "./Item.svelte";
    import { debounce } from "../util.js";

    let list;

    const saveListInLocalStorage = debounce(() => {
        localStorage.setItem("list", JSON.stringify(list));
    }, 200);

    $: if (list) {
        saveListInLocalStorage();
    }

    function init() {
        const savedList = localStorage.getItem("list");
        if (savedList) {
            list = JSON.parse(savedList);
        } else {
            list = [];
        }
    }

    init();

    function addItem() {
        const item = {
            name: "",
            done: false,
            id: crypto.randomUUID(),
            new: true,
        };
        list = [item, ...list];
    }

    function deleteItem(id) {
        list = list.filter((item) => item.id != id);
    }

    function deleteList() {
        if (
            window.confirm(
                "Do you really want to delete the whole list?"
            )
        ) {
            list = [];
        }
    }
</script>

<menu>
    <button
        class="bigButton"
        on:click={addItem}
        aria-label="Add item"
    >
        <i aria-hidden="true" class="fa-solid fa-plus" />
    </button>
    {#if list.length > 0}
        <button
            class="bigButton"
            on:click={deleteList}
            aria-label="Delete list"
        >
            <i aria-hidden="true" class="fa-solid fa-trash-can" />
        </button>
    {/if}
</menu>

{#if list.length > 0}
    <ul>
        {#each list as item (item.id)}
            <Item
                bind:item
                on:delete={() => deleteItem(item.id)}
                on:save={saveListInLocalStorage}
            />
        {/each}
    </ul>
{:else}
    <p style="text-align:center">Add items</p>
{/if}

<style>
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
