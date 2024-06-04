import { Button, Flex, Result } from 'antd';
import { type ResultStatusType } from 'antd/es/result';
import { useNavigate, useRouteError } from 'react-router-dom';

export function RootError(): JSX.Element {
  const routeError: RouteError = useRouteError() as RouteError;
  const navigate = useNavigate();
  return (
    <Flex className="h-screen" align="center" justify="center">
      {routeError.status !== null && (
        <Result
          status={routeError.status as ResultStatusType}
          title={routeError.status}
          subTitle={routeError.statusText ?? routeError.message}
          extra={
            <Button
              type="primary"
              onClick={() => {
                navigate('/');
              }}
            >
              Back Home
            </Button>
          }
        />
      )}
      {routeError.status === null && (
        <Result
          status={'error'}
          title="Encountered an Error in the System"
          subTitle={routeError.statusText ?? routeError.message}
          extra={
            <Button
              type="primary"
              onClick={() => {
                navigate('/');
              }}
            >
              Back Home
            </Button>
          }
        />
      )}
    </Flex>
  );
}

type RouteError = Error & { status?: number; statusText?: string };
