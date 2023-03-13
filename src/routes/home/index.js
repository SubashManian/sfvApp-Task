import React, {useState, useEffect, useContext} from 'react';
import { useRoute } from '@react-navigation/native';
import { 
  View, 
  Text, 
  StyleSheet, 
} from 'react-native';

import { storeData } from '../../utilis';
import { MyContext } from '../../app';
import { Strings } from '../../utilis/strings';

const HomeScreen = ({ navigation }) => {
  // const { isLoggedIn, logoutPress } = useContext(MyContext);
  const route = useRoute();

  const { userDetails } = route.params;
  
  // const onLogout = async () => {
  //   await storeData('login', 'false');
  // await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //   logoutPress();
  // }

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <View style={{flex:1}}>
          <Text style={styles.title}>{Strings.home}</Text>
        </View>
        {/* <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logouttitle}>Logout</Text>
        </TouchableOpacity> */}
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.detailStyle}>{`Name: ${userDetails?.name}`}</Text>
        <Text style={styles.detailStyle}>{`Email: ${userDetails?.email}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D9D9D9',
    padding: 10,
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  detailStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
    textAlign: 'left'
  },
  logouttitle: {
    fontSize: 13,
    fontWeight: '200',
    color: '#000',
  },
});

export default HomeScreen;
