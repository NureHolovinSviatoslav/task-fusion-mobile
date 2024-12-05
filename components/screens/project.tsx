import {
  useProjectDevelopers,
  useProjectPm,
  useUserProject,
} from '@/apis/projects';
import { formatDateDD_MM_YYYY_MM_HH } from '@/utils';
import { FC, PropsWithChildren, useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Heading } from '../ui/heading';
import { HStack } from '../ui/hstack';
import { Text } from '../ui/text';
import { VStack } from '../ui/vstack';

interface ProjectProps {
  projectId: string | number;
}

const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <VStack className="p-4 gap-2 bg-background-200/50 rounded-lg">
      {children}
    </VStack>
  );
};

export const Project: FC<ProjectProps> = ({ projectId }) => {
  const {
    data: project,
    refetch: refetchProject,
    isFetching: isRefetchingProject,
  } = useUserProject(projectId);

  const {
    data: projectPm,
    refetch: refetchProjectPm,
    isFetching: isRefetchingProjectPm,
  } = useProjectPm(projectId);

  const {
    data: projectDevelopers,
    refetch: refetchProjectDevelopers,
    isFetching: isRefetchingProjectDevelopers,
  } = useProjectDevelopers(projectId);

  const refresh = useCallback(() => {
    refetchProject();
    refetchProjectPm();
    refetchProjectDevelopers();
  }, [refetchProject, refetchProjectPm, refetchProjectDevelopers]);

  const isRefreshing =
    isRefetchingProject ||
    isRefetchingProjectPm ||
    isRefetchingProjectDevelopers;

  if (!project) return;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      }
    >
      <VStack className="p-4 flex-grow">
        <Card>
          <HStack className="justify-between items-center  gap-2">
            <Heading size="md">Date added:</Heading>
            <Text size="md">
              {formatDateDD_MM_YYYY_MM_HH(project.createdAt)}
            </Text>
          </HStack>
          <HStack className="justify-between items-center  gap-2">
            <Heading size="md">Deadline:</Heading>
            <Text size="md">
              {formatDateDD_MM_YYYY_MM_HH(project.deadline)}
            </Text>
          </HStack>
          <HStack className="justify-between items-center gap-2">
            <Heading size="md">Participants:</Heading>
            <Text
              size="md"
              style={{
                textAlign: 'right',
                flex: 1,
              }}
              isTruncated
              numberOfLines={5}
            >
              {projectDevelopers && projectDevelopers.length
                ? projectDevelopers.map((user) => user.name).join(', ')
                : 'No Participants'}
            </Text>
          </HStack>
          <HStack className="justify-between items-center gap-2">
            <Heading size="md">PM:</Heading>
            <Text size="md">{projectPm ? projectPm.name : 'No PM'}</Text>
          </HStack>
        </Card>
      </VStack>
    </ScrollView>
  );
};
