import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { MainContentRegion, SectionHeader } from "../features/styles";
import styled from "styled-components";

const Title = styled.h1`
    margin-bottom: var(--section-margin-bottom);
`;

const Rule = styled.p`
    margin-top: var(--section-margin-top);
    margin-bottom: var(--section-margin-bottom);

    color: ${props => props.theme.primaryColor};
`;

export default function NewUserWelcome() {
    useEffect(() => {
        document.title = 'Welcome';
    }, []);

    return (
        <>
        <NavBar/>
        <MainContentRegion>
            <Title>Welcome to FribbleQuibble</Title>
            <p>
                You seem to be new here. Here are some things you should know.
            </p>
            <SectionHeader>What happens here</SectionHeader>
            <p>
                FribbleQuibble is a site for discussions and debate over trivial
                matters. This may range from typical everyday arguments on
                lifestyle, decisions, preferences, and more in a wide range of
                topics.
                <br/><br/>

                Scroll through the <Link to='/discussion'>discussions page </Link>
                and find an interesting discussion to participate in. There, you
                can place your vote and debate with other users in the chat
                area. Your vote choice will be visible on all the comments you
                leave, which are called 'Quibbles' here. You may also condemn
                the Quibbles of other users that you do not agree with.
                <br/><br/>

                We strive to cultivate an environment of light banter and joking
                animosity. Feel free to poke fun at others and to be vulgar.
                However, refrain from bringing up serious issues and topics.
                This is a place to have simple fun. 
            </p>
            <SectionHeader>Some rules on interactions</SectionHeader>
            <p>
                Users are free to be vulgar and to poke fun at others. However,
                there are some important rules users must know.
            </p>
            <Rule>Rule 1: No discrimination</Rule>
            <p>
                This includes racism, sexism, ableism or derogatory speech
                against a person's sexual orientation or gender orientation. You
                may poke fun at someone over their opinions, but personal
                attacks are unacceptable. This applies to Quibbles and usernames.
            </p>
            <Rule>Rule 2: No harassment</Rule>
            <p>
                Don't intentionally stalk users and cause them problems. That's
                weird and annoying.
            </p>
            <Rule>Rule 3: No impersonation</Rule>
            <p>
                Don't pretend to be someone you are not. This mainly applies to
                usernames, but can also apply to Quibbles depending on their
                content.
            </p>
            <Rule>Rule 4: Do not spam or advertise</Rule>
            <p>
                Spam is annoying; none of us wants it. Also, don't advertise any
                products here.
            </p>
            <Rule>Rule 5: Do not post sensitive information</Rule>
            <p>
                This includes your own information and other people's
                information. Keep that shit hidden, no one wants to see it. 
            </p>
            <Rule>Rule 6: No politics</Rule>
            <p>
                Politics are a serious matter that should be handled
                sensitively. This is not the place for that. Keeps things
                lighthearted and fun.
            </p>
            <SectionHeader/>
            <p>
                Any violations of these rules may result in Quibble removal or
                account deletion.
            </p>
        </MainContentRegion>
        </>
    );
}