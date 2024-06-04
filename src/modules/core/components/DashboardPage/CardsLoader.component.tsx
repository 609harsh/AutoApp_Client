import { Flex, Skeleton } from 'antd';

const CardsLoader: React.FC = () => {
  return (
    <Flex className="grid w-full grid-cols-2 gap-10 sm:grid-cols-4">
      <Skeleton.Button active className="!h-36 !w-full" />
      <Skeleton.Button active className="!h-36 !w-full" />
      <Skeleton.Button active className="!h-36 !w-full" />
      <Skeleton.Button active className="!h-36 !w-full" />
      <Skeleton.Button active className="!h-36 !w-full" />
    </Flex>
  );
};

export default CardsLoader;
