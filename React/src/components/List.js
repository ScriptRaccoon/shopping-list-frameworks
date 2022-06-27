import { useState } from "react";
import Item from "./Item";
import styles from "./List.module.css";

function List() {
    const [list, setList] = useState([]);

    // TODO: use localstorage to load and save the list

    function addItem() {
        const item = {
            name: "Bla",
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

    return (
        <>
            <menu className={styles.menu}>
                <button className={styles.button} onClick={addItem}>
                    <i className="fa-solid fa-plus" />
                </button>
                {list.length > 0 && (
                    <button
                        className={styles.button}
                        onClick={deleteList}
                    >
                        <i className="fa-solid fa-trash-can" />
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
