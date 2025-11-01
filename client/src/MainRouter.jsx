import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./about";
import Contact from "./contact";
import Services from "./services";
import Projects from "./projects";
import Layout from "./components/Layout";


const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
       
      </Route>
    </Routes>
  );
};

export default MainRouter;
