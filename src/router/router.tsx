import React, { cloneElement } from "react";

import { NotFoundScreen as DefaultNotFoundScreen } from "./not-found-screen";
import { useRouter } from "./router-context";
import type { RouteComponent, RouterComponent } from "./types";

export const Router: RouterComponent = ({
  layout = <></>,
  notFoundScreen = <DefaultNotFoundScreen />,
}) => {
  const { outlet } = useRouter();

  return cloneElement(layout, {}, outlet ?? notFoundScreen);
};

export const Route: RouteComponent = ({ screen }) => cloneElement(screen);
