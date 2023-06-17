import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';

import Main from './src/Main';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const Root = () => (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{persister: asyncStoragePersister}}>
    <Main />
  </PersistQueryClientProvider>
);

export default Root;
