import styled from "@emotion/styled";


const FAQP = styled.p`
  width: auto;
  height: auto;
  flex-grow: 0;
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.03;
  letter-spacing: normal;
  text-align: left;
  color: #c8cacf;
  cursor: pointer;
  margin: auto;
`;

const FAQ = ({ mx="" }) => (
  <FAQP style={{ marginLeft: mx }}>FAQ</FAQP>
)

export default FAQ;