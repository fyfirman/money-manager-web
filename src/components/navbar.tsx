import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Layout } from "antd";
import { ChangeEventHandler, useState } from "react";
import Logo from "~/assets/logo.png";
import { baseUrlRegex } from "~/helpers/regex";
import { useConfigStore } from "~/stores/config.store";

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
    <Header className="!bg-white shadow-md flex justify-between items-center">
      <span />
      <img alt="logo" src={Logo.src} />
      <div className="max-h-[64px] flex gap-1">
        <Input
          className="max-w-[200px]"
          defaultValue={baseUrl}
          onChange={handleConfigChange}
          placeholder="http://192.168.1.23:8888"
          status={!!error ? "error" : undefined}
        />
        <Button onClick={handleRefresh}>Refresh</Button>
      </div>
    </Header>
  );
};

export default Navbar;
