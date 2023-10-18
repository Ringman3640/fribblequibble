import { useState } from "react";
import { QuibbleInfo } from "../types/QuibbleInfo";
import { QuibbleCondemner } from "./QuibbleCondemner";

interface QuibbleProps {
  quibbleInfo: QuibbleInfo
}

export function Quibble({ quibbleInfo }: QuibbleProps) {
  const [condemnCount, setCondemnCount] = useState<number>(quibbleInfo.condemns || 0);

  function increaseCondemnCount() {
    setCondemnCount(condemnCount + 1);
  }

  return (
    <div>
      <h2>Quibble ID: {quibbleInfo.id}</h2>
      <h2>Author: {quibbleInfo.authorName}</h2>
      <h2>Author ID: {quibbleInfo.authorId}</h2>
      <h2>Date: {quibbleInfo.timestamp}</h2>
      <h2>Content: {quibbleInfo.content}</h2>
      <h2>Condemns: {condemnCount}</h2>
      <h2>Condemned: {quibbleInfo.condemned ? "True" : "False"}</h2>
      <QuibbleCondemner
        quibbleInfo={quibbleInfo}
        handleCondemn={increaseCondemnCount}
      />
      <p><br /></p>
    </div>
  );
}