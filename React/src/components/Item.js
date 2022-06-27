import styles from "./Item.module.css";
import { createRef, useEffect } from "react";

function Item({ item, deleteItem, changeName, toggleDone }) {
    const nameInput = createRef();

    useEffect(() => {
        if (item.new) {
            delete item.new;
            nameInput.current?.focus();
        }
    });

    return (
        <li
            className={
                styles.item + " " + (item.done ? styles.done : "")
            }
        >
            <button
                className={
                    styles.actionButton + " " + styles.buyButton
                }
                onClick={() => toggleDone(item.id)}
            >
                <i
                    className={
                        item.done
                            ? "fa-solid fa-check"
                            : "fa-solid fa-basket-shopping"
                    }
                />
            </button>
            <input
                className={styles.nameInput}
                disabled={item.done}
                ref={nameInput}
                type="text"
                placeholder="Item name"
                onChange={(e) => changeName(item.id, e.target.value)}
                value={item.name}
            />
            <button
                className={
                    styles.actionButton + " " + styles.deleteBtn
                }
                onClick={() => deleteItem(item.id)}
            >
                <i className="fa-solid fa-xmark" />
            </button>
        </li>
    );
}

export default Item;
