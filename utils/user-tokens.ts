import * as SecureStore from 'expo-secure-store';

interface UserTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const getLocalUserTokensAsync = async (): Promise<UserTokens> => ({
  accessToken: await SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
  refreshToken: await SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
});

export const getLocalUserTokens = (): UserTokens => ({
  accessToken: SecureStore.getItem(ACCESS_TOKEN_KEY),
  refreshToken: SecureStore.getItem(REFRESH_TOKEN_KEY),
});

export const setLocalUserTokens = async ({
  accessToken,
  refreshToken,
}: Partial<UserTokens>) => {
  if (accessToken !== undefined) {
    if (accessToken !== null) {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    } else {
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    }
  }

  if (refreshToken !== undefined) {
    if (refreshToken !== null) {
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
    } else {
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    }
  }
};
