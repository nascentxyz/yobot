import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import theme from "../theme";
import { AppProps } from "next/app";
import "material-react-toastify/dist/ReactToastify.css";
import 'react-toastify/dist/ReactToastify.css';
import { YobotProvider } from "src/contexts/YobotContext";

import LogRocket from "logrocket";
// @ts-ignore
import { version } from "../../package.json";
export { version };

if (process.env.NODE_ENV === "production") {
  console.log("Connecting to LogRocket...");
  LogRocket.init("vulxom/yobot", {
    console: {
      shouldAggregateConsoleErrors: true,
    },
    release: version,
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <title>Yobot</title>
      </Head>
      <YobotProvider>
        <Component {...pageProps} />
      </YobotProvider>
      <style jsx global>{`
        html,
        body {
          min-height: 100%;
          height: 100%;
          font-family: Azeret Mono, monospace;
        }

        #__next {
          height: 100%;
          min-height: 100%;
        }
      `}</style>
    </ChakraProvider>
  );
}

export default MyApp;
