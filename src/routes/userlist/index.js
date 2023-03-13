import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import {storeData} from '../../utilis';
import {MyContext} from '../../app';
import {Strings} from '../../utilis/strings';

const URL = 'https://reqres.in/api/users?page=';

const UserListScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}${page}`);
      const jsonData = await response.json();
      setPage(page + 1);
      setTotalPage(jsonData?.total_pages);
      setData([...data, ...jsonData.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsLoadMore(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderFooter = () => {
    if (isLoadMore) {
      return (
        <View style={{marginTop: 10}}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    } else {
      return null;
    }
  };

  const renderItem = ({item}) => {
    return (
      <View key={item?.id} style={styles?.renderItemStyle}>
        <Text style={{color: '#000'}}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={{color: '#000'}}>{item.email}</Text>
      </View>
    );
  };

  const loadMore = () => {
    if (page <= totalPage) {
      setIsLoadMore(true);
      fetchData();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{Strings.user_list}</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        {!isLoading ? <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        /> : <ActivityIndicator  size="large" color="#D9D9D9" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D9D9D9',
    padding: 10,
    width: '100%',
  },
  renderItemStyle: {padding: 5, borderBottomWidth: 1, borderBottomColor: '#D9D9D947'},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  logouttitle: {
    fontSize: 13,
    fontWeight: '200',
    color: '#000',
  },
});

export default UserListScreen;
