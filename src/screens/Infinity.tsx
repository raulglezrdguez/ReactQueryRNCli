import React from 'react';
import {
  Button,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getData} from '../api/api';
import {Data} from '../types';
import Card from '../components/Card';

const InfinityScreen = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['infiniteData'],
    queryFn: getData,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextPage;
    },
  });

  if (status === 'loading') {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (status === 'error' && error instanceof Error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const datas: Data[] = [];
  data?.pages.forEach(page => {
    page.posts.forEach((post: Data) => datas.push(post));
  });

  return (
    <SafeAreaView style={styles.container}>
      {isFetching && <Text>isFetching</Text>}
      <Button
        onPress={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        title={
          isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'
        }
      />
      <FlatList
        data={datas}
        renderItem={({item}: {item: Data}) => (
          <Card key={item.id} data={item} />
        )}
        keyExtractor={item => item.id.toString()}
        style={styles.scrollView}
        onEndReached={_ => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default InfinityScreen;

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

/*
<ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.posts?.map((post: Data) => (
              <Card key={post.id} data={post} />
            ))}
          </Fragment>
        ))}
      </ScrollView>
*/
