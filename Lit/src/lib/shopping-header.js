import { LitElement, html, css } from "lit";
import cssReset from "./reset-css.js";

export class Header extends LitElement {
    static styles = [
        cssReset,
        css`
            header {
                background-color: var(--primary-color);
                color: white;
                padding: 25px 0px;
            }

            h1 {
                text-align: center;
                text-shadow: 1px 1px 5px #0008;
            }
        `,
    ];
    render() {
        return html` <header>
            <h1>Shopping List</h1>
        </header>`;
    }
}

customElements.define("shopping-header", Header);
