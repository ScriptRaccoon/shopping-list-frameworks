import styles from "./List.module.css";
import { For, Show } from "solid-js";
import Item from "./Item";

function List() {
    function addItem() {
        // TODO:
        console.log("add item");
    }

    function deleteList() {
        // TODO:
        console.log("delete list");
    }

    function toggleDone() {
        // TODO:
        console.log("toggle done");
    }

    function changeName() {
        // TODO:
        console.log("change name");
    }

    function deleteItem() {
        // TODO:
        console.log("delete item");
    }

    let list = [
        {
            id: 1,
            name: "A",
            done: false,
        },
        {
            id: 2,
            name: "B",
            done: true,
        },
        {
            id: 3,
            name: "C",
            done: false,
        },
    ];

    return (
        <>
            <menu className={styles.menu}>
                <button
                    aria-label="Add item"
                    class={styles.button}
                    onClick={addItem}
                >
                    <i aria-hidden="true" class="fa-solid fa-plus" />
                </button>
                <Show when={list.length > 0}>
                    <button
                        aria-label="Delete list"
                        class={styles.button}
                        onClick={deleteList}
                    >
                        <i
                            aria-hidden="true"
                            className="fa-solid fa-trash-can"
                        />
                    </button>
                </Show>
            </menu>
            <ul>
                <For
                    each={list}
                    fallback={
                        <p style="text-align: center;">Add items</p>
                    }
                >
                    {(item) => (
                        <Item
                            item={item}
                            toggleDone={toggleDone}
                            changeName={changeName}
                            deleteItem={deleteItem}
                        ></Item>
                    )}
                </For>
            </ul>
        </>
    );
}

export default List;
