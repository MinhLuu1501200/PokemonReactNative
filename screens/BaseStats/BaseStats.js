import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {FirstUpperCase} from '../../helper/toFirstWordUpperCase';
import axios from 'axios';
import {POKEMON_THEME} from '../../const/TypePoke';
import DamageRelation from './DamageRelation';

const BaseStats = ({primaryColor, detailPokemon}) => {
  const [damageRelations, setDamageRelations] = React.useState({});
  const getEffectiveness = async () => {
    const effectiveness = await axios.get(
      `https://pokeapi.co/api/v2/type/${detailPokemon.types[0].type.name}`,
    );
    setDamageRelations(effectiveness.data.damage_relations);
  };
  useEffect(() => {
    getEffectiveness();
  }, []);
  return (
    <>
      <ScrollView style={{flex: 1}}>
        <View style={{marginVertical: 10}}>
          {detailPokemon?.stats.map((stats, index) => {
            return (
              <View
                key={index}
                style={{flexDirection: 'row', marginVertical: 5}}>
                <Text style={{width: 120, fontWeight: 'bold', color: '#000'}}>
                  {FirstUpperCase(stats.stat.name) + ' :'}
                </Text>
                <View
                  style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{width: 30}}>{stats.base_stat}</Text>
                  <View style={{flex: 1, backgroundColor: '#ccc', height: 3}}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor:
                          stats.base_stat < 50 ? '#FF5D5D' : '#5FD068',
                        height: 3,
                        width: `${stats.base_stat}%`,
                      }}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <View>
          <Text style={[styles.titleRow, {color: primaryColor}]}>
            Type defenses
          </Text>
          <Text color="grey" style={{marginTop: 8}}>
            The effectiveness of each type on {detailPokemon.name}.
          </Text>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                flexWrap: 'wrap',
              }}>
              {Array.isArray(damageRelations?.double_damage_from) &&
                damageRelations?.double_damage_from.map((item, index) => {
                  return (
                    <DamageRelation
                      key={index}
                      typeName={item.name}
                      damage={' 2x'}
                    />
                  );
                })}
              {Array.isArray(damageRelations?.half_damage_from) &&
                damageRelations?.half_damage_from.map((item, index) => {
                  return (
                    <DamageRelation
                      key={index}
                      typeName={item.name}
                      damage={' 0.5x'}
                    />
                  );
                })}
              {Array.isArray(damageRelations?.no_damage_from) &&
                damageRelations?.no_damage_from.map((item, index) => {
                  return (
                    <DamageRelation
                      key={index}
                      typeName={item.name}
                      damage={' 1x'}
                    />
                  );
                })}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default BaseStats;

const styles = StyleSheet.create({
  statsLine: {
    flex: 1,
    backgroundColor: 'red',
  },
  titleRow: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
