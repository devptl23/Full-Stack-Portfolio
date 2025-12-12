import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

// Lazy load components for better performance
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./about"));
const Contact = lazy(() => import("./contact"));
const Services = lazy(() => import("./services"));
const Projects = lazy(() => import("./projects"));
const SignIn = lazy(() => import("./components/SignIn"));
const SignUp = lazy(() => import("./components/SignUp"));
const ProjectForm = lazy(() => import("./components/ProjectForm"));
const ProjectsList = lazy(() => import("./components/ProjectsList"));
const QualificationForm = lazy(() => import("./components/QualificationForm"));
const QualificationsList = lazy(() => import("./components/QualificationsList"));
const ContactsList = lazy(() => import("./components/ContactsList"));
const PrivateRoute = lazy(() => import("./auth/PrivateRoute"));

const MainRouter = () => {
  return (
    <Suspense fallback={
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#646cff'
      }}>
        Loading...
      </div>
    }>
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
    </Suspense>
  );
};

export default MainRouter;
