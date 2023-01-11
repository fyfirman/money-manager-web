import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/utils/query-client";
import { theme } from "~/styles/theme";
import { ConfigProvider, Layout } from "antd";
import { env } from "~/utils/env-variable";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "../styles/globals.css";
import "~/utils/dayjs";
import "antd/dist/reset.css";
import Navbar from "~/components/navbar";
import Head from "next/head";

const { Content, Footer } = Layout;

if (env.enableMock) {
  require("~/mocks/setup");
}

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        <Head>
          {/* Add this meta to allow use http over https */}
          <meta content="upgrade-insecure-requests" httpEquiv="Content-Security-Policy" />
        </Head>
        <Layout className="layout">
          <Navbar />
          <Content>
            <Component {...pageProps} />
          </Content>
          <Footer className="flex justify-center items-center">
            Template starter by fyfirman
          </Footer>
        </Layout>
      </ConfigProvider>
      {process.env.NODE_ENV === "development" ? <ReactQueryDevtools /> : null}
    </QueryClientProvider>
  );
}

export default App;
