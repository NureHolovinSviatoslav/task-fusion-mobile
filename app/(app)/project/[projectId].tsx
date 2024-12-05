import { Text } from '@/components/ui/text';
import { useLocalSearchParams } from 'expo-router';

export default function ProjectScreen() {
  const { projectId } = useLocalSearchParams();

  return <Text>{projectId}</Text>;
}
