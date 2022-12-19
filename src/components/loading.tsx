import { Spin } from "antd";
import React from "react";

const Loading: React.FC = () => {
  return (
    <Spin size="large" tip="Loading">
      <div className="content" />
    </Spin>
  );
};

export default Loading;
