// Identicon.tsx
import { useEffect, useRef } from "react";
import { useEthers } from "@usedapp/core";
import styled from "@emotion/styled";

const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  background-color: black;
`;

export default function Identicon() {
  const ref = useRef<HTMLDivElement>();
  const { account } = useEthers();

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = "";
    }
  }, [account]);

  return <StyledIdenticon ref={ref as any}
}
