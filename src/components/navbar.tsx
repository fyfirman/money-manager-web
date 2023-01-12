import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Layout } from "antd";
import { ChangeEventHandler, useState } from "react";
import Logo from "~/assets/logo.png";
import { baseUrlRegex } from "~/helpers/regex";
import { useConfigStore } from "~/stores/config.store";
import { env } from "~/utils/env-variable";

const { Header } = Layout;

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const baseUrl = useConfigStore((state) => state.baseUrl);
  const queryClient = useQueryClient();

  const [error, setError] = useState("");

  const handleConfigChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!baseUrlRegex.test(event.target.value)) {
      setError("Url is not valid format");
      return;
    } else {
      setError("");
    }
    useConfigStore.setState({
      baseUrl: event.target.value,
    });
  };

  const handleRefresh = () => {
    void queryClient.resetQueries();
  };

  return (
    <Header className="!bg-white shadow-md flex justify-between items-center relative">
      <span />
      <img alt="logo" src={Logo.src} />
      <div className="max-h-[64px] flex gap-1">
        <Input
          className="max-w-[200px]"
          defaultValue={env.enableMock ? "http://localhost:3000" : baseUrl}
          disabled={env.enableMock}
          onChange={handleConfigChange}
          placeholder="http://192.168.1.23:8888"
          status={!!error ? "error" : undefined}
        />
        <Button disabled={env.enableMock} onClick={handleRefresh}>
          Refresh
        </Button>
      </div>
      {env.enableMock ? (
        <div
          className="absolute top-[-10px] right-[-20px]"
          style={{ transform: "rotate(45deg)" }}
        >
          <span
            className="bg-yellow-300 px-6 py-0.5 text-white text-sm font-semibold shadow-sm shadow-gray-300"
            style={{ textShadow: "0 1px 1px rgba(0,0,0,.1)" }}
          >
            Mock
          </span>
        </div>
      ) : null}
    </Header>
  );
};

export default Navbar;
