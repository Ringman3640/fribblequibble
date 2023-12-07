import styled from "styled-components";

export const WideTextBox = styled.input`
    display: block;
    width: 100%;
    padding: var(--medium-text-padding);
    margin-bottom: 30px;
    border: 0px;
    border-radius: var(--medium-border-radius);
    font-size: var(--p-font-size);

    background-color: ${props => props.theme.backgroundColorLight};
    color: ${props => props.theme.primaryColorLight};
`;