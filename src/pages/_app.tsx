import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/utils/query-client";
import { theme } from "~/styles/theme";
import { ConfigProvider, Layout } from "antd";
import { env } from "~/utils/env-variable";
import Logo from "~/assets/logo.png";

import "../styles/globals.css";
import "~/utils/dayjs";
import "antd/dist/reset.css";

const { Header, Content, Footer } = Layout;

if (env.enableMock) {
  require("~/mocks/setup");
}

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme}>
        <Layout className="layout">
          <Header className="!bg-white shadow-md flex justify-center items-center">
            <img alt="logo" src={Logo.src} />
          </Header>
          <Content>
            <Component {...pageProps} />
          </Content>
          <Footer className="flex justify-center items-center">
            Template starter by fyfirman
          </Footer>
        </Layout>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
