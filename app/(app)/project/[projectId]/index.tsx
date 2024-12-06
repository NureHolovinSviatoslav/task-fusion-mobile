import { Project } from '@/components/screens/project';
import { useLocalSearchParams } from 'expo-router';

export default function ProjectScreen() {
  const { projectId } = useLocalSearchParams();

  return (
    <Project projectId={Array.isArray(projectId) ? projectId[0] : projectId} />
  );
}
