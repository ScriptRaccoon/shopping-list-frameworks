import { useState } from "react";

function Item({ item, deleteItem }) {
    const [done, setDone] = useState(item.done);

    function handleNameChange(e) {
        item.name = e.target.value;
    }

    return (
        <li>
            <button
                onClick={() => {
                    item.done = !item.done;
                    setDone(item.done);
                }}
            >
                <i
                    className={
                        done
                            ? "fa-solid fa-check"
                            : "fa-solid fa-basket-shopping"
                    }
                />
            </button>
            <input
                type="text"
                placeholder="Item name"
                onChange={handleNameChange}
            />
            <button onClick={() => deleteItem(item.id)}>
                <i className="fa-solid fa-xmark" />
            </button>
        </li>
    );
}

export default Item;
