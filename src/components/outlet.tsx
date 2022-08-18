import React, { createContext, useContext, useMemo } from "react";

type OutletProps<Data> = { data: Data; children: React.ReactNode };

const context = createContext<unknown>(null);

/**
 * Use it in Route Layout to pass down data to children.
 * 
 * example:
 * ```tsx
const MyLayout = ({ children }: { children?: React.ReactNode }) => {
  const data = //any thing you want, even from a hook that fetches from an API (with isLoading state etc...);
  return (
    <Box justifyContent="space-between">
      <Outlet data={data}>{children}</Outlet>
      <Box>Right aside</Box>
    </Box>
  );
};
```
 */
export function Outlet<Data = { [key: string]: unknown }>({
  data,
  children,
}: OutletProps<Data>) {
  return (
    <context.Provider value={useMemo(() => data, [data])}>
      {children}
    </context.Provider>
  );
}

/**
 * Get data passed down from the **last** `<Outlet />` rendered in the Route tree.
 */
export function useParentData() {
  const parentData = useContext(context);

  if (parentData === null)
    throw new Error(
      "useParentData must be used within an Outlet. Did you forget to wrap your layout's children with <Outlet />?"
    );

  return parentData;
}
