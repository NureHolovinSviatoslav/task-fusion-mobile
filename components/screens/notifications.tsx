import { useUserNotifications } from '@/apis/notifications';
import { FC } from 'react';
import { FlatList, View } from 'react-native';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { VStack } from '../ui/vstack';

export const Notifications: FC = () => {
  const { data: notifications, refetch, isRefetching } = useUserNotifications();

  return (
    <VStack className="p-4 pb-0 flex-1" space="xl">
      <Heading size="3xl">Notifications</Heading>
      <View className="flex-1">
        <FlatList
          data={notifications}
          keyExtractor={(notification) => String(notification.id)}
          refreshing={isRefetching}
          onRefresh={refetch}
          ListEmptyComponent={() => (
            <Text className="text-center font-medium">Empty</Text>
          )}
          renderItem={({ item: notification }) => (
            <View
              key={notification.id}
              className="bg-blue-300 w-full p-4 rounded-xl my-2"
            >
              <Text size="xl" className="text-black">
                {notification.title}
              </Text>
            </View>
          )}
        />
      </View>
    </VStack>
  );
};
