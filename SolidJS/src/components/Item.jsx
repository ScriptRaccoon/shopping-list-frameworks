import styles from "./Item.module.css";
import { createEffect } from "solid-js";

function Item({ item, toggleDone, changeName, deleteItem }) {
    let nameInput;

    createEffect(() => {
        if (item.new) {
            delete item.new;
            nameInput.focus();
        }
    });

    return (
        <li
            class={styles.item + " " + (item.done ? styles.done : "")}
        >
            <button
                class={styles.actionButton + " " + styles.buyButton}
                onClick={() => toggleDone(item.id)}
                aria-label="Buy item"
            >
                <i
                    aria-hidden="true"
                    class={
                        item.done
                            ? "fa-solid fa-check"
                            : "fa-solid fa-basket-shopping"
                    }
                />
            </button>
            <input
                ref={nameInput}
                class={styles.nameInput}
                disabled={item.done}
                type="text"
                placeholder="Item name"
                aria-label="Item name"
                onChange={(e) => changeName(item.id, e.target.value)}
                value={item.name}
            />
            <button
                class={styles.actionButton + " " + styles.deleteBtn}
                onClick={() => deleteItem(item.id)}
                aria-label="Delete item"
            >
                <i aria-hidden="true" class="fa-solid fa-xmark" />
            </button>
        </li>
    );
}

export default Item;
