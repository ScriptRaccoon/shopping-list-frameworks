import Alpine from "alpinejs";

Alpine.data("list", () => {
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
            console.log("save to localstorage");
            localStorage.setItem("list", JSON.stringify(this.list));
        },
    };
});

Alpine.start();
