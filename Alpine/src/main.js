import "./style.css";
import { debounce } from "./util.js";
import Alpine from "alpinejs";

Alpine.data("list", () => {
    const debouncedSave = debounce((stuff) => {
        localStorage.setItem("list", JSON.stringify(stuff));
    }, 200);
    return {
        list: JSON.parse(localStorage.getItem("list") ?? "[]"),
        addItem() {
            const newItem = {
                id: crypto.randomUUID(),
                name: "",
                done: false,
                new: true,
            };
            this.list = [newItem, ...this.list];
        },
        deleteList() {
            if (
                window.confirm(
                    "Do you really want to delete the whole list?"
                )
            )
                this.list = [];
        },
        saveList() {
            debouncedSave(this.list);
        },
    };
});

Alpine.start();
