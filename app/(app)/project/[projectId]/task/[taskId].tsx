import { Task } from '@/components/screens/task';
import { useLocalSearchParams } from 'expo-router';

export default function TaskScreen() {
  const { taskId } = useLocalSearchParams();

  return <Task taskId={Array.isArray(taskId) ? taskId[0] : taskId} />;
}
