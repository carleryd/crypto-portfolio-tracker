import { useParams } from "react-router-dom";

export const ROUTES = {
  HOME: "/",
  CURRENCY: "/currency/:currencyId",
} as const;

export type RouteParams = {
  [ROUTES.CURRENCY]: { currencyId: string };
};

export const useTypedParams = <T extends keyof RouteParams>() => {
  return useParams<RouteParams[T]>();
};
