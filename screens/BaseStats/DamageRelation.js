import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FirstUpperCase} from '../../helper/toFirstWordUpperCase';
import axios from 'axios';
import {POKEMON_THEME} from '../../const/TypePoke';

const DamageRelation = ({typeName, damage}) => {
  return (
    <View
      style={{
        backgroundColor: `${POKEMON_THEME[typeName]}`,
        width: 100,
        marginRight: 10,
        marginVertical: 5,
        height: 30,
        borderRadius: 5,
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          color: '#fff',
          textAlign: 'center',
          lineHeight: 30,
        }}>
        {FirstUpperCase(typeName) + damage}
      </Text>
    </View>
  );
};

export default DamageRelation;

const styles = StyleSheet.create({});
