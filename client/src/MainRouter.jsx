import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./about";
import Contact from "./contact";
import Services from "./services";
import Projects from "./projects";
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ProjectForm from "./components/ProjectForm";
import ProjectsList from "./components/ProjectsList";
import QualificationForm from "./components/QualificationForm";
import QualificationsList from "./components/QualificationsList";
import ContactsList from "./components/ContactsList";
import PrivateRoute from "./auth/PrivateRoute";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />

        {/* Authentication routes */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        {/* Public list views - anyone can view */}
        <Route path="projects-list" element={<ProjectsList />} />
        <Route path="qualifications-list" element={<QualificationsList />} />

        {/* Protected routes - require authentication for CRUD operations */}
        <Route path="project/new" element={
          <PrivateRoute>
            <ProjectForm />
          </PrivateRoute>
        } />
        <Route path="project/edit/:projectId" element={
          <PrivateRoute>
            <ProjectForm />
          </PrivateRoute>
        } />

        <Route path="qualification/new" element={
          <PrivateRoute>
            <QualificationForm />
          </PrivateRoute>
        } />
        <Route path="qualification/edit/:qualificationId" element={
          <PrivateRoute>
            <QualificationForm />
          </PrivateRoute>
        } />

        {/* Admin only - contact messages */}
        <Route path="contacts-list" element={
          <PrivateRoute>
            <ContactsList />
          </PrivateRoute>
        } />
      </Route>
    </Routes>
  );
};

export default MainRouter;
