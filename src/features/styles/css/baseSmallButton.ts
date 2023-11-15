import { css } from "styled-components";

export const baseSmallButton = css`
    font-size: var(--p-font-size);
    border: none;
    border-radius: 0.6rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-right: 20px;
    margin-bottom: 10px;
    transition: background-color 0.1s;

    background-color: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.backgroundColorLight};

    &:enabled:hover {
        cursor: pointer;
    }

    &:disabled {
        background-color: ${props => props.theme.primaryColorLight};
    }
`;