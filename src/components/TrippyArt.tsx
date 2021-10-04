import React from "react";
import styled from 'styled-components';

const TrippyImage = styled.img`
  width: 212px;
  height: 213px;
  flex-grow: 0;
  margin: 78px 420.2px 0px 519.8px;
  transform: rotate(13deg);
  border-radius: 16px;
`;

const TrippyArt = () => {

  return (
    <TrippyImage src="src/assets/trippyimage.png" alt="Main Art Piece" />
  )
}

export default TrippyArt;