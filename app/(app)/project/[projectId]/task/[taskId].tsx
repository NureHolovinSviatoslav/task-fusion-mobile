import { Text } from '@/components/ui/text';
import { useLocalSearchParams } from 'expo-router';

export default function TaskScreen() {
  const { taskId, projectId } = useLocalSearchParams();

  return (
    <>
      <Text>
        {taskId}
        {projectId}
      </Text>
    </>
  );
}
