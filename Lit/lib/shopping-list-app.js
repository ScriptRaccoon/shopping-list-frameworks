import { LitElement, html, css } from "lit";
import "./shopping-header.js";
import "./shopping-list.js";
import cssReset from "./reset-css.js";

export class ShoppingListApp extends LitElement {
    static properties = {
        val: { state: true },
    };
    static styles = [
        cssReset,
        css`
            :host {
                display: block;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 20px;
                --primary-color: orange;
                --secondary-color: rgb(34, 105, 133);
            }
            .main {
                max-width: 720px;
                margin: 0 auto;
                padding: 15px;
            }
        `,
    ];
    constructor() {
        super();
        this.val = "test";
    }
    render() {
        return html`
            <shopping-header></shopping-header>
            <main class="main">
                <shopping-list></shopping-list>
            </main>
        `;
    }
}

customElements.define("shopping-list-app", ShoppingListApp);
