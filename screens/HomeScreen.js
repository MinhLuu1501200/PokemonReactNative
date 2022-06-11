import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SvgUri, SvgCssUri} from 'react-native-svg';
import axios from 'axios';
import Filter from '../assets/filter.svg';
import Sort from '../assets/sort.svg';
import {POKEMON_THEME} from '../const/TypePoke';
import '../assets/pokeball.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getUrlImgPoke from '../helper/getUrlImgPoke';
import splitId from '../helper/splitId';
const HomeScreen = ({navigation}) => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState('');
  const [searchText, setSearchText] = useState('');
  const getPokemon = async () => {
    setLoading(true);
    let res = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
    );
    setNextUrl(res.data.next);
    let listPokemons = await Promise.all(
      res.data.results.map(async poke => {
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
  };

  useEffect(() => {
    getPokemon();
    // getAllPokemons();
  }, []);

  const getNextPage = async () => {
    setLoading(true);
    let res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    let listPokemons = await Promise.all(
      res.data.results.map(async poke => {
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
            source={require('../assets/pokeball.png')}
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
  const handleSearchPokemon = text => {
    console.log(text);
    setSearchText(text);
  };

  return (
    <>
      <View style={styles.container}>
        {/* {
   loading ? (
              <View>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            ) : null
} */}
        <FlatList
          data={pokemons}
          style={{flex: 1, backgroundColor: '#ffffff'}}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          ListHeaderComponent={
            <>
              <View style={{marginHorizontal: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 35,
                      fontWeight: '700',
                      color: '#000000',
                      marginVertical: 10,
                    }}>
                    Pokedex
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.iconSelected}>
                      <Filter />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconSelected}>
                      <Sort />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={{marginBottom: 10}}>
                  Search for Pokémon by name or using the National Pokédex
                  number.
                </Text>
                <View style={{position: 'relative'}}>
                  <TextInput
                    placeholder=" What Pokemon are you looking for?"
                    value={searchText}
                    onFocus={() => navigation.navigate('SearchScreen')}
                    style={styles.inputSearch}
                    onChangeText={handleSearchPokemon}
                  />
                  <View style={styles.search}>
                    <Ionicons name={'search'} size={20} color={'#747476'} />
                  </View>
                </View>
              </View>
            </>
          }
          ListFooterComponent={() =>
            loading ? (
              <View>
                <ActivityIndicator size="large" color="#00ff00" />
              </View>
            ) : null
          }
          onEndReached={() => {
            getNextPage();
          }}
        />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  filterButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 8000,
    width: 60,
    borderWidth: 1,
    borderRadius: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#655D8A',

    elevation: 6,
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
  inputSearch: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  logo: {
    width: 80,
    height: 80,
  },
  search: {
    position: 'absolute',
    top: 15,
    left: 8,
  },
  iconSelected: {
    paddingHorizontal: 10,
  },
});
