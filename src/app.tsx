#!/usr/bin/env node
import React from "react";

import { AuthProvider } from "@auth/auth-context";
import AppLayout from "@layouts/app-layout";
import { Router, Route } from "@router/router";
import { RouterProvider } from "@router/router-context";
import AuthScreen from "@screens/auth";
import SelectFrameworkScreen from "@screens/create-app/select-framework";
import SelectLocationScreen from "@screens/create-app/select-location";
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
          >
            <Route
              path="select-template"
              screen={<SelectTemplateScreen />}
            />
            <Route
              path="select-location"
              screen={<SelectLocationScreen />}
            />
          </Route>
        </Route>
      </Router>
    </RouterProvider>
  </AuthProvider>
);
