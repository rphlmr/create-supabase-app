#!/usr/bin/env node
import React from "react";

import { AuthProvider } from "@auth/auth-context";
import AppLayout from "@layouts/app-layout";
import CreateAppLayout from "@layouts/create-app-layout";
import { Router, Route } from "@router/router";
import { RouterProvider } from "@router/router-context";
import AuthScreen from "@screens/auth";
import CreateOrganizationScreen from "@screens/create-app/organization/create-organization";
import SelectOrganizationScreen from "@screens/create-app/organization/select-organization";
import CreateProjectScreen from "@screens/create-app/project/create-project";
import DbPasswordScreen from "@screens/create-app/project/db-password";
import SelectPlanScreen from "@screens/create-app/project/select-plan";
import SelectRegionScreen from "@screens/create-app/project/select-region";
import SupabaseProjectNameScreen from "@screens/create-app/project/supabase-project-name";
import SelectFrameworkScreen from "@screens/create-app/select-framework";
import SelectProjectDirScreen from "@screens/create-app/select-project-dir";
import SelectTemplateScreen from "@screens/create-app/select-template";
import WelcomeScreen from "@screens/welcome";

export const App = () => (
  <AuthProvider>
    <RouterProvider>
      <Router
        startingPath="/welcome"
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
            path="create-app"
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
              path="organization"
              screen={<SelectOrganizationScreen />}
            >
              <Route
                path="create"
                screen={<CreateOrganizationScreen />}
              />
            </Route>
            <Route
              path="project"
              screen={<SupabaseProjectNameScreen />}
            >
              <Route
                path="db-password"
                screen={<DbPasswordScreen />}
              />
              <Route
                path="region"
                screen={<SelectRegionScreen />}
              />
              <Route
                path="plan"
                screen={<SelectPlanScreen />}
              />
              <Route
                path="create"
                screen={<CreateProjectScreen />}
              />
            </Route>
          </Route>
        </Route>
      </Router>
    </RouterProvider>
  </AuthProvider>
);
