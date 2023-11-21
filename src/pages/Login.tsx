import { Link } from "react-router-dom";
import { LoginForm } from "../features/auth";
import { MainContentRegion } from "../features/styles";
import { NavBar } from "../components/NavBar";
import { css } from "styled-components";

const RegionStyle = css`
    h1 {
        margin-bottom: 30px;
    }
    p {
        margin-top: 30px;
    }
`;

export default function Login() {
    return (
        <>
        <NavBar/>
        <MainContentRegion customCss={RegionStyle}>
            <h1>Login</h1>
            <LoginForm />
            <p>Need an account? <Link to='/signup'>Sign Up</Link></p>
        </MainContentRegion>
        </>
    );
}