import { useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { SignUpForm } from "../features/auth";
import { MainContentRegion, SectionHeader } from "../features/styles";
import { styled, css } from "styled-components";

const RegionStyle = css`
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
    useEffect(() => {
        document.title = 'Sign Up';
    }, []);

    return (
        <>
        <NavBar/>
        <MainContentRegion customCss={RegionStyle}>
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
        </MainContentRegion>
        </>
    );
}