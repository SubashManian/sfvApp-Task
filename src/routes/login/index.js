import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { storeData } from '../../utilis';
import { Strings } from '../../utilis/strings';

const LoginScreen = ({loginView, onLogin}) => {
  const [loader, setLoader] = useState(false);
  const [appleloader, setappleLoader] = useState(false);

  const googleSignIn = async () => {
    setLoader(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userinfo = await GoogleSignin.signIn();
      const currentUser = GoogleSignin.getTokens().then(async (res)=>{
        const userdetails = {
          name: userinfo?.user?.name,
          email: userinfo?.user?.email,
          idToken: res?.idToken,
          accessToken: res?.accessToken
        };
        await storeData('login', 'true');
        await storeData('userdetils', JSON.stringify(userdetails));
        const credential = auth.GoogleAuthProvider.credential(res?.idToken, res?.accessToken)
        await auth().signInWithCredential(credential);
        setLoader(false);
        onLogin(userdetails);
      })
    } catch (error) {
      console.log(error);
      setLoader(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        ToastAndroid.show('Cancelled the signin', ToastAndroid.SHORT);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        ToastAndroid.show('Signin in progress', ToastAndroid.SHORT);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        ToastAndroid.show('Play Services not available', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Try after some time', ToastAndroid.SHORT);
      }
    }
  }
 
  const handleLogin = () => {
    // setLoader(true);
    // auth()
    // .signInWithEmailAndPassword(username, password)
    // .then(async (data) => {
    //   await storeData('login', 'true');
    //   await storeData('uid', data.user?.uid);
    //   await storeData('email', data.user?.email);
    //   const userdetail = {'uid': data.user?.uid, 'email': data.user?.email}
    //   setLoader(false);
    //   onLogin(userdetail);
    // })
    // .catch(error => {
    //   setLoader(false);
    //   if (error.code === 'auth/email-already-in-use') {
    //     ToastAndroid.show('Email already logged in..', ToastAndroid.SHORT);
    //   }

    //   if (error.code === 'auth/invalid-email') {
    //     setIsValidEmail(false);
    //     setIsValidPassword(false);
    //     ToastAndroid.show('Invalid email or password', ToastAndroid.SHORT);
    //   }

    //   if (error.code === 'auth/user-not-found') {
    //     setIsValidEmail(false);
    //     setIsValidPassword(false);
    //     ToastAndroid.show('User not found', ToastAndroid.SHORT);
    //   }
      
    //   if (error.code === 'auth/wrong-password') {
    //     setIsValidPassword(false);
    //     storeData('login', 'false');
        ToastAndroid.show('Not available for Android Users', ToastAndroid.SHORT);
    //   }

    //   console.log(error);
    // });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Strings.MyApp}</Text>
      {loginView === null 
        ? <ActivityIndicator size={'large'} color={'black'}/>
        : <View style={{width: '100%', alignItems: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={appleloader}>
            {appleloader ? <ActivityIndicator color={'black'}/> : <Text style={styles.buttonText}>{Strings.appleLogin}</Text>}
          </TouchableOpacity>
          <View style={{padding: 20}}/>
          <TouchableOpacity style={styles.button} onPress={googleSignIn} disabled={loader}>
            {loader ? <ActivityIndicator color={'black'}/> : <Text style={styles.buttonText}>{Strings.googleLogin}</Text>}
          </TouchableOpacity>
        </View>
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 34,
    fontWeight: '300',
    marginBottom: 100,
    color: '#000'
  },
  button: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 5,
    width: '70%',
    height: 36,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '400',
  },
});

export default LoginScreen;
