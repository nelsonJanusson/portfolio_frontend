import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

// Define the root route **CORRECTLY**
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Define child routes with a proper `getParentRoute`
const homeRoute = createRoute({
  getParentRoute: () => rootRoute, // Correct reference to root
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute, // Correct reference to root
  path: "/about",
  component: AboutPage,
});

// Create the router and register routes
export const router = createRouter({
  routeTree: rootRoute.addChildren([homeRoute, aboutRoute]),
});

// Required for TypeScript support
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
