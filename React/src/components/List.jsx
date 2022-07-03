import { useState, useEffect, useCallback } from "react";
import Item from "./Item";
import styles from "./List.module.css";
import { debounce } from "../util.js";

function List() {
    const savedItems = localStorage.getItem("list");
    const [list, setList] = useState(
        savedItems ? JSON.parse(savedItems) : []
    );

    const saveListInLocalStorage = useCallback(
        debounce((stuff) => {
            localStorage.setItem("list", JSON.stringify(stuff));
        }, 200),
        []
    );

    useEffect(() => saveListInLocalStorage(list), [list]);

    function addItem() {
        const item = {
            name: "",
            done: false,
            id: crypto.randomUUID(),
            new: true,
        };
        setList([item, ...list]);
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

    function deleteItem(id) {
        setList(list.filter((item) => item.id !== id));
    }

    function toggleDone(id) {
        setList(
            list.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        );
    }

    function changeName(id, name) {
        setList(
            list.map((item) =>
                item.id === id ? { ...item, name } : item
            )
        );
    }

    return (
        <>
            <menu className={styles.menu}>
                <button
                    aria-label="Add item"
                    className={styles.button}
                    onClick={addItem}
                >
                    <i
                        aria-hidden="true"
                        className="fa-solid fa-plus"
                    />
                </button>
                {list.length > 0 && (
                    <button
                        aria-label="Delete list"
                        className={styles.button}
                        onClick={deleteList}
                    >
                        <i
                            aria-hidden="true"
                            className="fa-solid fa-trash-can"
                        />
                    </button>
                )}
            </menu>
            {list.length > 0 ? (
                <ul className={styles.list}>
                    {list.map((item) => (
                        <Item
                            key={item.id}
                            item={item}
                            deleteItem={deleteItem}
                            toggleDone={toggleDone}
                            changeName={changeName}
                        />
                    ))}
                </ul>
            ) : (
                <p style={{ textAlign: "center" }}>Add items</p>
            )}
        </>
    );
}

export default List;
