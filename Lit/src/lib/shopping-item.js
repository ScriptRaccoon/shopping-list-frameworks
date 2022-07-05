import { LitElement, html, css } from "lit";
import { when } from "lit/directives/when.js";
import "./shopping-item.js";
import cssReset from "./reset-css.js";

export class Item extends LitElement {
    static properties = {
        name: { reflect: true, type: String },
        done: { reflect: true, type: Boolean },
        new: { reflect: true, type: Boolean },
    };

    static styles = [
        cssReset,
        css`
            li {
                font-size: 20px;
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 5px 0px;
            }
            button {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: initial;
                fill: var(--secondary-color);
            }
            :is(button:hover, button:focus-visible) svg path {
                fill: var(--primary-color);
            }
            input[type="text"] {
                flex: 1;
                padding: 10px;
                border-radius: 6px;
            }
            input[type="text"]:focus {
                background-color: #eee;
            }
            li.done {
                opacity: 0.3;
            }
            .buyButton {
                width: 30px;
            }
            .deleteBtn {
                width: 22.5px;
            }
            .deleteBtn svg {
                width: 12.5px;
            }
            li:not(.done) .buyButton svg {
                width: 23px;
            }
            li.done .buyButton svg {
                width: 18px;
            }
        `,
    ];

    constructor() {
        super();
        this.name = "";
        this.done = false;
        this.new = false;
    }

    updated() {
        this.dispatchEvent(
            new CustomEvent("updateItem", {
                detail: { name: this.name, done: this.done },
            })
        );
    }

    firstUpdated() {
        if (this.new) {
            this.renderRoot.querySelector("input")?.focus();
            this.dispatchEvent(new CustomEvent("newItem"));
        }
    }

    deleteItem() {
        this.dispatchEvent(new CustomEvent("deleteItem"));
    }

    render() {
        return html`
            <li class=${this.done ? "done" : ""}>
                <button
                    class="buyButton"
                    @click=${() => (this.done = !this.done)}
                    aria-label="Buy item"
                >
                    ${when(
                        this.done,
                        () => html`
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
                                />
                            </svg>
                        `,
                        () => html`
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                            >
                                <path
                                    d="M171.7 191.1H404.3L322.7 35.07C316.6 23.31 321.2 8.821 332.9 2.706C344.7-3.409 359.2 1.167 365.3 12.93L458.4 191.1H544C561.7 191.1 576 206.3 576 223.1C576 241.7 561.7 255.1 544 255.1L492.1 463.5C484.1 492 459.4 512 430 512H145.1C116.6 512 91 492 83.88 463.5L32 255.1C14.33 255.1 0 241.7 0 223.1C0 206.3 14.33 191.1 32 191.1H117.6L210.7 12.93C216.8 1.167 231.3-3.409 243.1 2.706C254.8 8.821 259.4 23.31 253.3 35.07L171.7 191.1zM191.1 303.1C191.1 295.1 184.8 287.1 175.1 287.1C167.2 287.1 159.1 295.1 159.1 303.1V399.1C159.1 408.8 167.2 415.1 175.1 415.1C184.8 415.1 191.1 408.8 191.1 399.1V303.1zM271.1 303.1V399.1C271.1 408.8 279.2 415.1 287.1 415.1C296.8 415.1 304 408.8 304 399.1V303.1C304 295.1 296.8 287.1 287.1 287.1C279.2 287.1 271.1 295.1 271.1 303.1zM416 303.1C416 295.1 408.8 287.1 400 287.1C391.2 287.1 384 295.1 384 303.1V399.1C384 408.8 391.2 415.1 400 415.1C408.8 415.1 416 408.8 416 399.1V303.1z"
                                />
                            </svg>
                        `
                    )}
                </button>

                <input
                    type="text"
                    value=${this.name}
                    @input=${(e) => (this.name = e.target.value)}
                    placeholder="Item name"
                    aria-label="Item name"
                    ?disabled=${this.done}
                />

                <button
                    class="deleteBtn"
                    @click=${this.deleteItem}
                    aria-label="Delete item"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                    >
                        <path
                            fill="red"
                            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                        />
                    </svg>
                </button>
            </li>
        `;
    }
}

customElements.define("shopping-item", Item);
