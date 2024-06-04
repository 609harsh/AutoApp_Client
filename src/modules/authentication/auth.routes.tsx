import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { ProtectedRoutes } from '../shared/components/protected-routes.component';
import { RootError } from '../shared/components/route-error';
import SuspenseLoader from './components/SuspenseLoader/SuspenseLoader.component';

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage/SignupPage'));
const InvitationsPage = lazy(() => import('./pages/InvitationsPage/InvitationsPage'));

export const AuthRoutes: RouteObject[] = [
  {
    path: 'auth',
    element: <ProtectedRoutes isAuthRoute={true} />,
    errorElement: <RootError />,
    children: [
      {
        index: true,
        element: <Navigate to="login" />
      },
      {
        path: 'login',
        element: (
          <SuspenseLoader isAuthRoute={true}>
            <LoginPage />
          </SuspenseLoader>
        )
      },
      {
        path: 'signup',
        element: (
          <SuspenseLoader isAuthRoute={true}>
            <SignupPage />
          </SuspenseLoader>
        )
      },
      {
        path: 'invitations/:invitationId',
        element: (
          <SuspenseLoader isAuthRoute={true}>
            <InvitationsPage />
          </SuspenseLoader>
        )
      }
    ]
  }
];
