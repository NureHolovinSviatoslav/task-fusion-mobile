import { Project, useProjects } from '@/apis/projects';
import { useUserProfile } from '@/apis/users';
import { UserType } from '@/types/enums';
import { formatDateDD_MM_YYYY } from '@/utils';
import { Link } from 'expo-router';
import { ClockArrowDown, ClockArrowUp } from 'lucide-react-native';
import { FC } from 'react';
import { FlatList, View } from 'react-native';
import { Heading } from '../ui/heading';
import { HStack } from '../ui/hstack';
import { Pressable } from '../ui/pressable';
import { Text } from '../ui/text';
import { VStack } from '../ui/vstack';

const getDashboard = (userType?: UserType) => {
  switch (userType) {
    case UserType.CLIENT:
      return 'Client Dashboard';
    case UserType.DEVELOPER:
      return 'Developer Dashboard';
    case UserType.PM:
      return 'PM Dashboard';
    default:
      return 'Dashboard';
  }
};

export const Dashboard: FC = () => {
  const { data: projects, refetch, isRefetching } = useProjects();
  const { data: profile } = useUserProfile();

  return (
    <VStack className="p-4 pb-0 flex-1" space="xl">
      <Heading size="3xl">{getDashboard(profile?.userType)}</Heading>
      <View className="flex-1">
        <FlatList
          data={(projects || []) as Project[]}
          keyExtractor={(project) => String(project.id)}
          refreshing={isRefetching}
          onRefresh={refetch}
          ListEmptyComponent={() => (
            <Text className="text-center font-medium">No projects</Text>
          )}
          renderItem={({ item: project }) => (
            <Link href={`/project/${project.id}`} asChild>
              <Pressable>
                <VStack
                  key={project.id}
                  className="bg-gray-200 w-full p-4 rounded-xl my-2"
                  space="xs"
                >
                  <Text size="2xl" className="text-black">
                    {project.title}
                  </Text>
                  <Text size="xl" className="text-typography-500">
                    {project.description}
                  </Text>
                  <HStack className="justify-between">
                    <HStack className="items-center gap-1">
                      <ClockArrowDown color="#000000" size={20} />
                      <Text>{formatDateDD_MM_YYYY(project.deadline)}</Text>
                    </HStack>
                    <HStack className="items-center gap-1">
                      <ClockArrowUp color="#000000" size={20} />
                      <Text>{formatDateDD_MM_YYYY(project.updatedAt)}</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Pressable>
            </Link>
          )}
        />
      </View>
    </VStack>
  );
};
