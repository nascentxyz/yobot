import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript, useColorMode } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>Yobot</title>
          <meta
            name="description"
            content="Yobot is a trustless broker to match off-chain bots with user contract call requests."
          />
          <meta name="author" content="Andreas Bigger <abigger@nascent.xyz>" />
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
          `}</style>
        </body>
      </Html>
    );
  }
}
