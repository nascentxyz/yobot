import styled from "@emotion/styled";

const HeadlineImage = styled.img`
  width: auto;
  flex-grow: 0;
  margin: 1em auto 1em auto;
  grid-column-start: 1;
  grid-row-start: 1;
`;

const Headline = () => {
  return (
    <HeadlineImage src="/headline.png" alt="MINT ARTBLOCKS BEFORE THE CROWD" />
  );
};

export default Headline;
