/**
 * A naive implementation of a router that can be used to render screens.
 * Inspired by https://reactrouter.com/ and https://reactnavigation.org/
 * Maybe this should be a separate package?
 * Maybe not
 * Maybe it'll just not work
 * This are Copilot's thoughts ... 😂
 */

import React, {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { isEmpty } from "@utils/is-empty";

import { Route, Router } from "./router";
import type {
  RouteProps,
  RouterContext,
  RouterProps,
  Screen,
  ScreenLayout,
} from "./types";

type ScreensRegistry = Map<string, Screen>;
type LayoutsRegistry = Map<string, ScreenLayout>;

interface RouterState {
  route: {
    path: string;
    params: { [key: string]: unknown };
  };
  startingPath: string;
  screens: ScreensRegistry;
  layouts: LayoutsRegistry;
}

function getScreenPathTree(path: string) {
  return [
    ...new Set(
      path
        .split("/")
        .reduce(
          (acc: string[], path, index, arr) => [
            ...acc,
            acc.length > 0
              ? acc[index - 1] === "/"
                ? `${acc[index - 1]}${path}`
                : `${acc[index - 1]}/${path}`
              : arr[0]
              ? `${path}`
              : "/",
          ],
          []
        )
    ),
  ];
}

function sanitizePath(path: string) {
  return path.startsWith("/") ? path.slice(1) : path;
}

function buildRoutesMap(
  screens: ScreensRegistry,
  layouts: LayoutsRegistry,
  children: React.ReactNode,
  rootPath = ""
) {
  Children.forEach(children, (child) => {
    if (!isValidElement(child))
      throw new Error("Router can only have React elements as children");

    if (child.type !== Route)
      throw new Error("Router can only have Route elements as children");

    const { screen, path, children, layout } = child.props as RouteProps;

    if (isEmpty(path)) throw new Error("Route path must be a non-empty string");

    const fullPath = isEmpty(rootPath)
      ? path
      : rootPath === "/"
      ? `${rootPath}${sanitizePath(path)}`
      : `${rootPath}/${sanitizePath(path)}`;

    if (!isValidElement(screen))
      throw new Error(
        `Route for path "${fullPath}" should avec a valid "screen" component`
      );

    if (layout) layouts.set(fullPath, layout);

    screens.set(fullPath, screen);

    if (Children.count(children) > 0) {
      buildRoutesMap(screens, layouts, children, fullPath);
    }
  });
}

function initRouterState(children: React.ReactNode): RouterState {
  let rootPath = "";
  const screens: ScreensRegistry = new Map();
  const layouts: LayoutsRegistry = new Map();

  if (Children.count(children) === 0)
    throw new Error("RouterProvider requires at least one Router");

  if (Children.count(children) > 1)
    throw new Error("RouterProvider only accepts one Router");

  const RouterComponent = Children.only(children);

  if (!isValidElement(RouterComponent))
    throw new Error("RouterProvider requires a valid Router element");

  if (RouterComponent.type !== Router)
    throw new Error("RouterProvider requires an only child of type Router");

  const { children: routerChildren, startingPath: routerStartingPath } =
    RouterComponent.props as RouterProps;

  if (Children.count(routerChildren) === 0)
    throw new Error("Router requires at least one child");

  Children.forEach(routerChildren, (child, index) => {
    buildRoutesMap(screens, layouts, child);

    if (index === 0 && isValidElement(child))
      rootPath = (child.props as RouteProps).path;
  });

  return {
    screens,
    layouts,
    startingPath: routerStartingPath || rootPath,
    route: {
      path: routerStartingPath || rootPath,
      params: {},
    },
  };
}

const Context = createContext<RouterContext | undefined>(undefined);

const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const [routerState, setRouterState] = useState<RouterState>(() =>
    initRouterState(children)
  );

  const navigateTo = useCallback(
    (
      path: string,
      params: { [key: string]: unknown } = {},
      options: { replaceParams: boolean } = { replaceParams: false }
    ) => {
      if (!routerState.route.path)
        throw new Error("Router is not initialized. Should not happen");

      return setRouterState(
        (prev): RouterState => ({
          ...prev,
          route: {
            path,
            params: options.replaceParams
              ? { ...params }
              : { ...prev.route.params, ...params },
          },
        })
      );
    },
    [routerState.route]
  );

  const createScreenTree = useCallback(
    (currentPath: string) => {
      const route = routerState.screens.get(currentPath);

      if (!route) return;

      return getScreenPathTree(currentPath)
        .map((path) => routerState.layouts.get(path))
        .filter(isValidElement)
        .reduceRight(
          (node: React.ReactNode, layout) => cloneElement(layout, {}, node),
          route
        );
    },
    [routerState.layouts, routerState.screens]
  );

  const value = useMemo(
    (): RouterContext => ({
      outlet: createScreenTree(routerState.route.path),
      navigation: {
        navigateTo,
        restart: () =>
          navigateTo(routerState.startingPath, {}, { replaceParams: true }),
      },
      route: routerState.route,
    }),
    [createScreenTree, navigateTo, routerState.route, routerState.startingPath]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useRouter = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
};

const useNavigation = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a RouterProvider");
  }

  const { navigation } = context;

  return { ...navigation };
};

const useRoute = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useRoute must be used within a RouterProvider");
  }

  const { route } = context;

  return route;
};

const useRouteParams = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useRouteParams must be used within a RouterProvider");
  }

  const { route } = context;

  return route.params;
};

export { RouterProvider, useRouter, useNavigation, useRoute, useRouteParams };
