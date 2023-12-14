import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DiscussionPostLoader, DiscussionSortMethod } from "../features/discussions";
import { HomepageBlobsIcon, HomeArrowIcon } from "../features/icons";
import { MainContentRegion, SectionHeader, baseLargeButton } from "../features/styles";
import styled, { css } from "styled-components";

const IntroContainer = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

const IntroTextContainer = styled.div`
    position: relative;
    top: 40vh;
    left: 40vw;
    width: fit-content;

    @media only screen and (max-width: 950px) {
        top: 45vh;
        left: 50vw;
        transform: translateX(-50%);
    }
    @media only screen and (max-width: 480px) {
        position: absolute;
        width: 100%;
        padding-left: var(--large-text-padding);
    }
`;

const BlobIconContainer = styled.div`
    position: absolute;
    top: -300px;
    left: -510px;
    width: 600px;
    height: 600px;
    z-index: -8;

    @media only screen and (max-width: 1180px) {
        left: -420px;
    }
    @media only screen and (max-width: 950px) {
        top: -400px;
        left: 50%;
        transform: translateX(-50%);
        width: 550px;
        height: 550px;
    }
    @media only screen and (max-width: 480px) {
        top: -300px;
        width: 400px;
        height: 400px;
    }
`;

const WebsiteLogo = styled.h1`
    font-size: 6rem;

    color: ${props => props.theme.secondaryColor};

    @media only screen and (max-width: 1180px) {
        font-size: 5.6rem;
    }
    @media only screen and (max-width: 600px) {
        font-size: 4.4rem;
    }
    @media only screen and (max-width: 480px) {
        font-size: 3rem;   
    }
`;

const WebsiteDescription = styled.p`
    font-size: 1.6rem;

    margin-top: 30px;

    @media only screen and (max-width: 1180px) {
        font-size: 1.5rem;
    }
    @media only screen and (max-width: 600px) {
        font-size: var(--p-font-size);
    }
`;

const DiscussionLink = styled(Link)`
    ${baseLargeButton};
    display: block;
    margin-top: 30px;
    border: 0px;
    text-decoration: none;

    background-color: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.backgroundColor};

    &:visited {
        color: ${props => props.theme.backgroundColor};
        text-decoration: none;
    }
`;

const ArrowIconContainer = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50vw;
    transform: translateX(-50%);
    width: 90px;
    height: fit-content;
    transition: color 0.2s ease-in-out;

    color: ${props => props.theme.primaryColorLight};

    &.invisible {
        color: ${props => props.theme.backgroundColor};;
    }
    h3 {
        position: absolute;
        top: -35px;
        left: 100px;
        width: 200px;
        transform: rotate(-8deg);
        color: inherit;
    }

    @media only screen and (max-width: 480px) {
        left: 40vw;
        width: 50px;
        height: 50px;
        bottom: 20px;

        h3 {
            position: absolute;
            top: -30px;
            left: 55px;
            width: 200px;
            transform: rotate(-8deg);
            color: inherit;
        }
    }
`;

const MainRegionStyle = css`
    margin-top: 0px;
`;

export default function Home() {
    const [arrowIconVisible, setArrowIconVisible] = useState<boolean>(true);

    useEffect(() => {
        function applyArrowIconVisibility() {
            setArrowIconVisible(window.scrollY === 0);
        }

        document.addEventListener('scroll', applyArrowIconVisibility);

        return () => {
            document.removeEventListener('scroll', applyArrowIconVisibility);
        };
    }, []);

    return (
        <>
        <IntroContainer>
            <IntroTextContainer>
                <BlobIconContainer>
                    <HomepageBlobsIcon/>
                </BlobIconContainer>
                <WebsiteLogo>
                    FribbleQuibble
                </WebsiteLogo>
                <WebsiteDescription>
                    A place where foolish people discuss foolish things
                </WebsiteDescription>
                <DiscussionLink to='/discussion'>
                    Discussions
                </DiscussionLink>
            </IntroTextContainer>
            <ArrowIconContainer className={!arrowIconVisible ? 'invisible' : undefined}>
                <HomeArrowIcon/>
                <h3>
                    Take a peak
                </h3>
            </ArrowIconContainer>
        </IntroContainer>
        <MainContentRegion customCss={MainRegionStyle}>
            <SectionHeader>Recent Activity</SectionHeader>
            <DiscussionPostLoader
                sortMethod={DiscussionSortMethod.Acvitity}
                retrieveCount={3}
                maxRetrieves={1}
            />
            <SectionHeader>New</SectionHeader>
            <DiscussionPostLoader
                sortMethod={DiscussionSortMethod.New}
                retrieveCount={3}
                maxRetrieves={1}
            />
            <SectionHeader>Most Discussed</SectionHeader>
            <DiscussionPostLoader
                sortMethod={DiscussionSortMethod.Quibbles}
                retrieveCount={3}
                maxRetrieves={1}
            />
        </MainContentRegion>
        </>
    );
}