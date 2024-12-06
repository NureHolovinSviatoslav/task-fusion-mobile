import {
  TaskAction,
  useTaskActions,
  useTaskById,
  useTaskComments,
} from '@/apis/tasks';
import { TaskCommentResponse } from '@/apis/tasks/types';
import { formatDateDD_MM_YYYY_MM_HH } from '@/utils';
import { useRouter } from 'expo-router';
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
import { Avatar, AvatarFallbackText, AvatarImage } from '../ui/avatar';
import { Heading } from '../ui/heading';
import { HStack } from '../ui/hstack';
import { Text } from '../ui/text';
import { VStack } from '../ui/vstack';

interface ActionCardProps {
  action: TaskAction;
}

const TaskActionsCard: FC<ActionCardProps> = ({ action }) => {
  return (
    <VStack className="gap-2 rounded-lg bg-background-300/50 p-3">
      <Heading size="md">{action.title}</Heading>
      <HStack className="justify-between items-center gap-2">
        <Text size="md">Date added:</Text>
        <Heading size="xs">
          {formatDateDD_MM_YYYY_MM_HH(action.createdAt)}
        </Heading>
      </HStack>
      <HStack className="justify-end items-center gap-2">
        <Avatar size="sm">
          <AvatarImage />
          <AvatarFallbackText>{action.user.name}</AvatarFallbackText>
        </Avatar>
        <Text size="md">{action.user.name}</Text>
      </HStack>
    </VStack>
  );
};

interface TaskCommentCardProps {
  taskComment: TaskCommentResponse;
}

const TaskCommentCard: FC<TaskCommentCardProps> = ({ taskComment }) => {
  return (
    <Card>
      <HStack className="justify-between items-center gap-2">
        <HStack className="justify-start items-center gap-2">
          <Avatar size="sm">
            <AvatarImage />
            <AvatarFallbackText>{taskComment.user.name}</AvatarFallbackText>
          </Avatar>
          <Text size="md">{taskComment.user.name}</Text>
        </HStack>
        <Text size="md">
          {formatDateDD_MM_YYYY_MM_HH(taskComment.createdAt)}
        </Text>
      </HStack>
      <Text className="color-black">{taskComment.text}</Text>
    </Card>
  );
};

interface TaskProps {
  taskId: string;
}

export const Task: FC<TaskProps> = ({ taskId }) => {
  const { dismiss } = useRouter();
  const {
    data: task,
    isLoading,
    error,
    isRefetching: isTaskRefetching,
    refetch: refetchTask,
  } = useTaskById(taskId);

  const {
    data: taskActions,
    isRefetching: isTaskActionsRefetching,
    refetch: refetchTaskActions,
  } = useTaskActions(taskId);

  const {
    data: taskComments,
    isRefetching: isTaskCommentsRefetching,
    refetch: refetchTaskComments,
  } = useTaskComments(taskId);

  const refresh = useCallback(() => {
    refetchTask();
    refetchTaskActions();
    refetchTaskComments();
  }, [refetchTask, refetchTaskActions, refetchTaskComments]);

  const isRefreshing =
    isTaskRefetching || isTaskActionsRefetching || isTaskCommentsRefetching;

  if (error || (!task && !isLoading)) dismiss();

  if (!task) return;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      }
    >
      <VStack className="p-4 flex-grow gap-4">
        <Card>
          <Heading size="lg">{task.title}</Heading>
          <Text size="md">{task.description}</Text>
        </Card>

        <Card>
          <HStack className="justify-between items-center gap-2">
            <Heading size="md">Priority:</Heading>
            <TaskPriority priority={task.taskPriority} />
          </HStack>
          <HStack className="justify-between items-center gap-2">
            <Heading size="md">Status:</Heading>
            <Text size="md">{task.taskStatus}</Text>
          </HStack>
          <HStack className="justify-between items-center gap-2">
            <Heading size="md">Date added:</Heading>
            <Text size="md">{formatDateDD_MM_YYYY_MM_HH(task.createdAt)}</Text>
          </HStack>
          <HStack className="justify-between items-center gap-2">
            <Heading size="md">Deadline:</Heading>
            <Text size="md">{formatDateDD_MM_YYYY_MM_HH(task.deadline)}</Text>
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
              {task.users.length
                ? task.users.map((user) => user.name).join(', ')
                : 'No Participants'}
            </Text>
          </HStack>
        </Card>

        <Card>
          <Accordion variant="unfilled">
            <AccordionItem value="actions">
              <AccordionHeader>
                <AccordionTrigger className="p-1">
                  {({ isExpanded }) => {
                    return (
                      <>
                        <AccordionTitleText className="text-lg">
                          Actions
                        </AccordionTitleText>
                        {isExpanded ? (
                          <AccordionIcon as={ChevronUpIcon} className="ml-3" />
                        ) : (
                          <AccordionIcon
                            as={ChevronDownIcon}
                            className="ml-3"
                          />
                        )}
                      </>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent className="p-1 gap-3">
                {taskActions?.length ? (
                  taskActions?.map((taskActions) => (
                    <TaskActionsCard
                      action={taskActions}
                      key={taskActions.id}
                    />
                  ))
                ) : (
                  <AccordionContentText style={{ textAlign: 'center' }}>
                    No actions
                  </AccordionContentText>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {taskComments?.length ? (
          taskComments.map((taskComment) => (
            <TaskCommentCard key={taskComment.id} taskComment={taskComment} />
          ))
        ) : (
          <Card>
            <Text className="text-center">No comments for this task.</Text>
          </Card>
        )}
      </VStack>
    </ScrollView>
  );
};
