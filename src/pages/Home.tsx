import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { DiscussionPostLoader, DiscussionSortMethod } from "../features/discussions";
import { HomepageBlobsIcon, HomeArrowIcon } from "../features/icons";
import { MainContentRegion, SectionHeader, baseLargeButton } from "../features/styles";
import styled, { css } from "styled-components";

const IntroContainer = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
`;

const BlobIconContainer = styled.div`
    position: absolute;
    top: -300px;
    left: -510px;
    width: 600px;
    height: 600px;
    z-index: -8;
`;

const IntroTextContainer = styled.div`
    position: relative;
    top: 40vh;
    left: 40vw;
`;

const WebsiteLogo = styled.h1`
    font-size: 6rem;

    color: ${props => props.theme.secondaryColor};
`;

const WebsiteDescription = styled.p`
    font-size: 1.6rem;

    margin-top: 30px;
`;

const DiscussionButton = styled.button`
    ${baseLargeButton};
    margin-top: 30px;
    border: 0px;

    background-color: ${props => props.theme.secondaryColor};
    color: ${props => props.theme.backgroundColor};
`;

const ArrowIconContainer = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50vw;
    transform: translateX(-50%);
    width: 90px;
    height: fit-content;

    color: ${props => props.theme.primaryColorLight};

    h3 {
        position: absolute;
        top: -35px;
        left: 100px;
        width: 200px;
        transform: rotate(-8deg);
        color: inherit;
    }
`

const MainRegionStyle = css`
    margin-top: 0px;
`;

export default function Home() {
    const navigate = useNavigate();

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
                <DiscussionButton onClick={() => navigate('/discussion')}>
                    Discussions
                </DiscussionButton>
            </IntroTextContainer>
            <ArrowIconContainer>
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