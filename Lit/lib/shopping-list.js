import { LitElement, html, css } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { when } from "lit/directives/when.js";
import "./shopping-item.js";
import cssReset from "./reset-css.js";

export class List extends LitElement {
    static properties = {
        _items: { state: true },
    };

    static styles = [
        cssReset,
        css`
            ul {
                list-style-type: none;
            }
            menu {
                margin: 20px 0px;
                display: flex;
                gap: 20px;
                justify-content: center;
            }
            button {
                background-color: var(--secondary-color);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            button svg {
                width: 18px;
            }
            button svg path {
                fill: white;
            }
            button:hover,
            button:focus-visible {
                background-color: var(--primary-color);
            }
        `,
    ];

    constructor() {
        super();
        const savedItems = localStorage.getItem("list");
        this._items = savedItems ? JSON.parse(savedItems) : [];
    }

    deleteItem(id) {
        this._items = this._items.filter((item) => item.id != id);
    }

    saveToLocalStorage() {
        localStorage.setItem("list", JSON.stringify(this._items));
    }

    addItem() {
        const newItem = {
            id: crypto.randomUUID(),
            name: "",
            done: false,
            new: true,
        };
        this._items = [newItem, ...this._items];
    }

    deleteItem(item) {
        this._items = this._items.filter(
            (stuff) => stuff.id != item.id
        );
        this.requestUpdate();
    }

    handleNew(item) {
        delete item.new;
        this.requestUpdate();
    }

    deleteList() {
        if (
            window.confirm(
                "Do you really want to delete the whole list?"
            )
        ) {
            this._items = [];
        }
    }

    handleItemUpdate(e, item) {
        item.name = e.detail.name;
        item.done = e.detail.done;
        this.requestUpdate();
    }

    updated() {
        this.saveToLocalStorage();
    }

    render() {
        const menuTemplate = html` <menu>
            <button @click=${this.addItem} aria-label="Add item">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                >
                    <path
                        d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
                    />
                </svg>
            </button>
            ${when(
                this._items.length > 0,
                () => html`<button
                    @click=${this.deleteList}
                    aria-label="Delete list"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                            fill="white"
                            d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
                        />
                    </svg>
                </button>`
            )}
        </menu>`;

        const listTemplate = when(
            this._items.length > 0,
            () => html`<ul>
                ${repeat(
                    this._items,
                    (item) => item.id,
                    (item) =>
                        html`<shopping-item
                            name=${item.name}
                            ?done=${item.done}
                            ?new=${item.new}
                            @new=${() => this.handleNew(item)}
                            @delete=${() => this.deleteItem(item)}
                            @itemUpdated=${(e) =>
                                this.handleItemUpdate(e, item)}
                        ></shopping-item>`
                )}
            </ul>`,
            () => html`<p style="text-align:center">Add items</p>`
        );

        return html`${menuTemplate}${listTemplate}
            <!-- debugging: -->
            <br /><br /><code>${JSON.stringify(this._items)}</code>`;
    }
}
customElements.define("shopping-list", List);
