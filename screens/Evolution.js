import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import IconArrow from 'react-native-vector-icons/Fontisto';
import splitId from '../helper/splitId';
import getUrlImgPoke from '../helper/getUrlImgPoke';
const image = require('../assets/pokeball.png');
const Evolution = ({primaryColor, detailPokemon}) => {
  const [evolution, setEvolution] = useState({});
  const [idArr, setIdArr] = useState([]);
  const getEvolutionTo = object => {
    if (object?.hasOwnProperty('evolves_to')) {
      setIdArr(idArr => [
        ...idArr,
        {
          urlImg: getUrlImgPoke(splitId(object?.species?.url)),
          minLevel: object?.evolution_details[0]?.hasOwnProperty('min_level')
            ? object?.evolution_details[0]?.min_level
            : '0',
        },
      ]);
      return getEvolutionTo(object.evolves_to[0]);
    }
    return 0;
  };
  const getEvolutionChain = async () => {
    try {
      const species = await axios.get(detailPokemon?.species?.url);
      const specieData = species.data;
      const evolutionChain = await axios.get(specieData?.evolution_chain?.url);
      const evolutionChainData = evolutionChain.data;
      setEvolution(evolutionChainData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getEvolutionChain();
  }, []);
  useEffect(() => {
    getEvolutionTo(evolution?.chain);
  }, [evolution]);
  return (
    <>
      <ScrollView>
        <View style={styles.wrapper}>
          {idArr.map((item, index, element) => {
            return (
              <View key={index}>
                <ImageBackground
                  source={image}
                  resizeMode="cover"
                  style={styles.imageBg}>
                  <Image
                    style={styles.logo}
                    source={{
                      uri: item.urlImg,
                    }}
                  />
                </ImageBackground>

                {index !== element.length - 1 && (
                  <View style={styles.poke}>
                    <IconArrow
                      name={'arrow-down-l'}
                      size={20}
                      color={primaryColor}
                    />
                    <Text style={{color: '#000'}}>
                      Lvldasdad {element[index + 1]?.minLevel}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default Evolution;

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  poke: {
    alignItems: 'center',
  },
  imageBg: {
    marginBottom: 10,
  },
});
