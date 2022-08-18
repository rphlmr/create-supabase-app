import type React from "react";

// FIXME: sync this with context value
export interface RouterContext {
  navigation: {
    navigateTo: (
      path: string,
      params?: { [key: string]: unknown },
      options?: { replaceParams: boolean }
    ) => void;
    restart: () => void;
  };
  outlet: React.ReactNode;
  route: {
    path: string;
    params: { [key: string]: unknown };
  };
}

export interface RouterProps {
  children: React.ReactNode;
  startingPath?: string;
  layout?: ScreenLayout;
  notFoundScreen?: Screen;
}

export type RouterComponent = React.FC<RouterProps>;

export interface RouteProps {
  screen: Screen;
  path: string;
  children?: React.ReactNode;
  layout?: ScreenLayout;
}

export type RouteComponent = React.FC<RouteProps>;

export type Screen = React.ReactElement;
export type ScreenLayout = React.ReactElement;
