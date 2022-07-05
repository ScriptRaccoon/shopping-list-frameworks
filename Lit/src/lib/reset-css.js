import { css } from "lit";

export default css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    button,
    input {
        font-family: inherit;
        color: inherit;
        font-size: inherit;
        border: none;
        outline: none;
        background: none;
    }

    button {
        cursor: pointer;
    }
`;
