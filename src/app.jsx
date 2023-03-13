import React,{useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "@react-native-firebase/app";
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

import AppNavigator from './navigation/index';
import LoginScreen from './routes/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [initialRoute, setinitialRoute] = useState('');

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCTHMrdh251N6u6gFfPZPA6yB9mAulnLPI",
      authDomain: "sfvapp-942b2.firebaseapp.com",
      projectId: "sfvapp-942b2",
      storageBucket: "sfvapp-942b2.appspot.com",
      messagingSenderId: "327513924832",
      appId: "1:327513924832:web:13bcffb8d93f15fcec9c85",
      databaseURL: "",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
     
  }, [])

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId: '327513924832-vqdlqgr2p3l7794vuno6thkccktggk0o.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await AsyncStorage.getItem('login');
        if (token === 'true') {
          const userinfo = await AsyncStorage.getItem('userdetils');
          setUserDetails(JSON.parse(userinfo));
          setinitialRoute('');
          if (userinfo) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    }
    fetchData();
  }, []);

  const logoutPress = () => {
    setIsLoggedIn(false);
    setUserDetails({});
  }
  const linking = {
    prefixes: ['sfvapp://', 'https://sfvapp.com'],
    config: {
      initialRouteName: 'Home',
      screens: {
        Home: {
          path: 'Home'
        },
        About_Us: {
          path: 'About_Us'
        },
        User_List: {
          path: 'User_List'
        }
      }
    }
  };
  
  return (
      isLoggedIn ?
        (<NavigationContainer linking={linking} fallback={<ActivityIndicator color="blue" size="large" />}>
            <AppNavigator userDetails={userDetails} initialRouteName={initialRoute}/>
          </NavigationContainer>)
        : 
        (<LoginScreen loginView={isLoggedIn} onLogin={(val) => {
          setUserDetails(val);
          setIsLoggedIn(true);
        }}/>)
  );
}

export default App;