import { QuibbleInfo } from "../types/QuibbleInfo";

interface QuibbleProps {
  quibbleInfo: QuibbleInfo
}

export function Quibble({ quibbleInfo }: QuibbleProps) {
  return (
    <div>
      <h2>Quibble ID: {quibbleInfo.id}</h2>
      <h2>Author: {quibbleInfo.authorName}</h2>
      <h2>Author ID: {quibbleInfo.authorId}</h2>
      <h2>Date: {quibbleInfo.date}</h2>
      <h2>Content: {quibbleInfo.content}</h2>
      <h2>Condemns: {quibbleInfo.condemns || 0}</h2>
      <h2>Condemned: {quibbleInfo.condemned ? "True" : "False"}</h2>
      <p><br /></p>
    </div>
  );
}