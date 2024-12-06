import { TaskPriority as TaskPriorityEnum } from '@/types/enums';
import { FC } from 'react';
import { Text } from '../ui/text';

const getTaskPriorityColor = (taskPriority: TaskPriorityEnum) => {
  switch (taskPriority) {
    case TaskPriorityEnum.LOW:
      return '#67CB65';
    case TaskPriorityEnum.MEDIUM:
      return '#FF9533';
    case TaskPriorityEnum.HIGH:
      return '#E74444';
  }
};

interface TaskPriorityProps {
  priority: TaskPriorityEnum;
}

export const TaskPriority: FC<TaskPriorityProps> = ({ priority }) => {
  return (
    <Text
      className="rounded-full text-white py-0.5 px-2 gap-2"
      style={{
        backgroundColor: getTaskPriorityColor(priority),
      }}
    >
      {priority}
    </Text>
  );
};
