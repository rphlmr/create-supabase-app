#!/usr/bin/env node
import React from "react";

import { AuthProvider } from "@auth/auth-context";
import AppLayout from "@layouts/app-layout";
import { Router, Route } from "@router/router";
import { RouterProvider } from "@router/router-context";
import AuthScreen from "@screens/auth";
import ConfirmName from "@screens/confirm-name";
import SelectFramework from "@screens/create-app/select-framework";
import Demo from "@screens/demo";
import LeftAsideLayout from "@screens/left-aside-layout";
import WelcomeScreen from "@screens/welcome";

export const App = () => (
  <AuthProvider>
    <RouterProvider>
      <Router startingPath="/create-app" layout={<AppLayout />}>
        <Route path="/welcome" screen={<WelcomeScreen />} />
        <Route path="/" screen={<AuthScreen successTo="/create-app" />}>
          <Route path="/create-app" screen={<SelectFramework />}>
            <Route path="select-template" screen={<Demo />} />
          </Route>
        </Route>
      </Router>
    </RouterProvider>
  </AuthProvider>
);
