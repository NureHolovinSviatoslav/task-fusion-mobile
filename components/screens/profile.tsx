import { useLogout, useUserProfile } from '@/apis/users';
import { FC } from 'react';
import { Avatar, AvatarFallbackText, AvatarImage } from '../ui/avatar';
import { Button, ButtonText } from '../ui/button';
import { HStack } from '../ui/hstack';
import { Text } from '../ui/text';
import { VStack } from '../ui/vstack';

export const Profile: FC = () => {
  const { data: profile } = useUserProfile();
  const { mutate: logout } = useLogout();

  if (!profile) return;

  return (
    <VStack className="flex-1 justify-between p-4 gap-2">
      <HStack className="gap-4">
        <Avatar size="xl">
          <AvatarImage />
          <AvatarFallbackText>{profile.name}</AvatarFallbackText>
        </Avatar>
        <VStack className="flex-1">
          <HStack className="h-8 gap-2 items-end">
            <Text size="2xl">{profile?.name}</Text>
            <Text size="xl" className="text-typography-500">
              {profile.userType}
            </Text>
          </HStack>
          <Text>{profile.description}</Text>
        </VStack>
      </HStack>
      <Button onPress={() => logout()}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </VStack>
  );
};
