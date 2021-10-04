import styled from "@emotion/styled";

const NFTBox = styled.div`
  min-width: 480px;
  height: auto;
  margin: auto;
  padding: 4em;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
`;

const TrippyImage = styled.img`
  width: auto;
  min-height: 200px;
  padding: 0 2em 0 2em;
  height: auto;
  margin: 2em auto 2em auto;
  -webkit-filter: blur(25px);
  filter: blur(25px);
  background-color: #d42bd2;
`;

const DropTitle = styled.p`
  min-width: 157px;
  min-height: 28px;
  // margin: auto;
  font-family: Roboto;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  padding: 0.5em 0 0.5em 0;
`;

const DropDateTime = styled.p`
  min-width: 105px;
  min-height: 56px;
  // margin: auto;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  padding: 0.2em 0 0 0;
`;

const NFTFrame = ({title='ArtBlocks Launch', dateTime='04/02/2021 16:40 PST'}) => {

  return (
    <NFTBox>
      <TrippyImage src="src/assets/trippyimage.png" alt="Main Art Piece" />
      <DropTitle>{title}</DropTitle>
      <DropDateTime>{dateTime}</DropDateTime>
    </NFTBox>
  )
}

export default NFTFrame;