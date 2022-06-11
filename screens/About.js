import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {FirstUpperCase} from '../helper/toFirstWordUpperCase';
import replaceString from '../helper/replaceString';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getPokemonGenderStats from '../helper/getPokemonGenderStats';
const About = ({primaryColor, detailPokemon}) => {
  const [species, setSpecies] = React.useState({});

  const getSpecies = async () => {
    const speciesUrl = detailPokemon.species.url;
    const speciesResponse = await fetch(speciesUrl);
    const speciesJson = await speciesResponse.json();
    setSpecies(speciesJson);
  };
  useEffect(() => {
    getSpecies();
  }, []);
  const pokemonGendersRate = getPokemonGenderStats(species.gender_rate);
  return (
    <>
      <ScrollView style={{flex: 1}}>
        <Text style={{marginTop: 10}}>
          {Array.isArray(species.flavor_text_entries) &&
            species.flavor_text_entries
              .filter(flavor => {
                return flavor.version.name === 'ruby';
              })
              .map((item, index) => {
                return (
                  <Text key={index}>{replaceString(item.flavor_text)}</Text>
                );
              })}
        </Text>
        <View>
          <Text
            style={[
              styles.titleRow,
              styles.spacingVertical,
              {color: primaryColor},
            ]}>
            Pokedex Data
          </Text>
          <View>
            <View style={styles.row}>
              <Text style={styles.th}>Species: </Text>
              <Text style={styles.fontS}>
                {FirstUpperCase(detailPokemon?.species?.name) + ' Pokemon'}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.th}>Height: </Text>
              <Text style={styles.fontS}>
                {detailPokemon?.height / 10 + 'm'}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.th}>Weight: </Text>
              <Text style={styles.fontS}>
                {detailPokemon?.weight / 10 + 'kg'}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.th}>Abilities: </Text>
              <View>
                {detailPokemon?.abilities?.map((item, index) => {
                  return (
                    <View key={index}>
                      {!item.is_hidden && (
                        <Text style={styles.fontS}>
                          {index + 1 + '. ' + FirstUpperCase(item.ability.name)}
                        </Text>
                      )}
                      <View />
                    </View>
                  );
                })}
                {detailPokemon?.abilities?.map((item, index) => {
                  return (
                    <View key={index}>
                      {item.is_hidden && (
                        <Text>{FirstUpperCase(item.ability.name)}</Text>
                      )}
                      <View />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={[
              styles.titleRow,
              styles.spacingVertical,
              {color: primaryColor},
            ]}>
            Breeding
          </Text>
          <View>
            <View style={styles.row}>
              <Text style={styles.th}>Gender: </Text>
              <Text style={styles.fontS}>
                {pokemonGendersRate.map((gender, index) => (
                  <Text key={index}>
                    {gender.gender === 'genderless' ? (
                      <Text bold>Genderless</Text>
                    ) : (
                      <>
                        <Ionicons
                          name={gender.gender === 'male' ? 'male' : 'female'}
                          color={
                            gender.gender === 'male' ? '#6890F0' : '#EE99AC'
                          }
                          size={16}
                        />
                        {gender.rate}%
                      </>
                    )}
                  </Text>
                ))}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.th}>Egg Groups: </Text>
              <Text style={styles.fontS}>
                {Array.isArray(species.egg_groups) &&
                  species?.egg_groups.map((item, index) => {
                    return (
                      <Text key={index} style={{paddingRight: 8}}>
                        {FirstUpperCase(item.name) +
                          (index !== species.egg_groups.length - 1 ? ', ' : '')}
                      </Text>
                    );
                  })}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.th}>Base EXP: </Text>
              <Text style={styles.fontS}>{detailPokemon?.base_experience}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default About;

const styles = StyleSheet.create({
  titleRow: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  fontS: {
    fontSize: 18,
  },
  spacingVertical: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  th: {
    width: 100,

    fontWeight: 'bold',
    color: '#000',
  },
});
