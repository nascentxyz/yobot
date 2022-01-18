// Identicon.tsx
import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useYobot } from "src/contexts/YobotContext";
import Jazzicon from "@metamask/jazzicon";

const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  background-color: black;
`;

export default function Identicon() {
  const ref = useRef<HTMLDivElement>();
  const { address } = useYobot();

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(Jazzicon(16, parseInt(address.slice(2, 10), 16)));
    }
  }, [address]);

  return <StyledIdenticon ref={ref as any} />;
}
