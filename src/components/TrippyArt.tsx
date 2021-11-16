import { Flex } from "@chakra-ui/layout";
import React from "react";
import styled from "styled-components";

const TrippyImage = styled.img`
  // position: relative;
  width: 212px;
  height: 213px;
  flex-grow: 0;
  margin: auto;
  transform: rotate(13deg);
  border-radius: 16px;
  grid-column-start: 1;
  grid-row-start: 1;
`;

const ShadowBackground = styled.div`
  // position: relative;
  width: 215px;
  height: 215px;
  flex-grow: 0;
  margin: auto;
  transform: rotate(13deg);
  -webkit-filter: blur(25px);
  filter: blur(25px);
  background-color: #d42bd2;
  grid-column-start: 1;
  grid-row-start: 1;
`;

const TrippyArt = () => {
  return (
    <Flex w="100%" p="relative">
      <Flex m="auto" w="auto" p="relative" d="grid">
        <ShadowBackground />
        <TrippyImage src="/logo.png" alt="Main Art Piece" />
      </Flex>
    </Flex>
  );
};

export default TrippyArt;
