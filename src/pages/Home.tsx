import { HomepageBlobs } from "../features/icons/components/HomepageIcon";
import styled from "styled-components";

const IntroContainer = styled.div`
    
`;

const BlobIconContainer = styled.div`
    position: absolute;
    width: 600px;
    height: 600px;
    z-index: -8;
`;

const IntroTextContainer = styled.div`
    
`;

const WebsiteLogo = styled.h1`
    font-size: 6rem;

    color: ${props => props.theme.secondaryColor};
`;

const WebsiteDescription = styled.p`
    font-size: 1.6rem;

    margin-top: 30px;
`;

export default function Home() {
    return (
        <IntroContainer>
            <BlobIconContainer>
                <HomepageBlobs/>
            </BlobIconContainer>
            <IntroTextContainer>
                <WebsiteLogo>
                    FribbleQuibble
                </WebsiteLogo>
                <WebsiteDescription>
                    A place where foolish people discussion foolish things
                </WebsiteDescription>
            </IntroTextContainer>
        </IntroContainer>
    );
}