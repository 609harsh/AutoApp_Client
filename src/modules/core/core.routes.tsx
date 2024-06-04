import { RouteObject } from 'react-router-dom';

import SuspenseLoader from '../authentication/components/SuspenseLoader/SuspenseLoader.component';
import { ProtectedRoutes } from '../shared/components/protected-routes.component';
import { RootError } from '../shared/components/route-error';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import EditorPage from './pages/EditorPage/EditorPage';
import LandingPage from './pages/LandingPage/LandingPage';
import Preview from './pages/Preview/Preview';

export const CoreRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <RootError />
  },
  {
    path: 'app',
    element: <ProtectedRoutes />,
    errorElement: <RootError />,
    children: [
      {
        index: true,
        element: (
          <SuspenseLoader>
            <DashboardPage />
          </SuspenseLoader>
        )
      },
      {
        path: 'editor/:id',
        element: (
          <SuspenseLoader>
            <EditorPage />
          </SuspenseLoader>
        )
      },
      {
        path: 'preview/:id',
        element: (
          <SuspenseLoader>
            <Preview/>
          </SuspenseLoader>
        )
      }
    ]
  }
];
