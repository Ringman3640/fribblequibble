import styled from "styled-components";

export const SectionHeader = styled.h3`
    margin-top: var(--section-margin-top);
    margin-bottom: var(--section-margin-bottom);

    color: ${props => props.theme.primaryColor};
`;