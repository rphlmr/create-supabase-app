#!/usr/bin/env node
import React from "react";

import { AuthProvider } from "@auth/auth-context";
import AppLayout from "@layouts/app-layout";
import { Router, Route } from "@router/router";
import { RouterProvider } from "@router/router-context";
import AuthScreen from "@screens/auth";
import ConfirmName from "@screens/confirm-name";
import Demo from "@screens/demo";
import LeftAsideLayout from "@screens/left-aside-layout";
import NewProject from "@screens/new-project";
import RightAsideLayout from "@screens/right-aside-layout";
import WelcomeScreen from "@screens/welcome";

export const App = () => (
  <AuthProvider>
    <RouterProvider>
      <Router startingPath="/welcome" layout={<AppLayout />}>
        <Route path="/welcome" screen={<WelcomeScreen />} />
        <Route path="/" screen={<AuthScreen successTo="/menu" />}>
          <Route
            path="menu"
            screen={<NewProject />}
            layout={<RightAsideLayout />}
          >
            <Route
              path="name"
              screen={<ConfirmName />}
              layout={<LeftAsideLayout />}
            >
              <Route path="confirm" screen={<Demo />} />
            </Route>
            <Route path="list" screen={<Demo />} />
          </Route>
        </Route>
      </Router>
    </RouterProvider>
  </AuthProvider>
);
