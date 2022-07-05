import Alpine from "alpinejs";
window.Alpine = Alpine;

window.newItem = () => {
    return {
        id: crypto.randomUUID(),
        name: "",
        done: false,
        new: true,
    };
};

Alpine.start();
