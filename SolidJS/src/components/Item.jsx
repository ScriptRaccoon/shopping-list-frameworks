import "./Item.module.css";

function Item({ item }) {
    return <li>{item.name}</li>;
}

export default Item;
