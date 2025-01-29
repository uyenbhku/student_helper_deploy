import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";
import { LayoutWrapper } from "./components/Layout";
import viVN from 'antd/locale/vi_VN';


// Example pages for routing
const HomePage = React.lazy(() => import("./pages/home/Home"));
const AboutPage = React.lazy(() => import("./pages/About"));
const ContactPage = React.lazy(() => import("./pages/Contact"));

function App() {
  
  return (
    <ConfigProvider locale={viVN}>
      <AntdApp>
        <Router>
          <Routes>
              <Route path="/" element={<LayoutWrapper />}>
                  <Route index element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
              </Route>
          </Routes>
        </Router>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;