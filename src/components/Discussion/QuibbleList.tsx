import QuibbleInfo from "../../types/QuibbleInfo";
import Quibble from "./Quibble";

interface QuibbleListProps {
  quibbles: QuibbleInfo[]
}

export default function QuibbleList({ quibbles }: QuibbleListProps) {
  return (
    <div>
      {quibbles && quibbles.map((quibble) => {
        return <Quibble quibbleInfo={quibble} key={quibble.id}/>
      })}
    </div>
  );
}