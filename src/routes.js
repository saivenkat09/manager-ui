import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Home from "./views/Home";
import Profile from "./views/Profile";
import Project from "./views/Project";
import Employee from "./views/Employee";
import Resource from "./views/Resource";
import OtherUserProfile from "./components/OtherUserProfile";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/home" />,
  },
  {
    path: "/home",
    layout: DefaultLayout,
    component: Home,
  },
  {
    path: "/profile",
    layout: DefaultLayout,
    component: Profile,
  },
  {
    path: "/project",
    layout: DefaultLayout,
    component: Project,
  },

  {
    path: "/employee",
    exact: true,
    layout: DefaultLayout,
    component: Employee,
  },
  {
    path: "/resource",
    layout: DefaultLayout,
    component: Resource,
  },
  {
    path: "/employee/profile",
    exact: true,
    layout: DefaultLayout,
    component: OtherUserProfile,
  },
];
