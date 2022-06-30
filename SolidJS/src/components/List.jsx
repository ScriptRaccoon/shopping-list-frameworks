import "./List.module.css";
import { For } from "solid-js";

function List() {
    const list = [
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
        <For
            each={list}
            fallback={<p style="text-align: center;">Add items</p>}
        >
            {(item) => <div>{item.name}</div>}
        </For>
    );
}

export default List;
