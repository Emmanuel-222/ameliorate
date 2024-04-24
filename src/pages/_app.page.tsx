import { UserProvider as AuthUserProvider } from "@auth0/nextjs-auth0/client";
import { Global } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";

import Layout from "../web/common/components/Layout";
import { getThemeOptions } from "../web/common/theme";
import { trpc } from "../web/common/trpc";
import { globals } from "./_app.styles";
import "../web/common/globals.css";

// eslint-disable-next-line functional/no-let -- jank way to enable trpc queries outside of react tree, e.g. from zustand middleware https://github.com/trpc/trpc/discussions/2926#discussioncomment-5647033
export let trpcClient = null as unknown as ReturnType<typeof trpc.useContext>["client"];

const MyApp = ({ Component, pageProps }: AppProps) => {
  const theme = createTheme(getThemeOptions("light"));

  const utils = trpc.useContext();
  useEffect(() => {
    trpcClient = utils.client;
  }, [utils.client]);

  return (
    <>
      <Head>
        <title>Ameliorate</title>
        <meta name="description" content="Solve problems" />
        <link rel="icon" href="/favicon.ico" />

        {/* https://mui.com/material-ui/getting-started/usage/#responsive-meta-tag */}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AuthUserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthUserProvider>
      </ThemeProvider>

      <Global styles={globals} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
