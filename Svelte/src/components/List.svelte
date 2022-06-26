<script>
    import Item from "./Item.svelte";
    import { debounce } from "../util.js";

    let list;

    function init() {
        const savedList = localStorage.getItem("list");
        if (savedList) {
            list = JSON.parse(savedList);
        } else {
            list = [];
            saveListInLocalStorage();
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
    }

    function deleteItem(e) {
        const id = e.detail;
        list = list.filter((item) => item.id != id);
        saveListInLocalStorage();
    }

    const saveListInLocalStorage = debounce(() => {
        localStorage.setItem("list", JSON.stringify(list));
    }, 200);

    function deleteList() {
        if (
            window.confirm(
                "Do you really want to delete the whole list?"
            )
        ) {
            list = [];
            saveListInLocalStorage();
        }
    }

    $: if (list) saveListInLocalStorage();

    init();
</script>

<menu>
    <button class="bigButton" on:click={addItem}>
        <i class="fa-solid fa-plus" />
    </button>
    {#if list.length > 0}
        <button class="bigButton" on:click={deleteList}>
            <i class="fa-solid fa-trash-can" />
        </button>
    {/if}
</menu>

{#if list.length > 0}
    <ul>
        {#each list as item (item.id)}
            <Item
                bind:item
                on:delete={deleteItem}
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
