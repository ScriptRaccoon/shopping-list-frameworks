import { useState } from "react";
import Item from "./Item";

function List() {
    const [list, setList] = useState([]);

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
        if (window.confirm("Delete?")) {
            setList([]);
        }
    }

    function deleteItem(id) {
        setList(list.filter((item) => item.id !== id));
    }

    return (
        <>
            <menu>
                <button onClick={addItem}>Add</button>
                {list.length > 0 && (
                    <button onClick={deleteList}>Trash</button>
                )}
            </menu>
            {list.length > 0 ? (
                <ul>
                    {list.map((item) => (
                        <Item
                            key={item.id}
                            item={item}
                            deleteItem={deleteItem}
                        />
                    ))}
                </ul>
            ) : (
                <p>Add items</p>
            )}
        </>
    );
}

export default List;
