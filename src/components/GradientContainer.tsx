import styled from "@emotion/styled";
import { Container } from ".";

const GC = styled(Container)`
  min-height: 100%;
  min-width: min-content;
  background-image: linear-gradient(to bottom, #243027, #1c1818);
`;

const GradientContainer = ({ children }) => <GC>{children}</GC>;

export default GradientContainer;
