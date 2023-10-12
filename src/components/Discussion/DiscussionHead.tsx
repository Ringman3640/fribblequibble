import DiscussionInfo from "../../types/DiscussionInfo";

interface DiscussionHeadProps {
  discussionInfo: DiscussionInfo | undefined
}

export default function DiscussionHead({ discussionInfo }: DiscussionHeadProps) {
  if (discussionInfo && 'error' in discussionInfo) {
    return (
      <>
      <p>{discussionInfo.error}</p>
      <p>{discussionInfo.message}</p>
      </>
    );
  }

  if (discussionInfo === undefined) {
    return (
      <h1>Discussion not loaded</h1>
    );
  }

  return (
    <div>
      <h1>Title: {discussionInfo.title}</h1>
      <h1>Date: {discussionInfo.timestamp}</h1>
      <h1>Topic: {discussionInfo.topic}</h1>
      <h1>Topic ID: {discussionInfo.topicId}</h1>
      {discussionInfo.description && <h1>Description: {discussionInfo.description}</h1>}
      {discussionInfo.conditions && (
        <>
        <h1>Conditions:</h1>
        <ul>
          {discussionInfo.conditions.map((condition, index) => 
            <li key={index}>{condition}</li>
          )}
        </ul>
        </>
      )}
      <h1>Choices: </h1>
      <ul>
        {discussionInfo.choices.map((choice, index) => {
          return <li key={index}>{choice.name}, {choice.color}</li>;
        })}
      </ul>
    </div>
  );
}