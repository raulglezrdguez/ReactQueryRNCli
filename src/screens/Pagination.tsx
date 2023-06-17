import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';

import {getData} from '../api/api';
import {Data} from '../types';
import Card from '../components/Card';

const Main = () => {
  const [page, setPage] = useState(0);

  const {isLoading, isError, data, error, isFetching} = useQuery({
    queryKey: ['data', page],
    queryFn: getData(page),
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {isFetching && <Text>isFetching</Text>}
      <Text>Current Page: {page + 1}</Text>
      <Button
        onPress={() => setPage(old => Math.max(old - 1, 0))}
        disabled={page === 0}
        title="Previous page"
      />
      <Button
        onPress={() => setPage(old => old + 1)}
        disabled={!data?.hasMore}
        title="Next page"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {data?.posts?.map((item: Data) => (
          <Card key={item.id} data={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#EFEEEE',
    padding: 10,
  },
  contentContainer: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingBottom: 40,
  },
});
