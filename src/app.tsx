#!/usr/bin/env node
import React from "react";

import { AuthProvider } from "@auth/auth-context";
import AppLayout from "@layouts/app-layout";
import CreateAppLayout from "@layouts/create-app-layout";
import { Router, Route } from "@router/router";
import { RouterProvider } from "@router/router-context";
import AuthScreen from "@screens/auth";
import SelectFrameworkScreen from "@screens/create-app/select-framework";
import SelectOrganizationScreen from "@screens/create-app/select-organization";
import SelectProjectDirScreen from "@screens/create-app/select-project-dir";
import SelectTemplateScreen from "@screens/create-app/select-template";
import WelcomeScreen from "@screens/welcome";

export const App = () => (
  <AuthProvider>
    <RouterProvider>
      <Router
        startingPath="/create-app"
        layout={<AppLayout />}
      >
        <Route
          path="/welcome"
          screen={<WelcomeScreen />}
        />
        <Route
          path="/"
          screen={<AuthScreen successTo="/create-app" />}
        >
          <Route
            path="/create-app"
            screen={<SelectFrameworkScreen />}
            layout={<CreateAppLayout />}
          >
            <Route
              path="select-template"
              screen={<SelectTemplateScreen />}
            />
            <Route
              path="select-project-dir"
              screen={<SelectProjectDirScreen />}
            />
            <Route
              path="select-organization"
              screen={<SelectOrganizationScreen />}
            />
          </Route>
        </Route>
      </Router>
    </RouterProvider>
  </AuthProvider>
);
