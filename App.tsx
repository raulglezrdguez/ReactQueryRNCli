import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Pagination from './src/screens/Pagination';
import TabBar from './src/components/TabBar';
import Infinity from './src/screens/Infinity';

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

const Tab = createBottomTabNavigator();

const Root = () => (
  <NavigationContainer>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: asyncStoragePersister}}>
      <Tab.Navigator>
        <Tab.Screen
          name="Pagination"
          component={Pagination}
          options={{title: 'Pagination'}}
        />
        <Tab.Screen
          name="Infinite"
          component={Infinity}
          options={{title: 'Infinite scrolling'}}
        />
      </Tab.Navigator>
    </PersistQueryClientProvider>
  </NavigationContainer>
);

export default Root;
