import { FC, PropsWithChildren } from 'react';
import { VStack } from '../ui/vstack';

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <VStack className="p-4 gap-2 bg-background-200/50 rounded-lg">
      {children}
    </VStack>
  );
};
