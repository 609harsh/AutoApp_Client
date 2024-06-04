import { Suspense } from 'react';
import { Flex, Skeleton, Spin } from 'antd';

type SuspenseLoaderProps = {
  children: JSX.Element;
  isAuthRoute?: boolean;
};

function SuspenseLoader({ children, isAuthRoute }: SuspenseLoaderProps): JSX.Element {
  return (
    <Suspense
      fallback={
        isAuthRoute ? (
          <Flex vertical className="mt-20 w-full max-w-sm gap-6">
            <Skeleton.Input active className="!h-32 !w-full !max-w-sm" />
            <Skeleton.Input active className="!h-20 !w-full !max-w-sm" />
            <Skeleton.Input active className="!h-20 !w-full !max-w-sm" />
            <Skeleton.Button active className="!w-full !max-w-sm" />
          </Flex>
        ) : (
          <Flex className="h-screen w-screen items-center justify-center bg-background">
            <Spin size="large" />
          </Flex>
        )
      }
    >
      {children}
    </Suspense>
  );
}

export default SuspenseLoader;
