import { LoginForm } from "../features/auth";
import styled from "styled-components";

const ContentContainer = styled.div`
    h1 {
        margin-bottom: 30px;
    }
`;

export default function Login() {
    return (
        <ContentContainer>
            <h1>Login</h1>
            <LoginForm />
        </ContentContainer>
    );
}