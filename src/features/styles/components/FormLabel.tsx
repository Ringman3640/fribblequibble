import styled from "styled-components";

export const FormLabel = styled.label`
    display: block;
    font-size: var(--p-font-size);
    margin-bottom: 6px;

    color: ${props => props.theme.primaryColor};
`;