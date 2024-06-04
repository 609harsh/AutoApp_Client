import { Flex, Spin } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';

import AuthPageLayout from '../../authentication/components/AuthPageLayout/AuthPageLayout.componet';
import { getCookie } from '../../core/utils/authUtils';
import { useFetchUserDetailsQuery } from '../apis/authApi';
import { useAuth } from '../hooks/useAuth';

type ProtectedRoutesProps = {
  isAuthRoute?: boolean;
};

export function ProtectedRoutes({ isAuthRoute = false }: ProtectedRoutesProps): JSX.Element {
  const cookie = getCookie('accessToken');
  const { loggedIn } = useAuth();

  let { isLoading, isFetching } = useFetchUserDetailsQuery(cookie);

  if (isLoading || isFetching) {
    return (
      <Flex className="h-screen w-screen items-center justify-center bg-background">
        <Spin size="large" />
      </Flex>
    );
  } else {
    if (isAuthRoute) {
      return !loggedIn ? (
        <AuthPageLayout>
          <Outlet />
        </AuthPageLayout>
      ) : (
        <Navigate to="/app" replace />
      );
    } else {
      return loggedIn ? <Outlet /> : <Navigate to="/auth/login" replace />;
    }
  }
}
