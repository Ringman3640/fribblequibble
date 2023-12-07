import styled from "styled-components";

export const ShortTextBox = styled.input`
    display: block;
    width: min(300px, 100%);
    padding: var(--medium-text-padding);
    margin-bottom: 30px;
    border: 0px;
    border-radius: var(--medium-border-radius);
    font-size: var(--p-font-size);

    background-color: ${props => props.theme.backgroundColorLight};
    color: ${props => props.theme.primaryColorLight};
`;