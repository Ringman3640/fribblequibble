import { Link } from "react-router-dom";
import { LoginForm } from "../features/auth";
import styled from "styled-components";

const ContentContainer = styled.div`
    h1 {
        margin-bottom: 30px;
    }
    p {
        margin-top: 30px;
    }
`;

export default function SignUp() {
    return (
        <ContentContainer>
            <h1>Sign Up</h1>
            <LoginForm />
        </ContentContainer>
    );
}