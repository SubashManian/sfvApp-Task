import React, {useEffect} from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView
} from 'react-native';

import { Strings } from '../../utilis/strings';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <View style={{flex:1}}>
          <Text style={styles.title}>{Strings.about_us}</Text>
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        <Text style={{color: '#000', padding: 10}}>{Strings.about_us_content}</Text>
      </ScrollView>
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
});

export default AboutUsScreen;
