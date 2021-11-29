import { Link } from "@chakra-ui/react";
import styled from "@emotion/styled";

const NoShadowLink = styled(Link)`
  text-decoration: none;

  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
  }

  &:hover {
    text-decoration: none;
  }
`;

export default NoShadowLink;
