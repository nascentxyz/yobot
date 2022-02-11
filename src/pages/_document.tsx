import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript, useColorMode } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Yobot is a trustless broker to match off-chain bots with user contract call requests."
          />
          <meta name="author" content="Andreas Bigger <andreas@nascent.xyz>" />
        </Head>
        <body>
          <ColorModeScript initialColorMode="dark" />
          <Main />
          <NextScript />
          <style jsx global>{`
            html,
            body {
              min-height: 100%;
              height: 100%;
            }

            #__next {
              height: 100%;
              min-height: 100%;
            }

            @keyframes shake {
              10%,
              90% {
                transform: translate3d(-1px, 0, 0);
              }

              20%,
              80% {
                transform: translate3d(2px, 0, 0);
              }

              30%,
              50%,
              70% {
                transform: translate3d(-4px, 0, 0);
              }

              40%,
              60% {
                transform: translate3d(4px, 0, 0);
              }
            }

            @keyframes hit-bounce {
              0% {
                transform: scale(1) translateY(0);
              }
              10% {
                transform: scale(1.2, 0.6);
              }
              30% {
                transform: scale(0.8, 1.1) translateY(-10px);
              }
              50% {
                transform: scale(1) translateY(0);
              }
              100% {
                transform: translateY(0);
              }
            }
          `}</style>
        </body>
      </Html>
    );
  }
}
