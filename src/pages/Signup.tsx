import { SignUpForm } from "../features/auth";
import { SectionHeader } from "../features/styles";
import styled from "styled-components";

const ContentContainer = styled.div`
    h1 {
        margin-bottom: 30px;
    }
    p {
        margin-top: 30px;
    }
`;

const RequirementHeader = styled(SectionHeader)`
    color: ${props => props.theme.secondaryColor};
`;

export default function SignUp() {
    return (
        <ContentContainer>
            <h1>Sign Up</h1>
            <SignUpForm />
            <RequirementHeader>Username Requirements</RequirementHeader>
            <ul>
                <li>Maximum {import.meta.env.VITE_USERNAME_MAX_LENGTH} characters</li>
            </ul>
            <RequirementHeader>Password Requirements</RequirementHeader>
            <ul>
                <li>Minimum {import.meta.env.VITE_PASSWORD_MIN_LENGTH} characters</li>
                <li>Maximum {import.meta.env.VITE_PASSWORD_MAX_LENGTH} characters</li>
                <li>May only contain ASCII characters</li>
            </ul>
        </ContentContainer>
    );
}