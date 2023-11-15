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

export default function Login() {
    return (
        <ContentContainer>
            <h1>Login</h1>
            <LoginForm />
            <p>Need an account? <Link to='/signup'>Sign Up</Link></p>
        </ContentContainer>
    );
}