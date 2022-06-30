import styles from "./List.module.css";
import { For, Show, createSignal } from "solid-js";
import Item from "./Item";

function List() {
    const [list, setList] = createSignal([]);

    function addItem() {
        const item = {
            name: "",
            done: false,
            id: crypto.randomUUID(),
            new: true,
        };
        setList([item, ...list()]);
    }

    function deleteList() {
        if (
            window.confirm(
                "Do you really want to delete the whole list?"
            )
        ) {
            setList([]);
        }
    }

    function toggleDone(id) {
        setList(
            list().map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        );
    }

    function changeName(id, name) {
        setList(
            list().map((item) =>
                item.id === id ? { ...item, name } : item
            )
        );
    }

    function deleteItem(id) {
        setList(list().filter((item) => item.id !== id));
    }

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
                <Show when={list().length > 0}>
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
                    each={list()}
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
