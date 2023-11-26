import { css } from "styled-components";

export const baseLargeButton = css`
    text-align: center;
    min-width: 160px;
    width: fit-content;
    font-size: var(--p-font-size);
    border-radius: 999px;
    border-style: solid;
    border-width: thin;
    padding: 14px;
    transition: all 0.1s;

    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.primaryColorLight};
    border-color: ${props => props.theme.primaryColorLight};

    &:hover {
        text-decoration: none;
        filter: brightness(90%);
        cursor: pointer;
    }

    &:disabled {
        filter: brightness(90%);
    }
    &:disabled:hover {
        cursor: default;
    }
`;