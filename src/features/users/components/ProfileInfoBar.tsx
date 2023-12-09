import { Link } from "react-router-dom";
import { UserStatistics, UserTopDiscussion } from "..";
import { formatTimestamp } from "../../../scripts/formatTimestamp";
import { QuibblesIcon } from "../../icons";
import styled from "styled-components";

const InfoBar = styled.div`
    display: flex;
    gap: 20px;
`;

const InfoBlock = styled.div`
    flex: 1;
    min-width: 0px;
    padding: var(--large-text-padding);
    border-radius: var(--large-border-radius);

    background-color: ${props => props.theme.backgroundColorLight};
`;

const StatsRow = styled.div`
    display: flex;

    p {
        flex: 1;
        margin-top: 8px;
    }
    p:nth-child(1) {
        flex: 2;
        color: ${props => props.theme.primaryColor};
    }
`;

const TopDiscussionRow = styled.div`
    display: flex;
    
    p {
        flex: 1;
        margin-top: 8px;
        overflow: hidden;
        white-space: nowrap
    }
    p:nth-child(1) {
        flex: none;
        width: 30px;
        color: ${props => props.theme.primaryColor};
    }
`;

const UserQuibbleCountRegion = styled.div`
    display: flex;

    p {
        text-align: right;
        margin-right: 6px;
    }
`;

const QuibbleIconContainer = styled.div`
    width: 32px;
    height: 32px;
`

interface DiscussionListItem {
    discussionInfo: UserTopDiscussion | null,
    listNumber: number
}

interface ProfileInfoBarProps {
    statistics: UserStatistics,
    topDiscussions: UserTopDiscussion[]
}

export function ProfileInfoBar({statistics, topDiscussions}: ProfileInfoBarProps) {
    const discussionsList: DiscussionListItem[] = [];
    for (let i = 1; i <= 5; ++i) {
        discussionsList.push({
            discussionInfo: topDiscussions[i - 1] || null,
            listNumber: i
        });
    }

    return (
        <InfoBar>
            <InfoBlock>
                <h3>Statistics</h3>
                <StatsRow>
                    <p>Joined</p>
                    <p>{formatTimestamp(statistics.joinTimestamp)}</p>
                </StatsRow>
                <StatsRow>
                    <p>Total Votes</p>
                    <p>{statistics.totalVotes}</p>
                </StatsRow>
                <StatsRow>
                    <p>Total Quibbles</p>
                    <p>{statistics.totalQuibbles}</p>
                </StatsRow>
                <StatsRow>
                    <p>Sent Condemns</p>
                    <p>{statistics.sentCondemns}</p>
                </StatsRow>
                <StatsRow>
                    <p>Received Condemns</p>
                    <p>{statistics.receivedCondemns}</p>
                </StatsRow>
            </InfoBlock>
            <InfoBlock>
                <h3>Top Discussions</h3>
                {discussionsList.map(item => {
                    if (item.discussionInfo === null) {
                        return (
                            <TopDiscussionRow key={item.listNumber}>
                                <p>{item.listNumber}</p>
                                <p>------</p>
                            </TopDiscussionRow>
                        );
                    }
                    return (
                        <TopDiscussionRow key={item.listNumber}>
                            <p>{item.listNumber}</p>
                            <p>
                                <Link to={`/discussion/${item.discussionInfo.id}`}>
                                    {item.discussionInfo.title}
                                </Link>
                            </p>
                            <UserQuibbleCountRegion>
                                <p>{item.discussionInfo.userQuibbles}</p>
                                <QuibbleIconContainer>
                                    <QuibblesIcon/>
                                </QuibbleIconContainer>
                            </UserQuibbleCountRegion>
                        </TopDiscussionRow>
                    );
                })}
            </InfoBlock>
        </InfoBar>
    );
}