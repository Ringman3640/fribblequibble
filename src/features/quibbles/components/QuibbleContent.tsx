import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const RemovedText = styled.p`
    color: ${props => props.theme.tertiaryColor};
`;

const ContentRegion = styled.div`
    position: relative;
`;

const ContentText = styled.p`
    white-space: break-spaces;
    max-height: 120px;
    overflow: hidden;

    &.constricted {
        max-height: 86px;
    }
    &.expanded {
        max-height: none;
    }
`;

const FadeBar = styled.div`
    background: linear-gradient(rgba(0,0,0,0), ${props => props.theme.backgroundColor});
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: var(--p-font-size);
`;

const ShowMoreButton = styled.button`
    background-color: transparent;
    border: 0px;
    padding: 0px;
    font-size: var(--small-font-size);

    color: ${props => props.theme.secondaryColor};

    &:hover {
        cursor: pointer;
    }
`;

enum ContentState {
    Default = 1,
    Constricted,
    Expanded
}

interface QuibbleContentProps {
    content: string | null
}

export function QuibbleContent({content}: QuibbleContentProps) {
    const contentTextRef = useRef<HTMLParagraphElement>(null);
    const [contentState, setContentState] = useState<ContentState>(ContentState.Default);

    useEffect(() => {
        if (contentTextRef.current === null) {
            return;
        }

        const elem = contentTextRef.current;
        if (elem.scrollHeight !== elem.offsetHeight) {
            // If scroll height and offsetHeight are different, the p element
            // is being restricted by max-height
            setContentState(ContentState.Constricted);
        }
    }, []);

    if (content === null) {
        return (
            <RemovedText>
                [ REMOVED ]
            </RemovedText>
        );  
    }

    let stateClassName = '';
    if (contentState === ContentState.Constricted) {
        stateClassName = 'constricted';
    }
    else if (contentState === ContentState.Expanded) {
        stateClassName = 'expanded';
    }

    return (
        <>
        <ContentRegion>
            <ContentText
                ref={contentTextRef}
                className={stateClassName}>
                {content}
            </ContentText>
            {contentState === ContentState.Constricted &&
                <FadeBar/>
            }
        </ContentRegion>
        {contentState === ContentState.Constricted &&
            <ShowMoreButton onClick={() => setContentState(ContentState.Expanded)}>
                Show More
            </ShowMoreButton>
        }
        </>
    );
}