import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getPokemonList} from '../../services/PokemonService';
import splitId from '../../helper/splitId';
import getUrlImgPoke from '../../helper/getUrlImgPoke';
import axios from 'axios';
import {POKEMON_THEME} from '../../const/TypePoke';
const windowWidth = Dimensions.get('window').width;
const SearchScreen = ({navigation}) => {
  const [pokemons, setPokemons] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const getPokemon = async () => {
    try {
      setLoading(true);
      let res = await getPokemonList();

      let listPokemons = await Promise.all(
        res.results.map(async poke => {
          let id = splitId(poke.url);
          let urlPng = getUrlImgPoke(id);
          const pokeDetail = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`,
          );
          poke.pokeDetail = pokeDetail.data;
          poke.imgPokeUrl = urlPng;
          poke.id = id;
          return poke;
        }),
      );
      setPokemons(p => [...p, ...listPokemons]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);
  const handleSearch = text => {
    setSearchText(text);
    let listPoke = [...pokemons];
    let newList = listPoke.filter(pokemon => {
      if (text === '') {
        return pokemon;
      } else if (pokemon.name.toLowerCase().includes(text.toLowerCase())) {
        return pokemon;
      }
    });
    setFilteredPokemons(newList);
    console.log(text);
  };
  const renderItem = item => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          position: 'relative',
          marginHorizontal: 8,
          marginTop: 8,
        }}
        onPress={() =>
          navigation.navigate('DetailScreen', {
            name: item.name,
            types: item.pokeDetail?.types,
            imgPokeUrl: item.imgPokeUrl,
            id: item.id,
            detailPokemon: item.pokeDetail,
          })
        }>
        <View
          key={item.id}
          style={[
            styles.card,
            {
              backgroundColor:
                POKEMON_THEME[item.pokeDetail?.types[0].type.name],
            },
          ]}>
          <Image
            source={require('../../assets/pokeball.png')}
            style={{
              width: 60,
              height: 60,
              position: 'absolute',
              bottom: 0,
              right: 0,
              opacity: 0.5,
            }}
          />
          <View
            style={{
              marginLeft: 6,
            }}>
            <Text
              style={{
                textAlign: 'center',
                marginBottom: 5,
                color: '#ffffffff',
                fontWeight: '700',
              }}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>

            {item.pokeDetail &&
              item.pokeDetail?.types.map((item, index) => {
                // console.log(item);
                return (
                  <Text
                    key={index}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      textAlign: 'center',
                      borderRadius: 10,
                      marginBottom: 5,
                      fontSize: 10,
                    }}>
                    {item.type.name.charAt(0).toUpperCase() +
                      item.type.name.slice(1)}
                  </Text>
                );
              })}
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            <Image
              style={styles.logo}
              source={{
                uri: item.imgPokeUrl,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <View
        style={{
          position: 'relative',
          marginVertical: 10,
          backgroundColor: 'white',
          width: windowWidth / 1.2,
        }}>
        <TextInput
          placeholder=" What Pokemon are you looking for?"
          style={styles.inputSearch}
          value={searchText}
          onChangeText={text => handleSearch(text)}
        />
        <View style={styles.search}>
          <Ionicons name={'search'} size={20} color={'#747476'} />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: windowWidth,
          justifyContent: 'center',
        }}>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <FlatList
            data={filteredPokemons.length === 0 ? pokemons : filteredPokemons}
            style={{flex: 1, backgroundColor: '#ffffff'}}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        )}
      </View>
    </View>
  );
};
export default SearchScreen;
const styles = StyleSheet.create({
  search: {
    position: 'absolute',
    top: 15,
    left: 8,
  },
  inputSearch: {
    backgroundColor: '#ccc',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: 10,
    borderWidth: 0.2,
    elevation: 2,
    marginBottom: 10,
    flex: 1,
    marginHorizontal: 7,
    marginTop: 6,
    height: 80,
    zIndex: 5000,
  },

  logo: {
    width: 80,
    height: 80,
  },
  iconSelected: {
    paddingHorizontal: 10,
  },
});
