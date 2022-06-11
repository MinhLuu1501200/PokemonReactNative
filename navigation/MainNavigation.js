import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailPokeScreen from '../screens/DetailPokeScreen';
import SearchScreen from '../screens/Features/SearchScreen';

const Main = createNativeStackNavigator();
export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Main.Navigator initialRouteName="MainScreen" screenOptions={{}}>
        <Main.Screen
          name="MainScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Main.Screen
          name="DetailScreen"
          component={DetailPokeScreen}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTransparent: true,
            headerBackTitleVisible: true,
            headerShadowVisible: false,
            headerTintColor: 'white',
            headerTitle: '',
            headerStyle: {},
          }}
        />
        <Main.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitle: 'POKEMON',
            headerStyle: {},
          }}
        />
      </Main.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
