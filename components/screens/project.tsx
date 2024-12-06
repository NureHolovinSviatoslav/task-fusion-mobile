import {
  useProjectDevelopers,
  useProjectPm,
  useUserProject,
} from '@/apis/projects';
import { Task, useTasksByStatus } from '@/apis/tasks';
import { TaskStatus } from '@/types/enums';
import { formatDateDD_MM_YYYY_MM_HH } from '@/utils';
import { Link } from 'expo-router';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native';
import { FC, useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { Card } from '../shared/card';
import { TaskPriority } from '../shared/task-priority';
import {
  Accordion,
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from '../ui/accordion';
import { Heading } from '../ui/heading';
import { HStack } from '../ui/hstack';
import { Pressable } from '../ui/pressable';
import { Text } from '../ui/text';
import { VStack } from '../ui/vstack';

interface TaskCardProps {
  task: Task;
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  return (
    <Link href={`/project/${task.projectId}/task/${task.id}`} asChild>
      <Pressable className="w-full">
        <VStack className="bg-background-300/80 rounded-lg p-3 gap-3">
          <HStack className="gap-2 justify-between items-center">
            <Heading size="md">{task.title}</Heading>
            <TaskPriority priority={task.taskPriority} />
          </HStack>
          <VStack>
            <HStack className="gap-2 justify-between items-center">
              <Text size="md">Participants:</Text>
              <Heading
                size="xs"
                isTruncated
                numberOfLines={5}
                style={{
                  textAlign: 'right',
                  flex: 1,
                }}
              >
                {task.users.length
                  ? task.users.map((user) => user.name).join(', ')
                  : 'No Participants'}
              </Heading>
            </HStack>
            <HStack className="justify-between items-center gap-2">
              <Text size="md">Date added:</Text>
              <Heading size="xs">
                {formatDateDD_MM_YYYY_MM_HH(task.createdAt)}
              </Heading>
            </HStack>
            <HStack className="justify-between items-center gap-2">
              <Text size="md">Deadline:</Text>
              <Heading size="xs">
                {formatDateDD_MM_YYYY_MM_HH(task.deadline)}
              </Heading>
            </HStack>
          </VStack>
        </VStack>
      </Pressable>
    </Link>
  );
};

interface CollapsableTasksProps {
  title: string;
  tasks?: Task[];
}

const CollapsableTasks: FC<CollapsableTasksProps> = ({ title, tasks }) => {
  return (
    <Card>
      <Accordion variant="unfilled">
        <AccordionItem value={title}>
          <AccordionHeader>
            <AccordionTrigger className="p-1">
              {({ isExpanded }) => {
                return (
                  <>
                    <AccordionTitleText className="text-lg">
                      {title}
                    </AccordionTitleText>
                    {isExpanded ? (
                      <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                    ) : (
                      <AccordionIcon as={ChevronDownIcon} className="ml-3" />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent className="p-1 gap-3">
            {tasks?.length ? (
              tasks?.map((task) => <TaskCard task={task} key={task.id} />)
            ) : (
              <AccordionContentText style={{ textAlign: 'center' }}>
                No tasks
              </AccordionContentText>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

interface ProjectProps {
  projectId: string | number;
}

export const Project: FC<ProjectProps> = ({ projectId }) => {
  const {
    data: project,
    refetch: refetchProject,
    isRefetching: isRefetchingProject,
  } = useUserProject(projectId);

  const {
    data: projectPm,
    refetch: refetchProjectPm,
    isRefetching: isRefetchingProjectPm,
  } = useProjectPm(projectId);

  const {
    data: projectDevelopers,
    refetch: refetchProjectDevelopers,
    isRefetching: isRefetchingProjectDevelopers,
  } = useProjectDevelopers(projectId);

  const {
    data: todoTasks,
    isRefetching: isRefetchingTodo,
    refetch: refetchTodoTasks,
  } = useTasksByStatus(projectId.toString(), TaskStatus.TO_DO);

  const {
    data: progressTasks,
    isRefetching: isRefetchingProgress,
    refetch: refetchProgressTasks,
  } = useTasksByStatus(projectId.toString(), TaskStatus.IN_PROGRESS);

  const {
    data: closedTasks,
    isRefetching: isRefetchingClosed,
    refetch: refetchClosedTasks,
  } = useTasksByStatus(projectId.toString(), TaskStatus.CLOSED);

  const {
    data: frozenTasks,
    isRefetching: isRefetchingFrozen,
    refetch: refetchFrozenTasks,
  } = useTasksByStatus(projectId.toString(), TaskStatus.FROZEN);

  const refresh = useCallback(() => {
    refetchProject();
    refetchProjectPm();
    refetchProjectDevelopers();
    refetchTodoTasks();
    refetchProgressTasks();
    refetchClosedTasks();
    refetchFrozenTasks();
  }, [
    refetchProject,
    refetchProjectPm,
    refetchProjectDevelopers,
    refetchTodoTasks,
    refetchProgressTasks,
    refetchClosedTasks,
    refetchFrozenTasks,
  ]);

  const isRefreshing =
    isRefetchingProject ||
    isRefetchingProjectPm ||
    isRefetchingProjectDevelopers ||
    isRefetchingTodo ||
    isRefetchingProgress ||
    isRefetchingClosed ||
    isRefetchingFrozen;

  if (!project) return;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      }
    >
      <VStack className="p-4 flex-grow gap-4">
        <Card>
          <HStack className="justify-between items-center gap-2">
            <Heading size="md">Date added:</Heading>
            <Text size="md">
              {formatDateDD_MM_YYYY_MM_HH(project.createdAt)}
            </Text>
          </HStack>
          <HStack className="justify-between items-center gap-2">
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
        <Card>
          <HStack className="justify-between items-center gap-2">
            <Heading size="md">To do:</Heading>
            <Text size="md">{todoTasks?.length || 0}</Text>
          </HStack>
          <HStack className="justify-between items-center gap-2">
            <Heading size="md">In progress:</Heading>
            <Text size="md">{progressTasks?.length || 0}</Text>
          </HStack>
          <HStack className="justify-between items-center gap-2">
            <Heading size="md">Closed:</Heading>
            <Text size="md">{closedTasks?.length || 0}</Text>
          </HStack>
          <HStack className="justify-between items-center gap-2">
            <Heading size="md">Frozen:</Heading>
            <Text size="md">{frozenTasks?.length || 0}</Text>
          </HStack>
        </Card>
        <CollapsableTasks title="To do" tasks={todoTasks} />
        <CollapsableTasks title="In progress" tasks={progressTasks} />
        <CollapsableTasks title="Closed" tasks={closedTasks} />
        <CollapsableTasks title="Frozen" tasks={frozenTasks} />
      </VStack>
    </ScrollView>
  );
};
