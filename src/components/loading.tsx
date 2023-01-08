import { Spin, SpinProps } from "antd";
import React from "react";

interface LoadingProps extends SpinProps {}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <Spin size="large" {...props}>
      <div className="content" />
    </Spin>
  );
};

export default Loading;
