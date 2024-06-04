import { createElement } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthRoutes } from './modules/authentication/auth.routes';
import { CoreRoutes } from './modules/core/core.routes';

/**
 * Application routes
 * https://reactrouter.com/en/main/routers/create-browser-router
 */

const router = createBrowserRouter([...CoreRoutes, ...AuthRoutes]);

export function Router(): JSX.Element {
  return createElement(RouterProvider, { router });
}

// Clean up on module reload (HMR)
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot != null) {
  import.meta.hot.dispose(() => {
    router.dispose();
  });
}
