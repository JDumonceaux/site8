import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page2 from "../../pages/Page2";
import HomePage from "../../pages/Home";

interface IProps {
  children?: React.ReactNode;
}

export const RouterProvider = ({ children }: IProps) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </Router>
  );
};

export default RouterProvider;
