import { css } from "styled-components";

export const baseLargeButton = css`
    height: 50px;
    min-width: 160px;
    font-size: var(--p-font-size);
    border-radius: 999px;
    border-style: solid;
    border-width: thin;
    transition: all 0.1s;

    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.primaryColorLight};
    border-color: ${props => props.theme.primaryColorLight};

    &:enabled:hover {
        filter: brightness(90%);
    }

    &:disabled {
        filter: brightness(90%);
    }
`;