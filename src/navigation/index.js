import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../routes/home/index';
import AboutUsScreen from '../routes/aboutus';
import UserListScreen from '../routes/userlist';

const Tab = createBottomTabNavigator();

const HomeNavigator = ({userDetails}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
        tabBarLabel: ({ tintColor, focused, children }) => {
          return focused
            ? (<Text style={[styles.labelStyle, {fontWeight: '700'}]} >{children}</Text>)
            : (<Text style={[styles.labelStyle, {fontWeight: '400'}]} >{children}</Text>)
        },
        tabBarItemStyle: styles.tab,
        tabBarIconStyle: { display: "none" },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} initialParams={{userDetails}}/>
      <Tab.Screen name="About_Us" component={AboutUsScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="User_List" component={UserListScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    borderRightWidth: 4,
    borderRightColor: 'black',
    borderTopRightRadius: 15,
  },
  labelStyle: { fontSize: 15, color: '#000'}
});

export default HomeNavigator