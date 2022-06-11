import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import MainNavigation from './navigation/MainNavigation';
import SearchScreen from './screens/Features/SearchScreen';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MainNavigation />
      {/* <SearchScreen /> */}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
