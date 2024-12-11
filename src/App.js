import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import AppRoutes from "./routes";
import "./index.css";

function App() {
  /** 전역 테마 설정 */
  const antdTheme = {
    token: {
      fontFamily: "Pretendard",
      colorPrimary: "#457c9d",
    },
  };

  return (
    <ConfigProvider theme={antdTheme}>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
