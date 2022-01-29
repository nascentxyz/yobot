import { Link as ChakraLink, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { createGlobalStyle } from "styled-components";
import { DiscordSVG, TwitterSVG, YobotSVG } from "src/assets";
import { ConnectWallet, FAQ, LaunchAppButton } from ".";

const StyledYobot = styled(YobotSVG)`
  margin-right: auto;
  margin-left: 0px;
`;

const LaunchGroup = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
`;

const NavbarFlex = styled(Flex)`
  min-height: 100px;
  height: auto;
  max-height: 150px;
  padding: var(--chakra-space-8);
  padding-left: 26px;
  padding-right: 26px;
  width: 960px;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`;

const Navbar = ({ accountButton = false, launchApp = false, onOpen }) => {
  return (
    <header
      id="page-header"
      className="flex items-center flex-none py-4 shadow-sm bg-background z-1 font-Rubik"
    >
      <div className="container px-4 mx-auto xl:max-w-screen-lg lg:px-0">
        <div className="flex justify-between py-4">
          <div className="flex items-center">
            <a
              href="javascript:void(0)"
              className="inline-flex items-center space-x-2 text-lg font-bold tracking-wide text-gray-700 group hover:text-indigo-600 active:text-gray-700"
            >
              <img className="" src="../assets/YOBOTSVG.svg" />
            </a>
          </div>

          <div className="flex items-center space-x-1 lg:space-x-5">
            <nav className="hidden lg:flex lg:items-center lg:space-x-2">
              <a
                href="javascript:void(0)"
                className="flex items-center h-12 px-6 py-2 space-x-2 text-base font-medium text-white rounded-full bg-yobotblue"
              >
                <span>Connect Wallet</span>
              </a>
            </nav>

            <div className="lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center px-3 py-2 space-x-2 font-semibold leading-6 text-gray-800 bg-white border border-gray-300 rounded shadow-sm focus:outline-none hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block w-5 h-5 hi-solid hi-menu"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Visibility
            Closed        'hidden'
            Opened        '' (no class) */}
      </div>
    </header>
    // <NavbarFlex>
    //   <FontStyle />
    //   <ChakraLink href="/" d="flex" flexGrow={0}>
    //     <StyledYobot />
    //   </ChakraLink>
    //   <LaunchGroup>
    //     <LinkWrapper>
    //       <ChakraLink
    //         fontFamily="Roboto"
    //         textDecoration="none !important"
    //         height="min-content"
    //         margin="auto"
    //         onClick={onOpen}
    //       >
    //         <FAQ mx="0.5em" />
    //       </ChakraLink>
    //       <ChakraLink
    //         textDecoration="none !important"
    //         height="min-content"
    //         margin="auto"
    //         isExternal
    //         href="https://discord.gg/eSXG94jzqe"
    //       >
    //         <DiscordSVG mx="0.5em" />
    //       </ChakraLink>
    //       <ChakraLink
    //         textDecoration="none !important"
    //         height="min-content"
    //         margin="auto"
    //         isExternal
    //         href="https://twitter.com/yobotmarket"
    //       >
    //         <TwitterSVG mx="0.5em" />
    //       </ChakraLink>
    //     </LinkWrapper>
    //     {accountButton ? <ConnectWallet /> : null}
    //     {launchApp ? <LaunchAppButton /> : null}
    //   </LaunchGroup>
    // </NavbarFlex>
  );
};

export default Navbar;
