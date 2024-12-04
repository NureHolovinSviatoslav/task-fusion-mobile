import { useLogout, useUserProfile } from '@/apis/users';
import { FC } from 'react';
import { Avatar, AvatarFallbackText, AvatarImage } from '../ui/avatar';
import { Button, ButtonText } from '../ui/button';
import { Heading } from '../ui/heading';
import { HStack } from '../ui/hstack';
import { Text } from '../ui/text';
import { VStack } from '../ui/vstack';

export const Profile: FC = () => {
  const { data: profile } = useUserProfile();
  const { mutate: logout } = useLogout();

  if (!profile) return;

  return (
    <VStack className="flex-1 justify-between p-4 gap-2">
      <VStack className="gap-3">
        <Heading size="3xl">{`Welcome, ${profile.name}`}</Heading>
        <HStack className="gap-4">
          <Avatar size="xl">
            <AvatarImage />
            <AvatarFallbackText>{profile.name}</AvatarFallbackText>
          </Avatar>
          <VStack className="flex-1">
            <Text size="2xl">{profile.userType}</Text>
            <Text size="md">{profile.email}</Text>
          </VStack>
        </HStack>
        <VStack>
          <Heading>Description</Heading>
          <Text>{profile.description}</Text>
        </VStack>
      </VStack>
      <Button onPress={() => logout()}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </VStack>
  );
};
