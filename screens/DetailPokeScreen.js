import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
const windowHeight = Dimensions.get('window').width;

import {SvgUri, SvgCssUri} from 'react-native-svg';
import {POKEMON_THEME} from '../const/TypePoke';
import About from './About';
import BaseStats from './BaseStats/BaseStats';
import Evolution from './Evolution';
const DetailPokeScreen = ({route, navigation}) => {
  const {name, imgPokeUrl, id, types, detailPokemon} = route.params;
  const primaryColor = POKEMON_THEME[types[0].type.name];
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'about', title: 'About'},
    {key: 'baseStats', title: 'Base Stats'},
    {key: 'evolution', title: 'Evolution'},
  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      inactiveColor={'#cccccc'}
      activeColor={'#000000'}
      indicatorStyle={{backgroundColor: '#7D1E6A'}}
      style={{backgroundColor: 'white'}}
      renderLabel={({route, focused, color}) => (
        <Text style={{color, margin: 8, fontWeight: '700', fontSize: 12}}>
          {route.title}
        </Text>
      )}
    />
  );

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'about':
        return (
          <About primaryColor={primaryColor} detailPokemon={detailPokemon} />
        );
      case 'baseStats':
        return (
          <BaseStats
            primaryColor={primaryColor}
            detailPokemon={detailPokemon}
          />
        );
      case 'evolution':
        return (
          <Evolution
            primaryColor={primaryColor}
            detailPokemon={detailPokemon}
          />
        );
      default:
        return null;
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: primaryColor,
        position: 'relative',
      }}>
      <View
        style={{
          top: windowHeight / 7,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2000,
          position: 'absolute',
          alignItems: 'flex-end',

          height: 150,
        }}>
        <Image
          source={require('../assets/pokeball.png')}
          style={{
            width: 160,
            height: 160,
            opacity: 0.3,
          }}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          top: windowHeight / 6,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 4000,
          height: 150,
          alignItems: 'center',
        }}>
        <Image
          style={styles.logo}
          source={{
            uri: imgPokeUrl,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <View
          style={{
            alignSelf: 'flex-start',
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontWeight: '700',
              fontSize: 30,
            }}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {types.map((item, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    textAlign: 'center',
                    borderRadius: 10,
                    marginBottom: 5,
                    fontSize: 10,
                    width: 50,
                  }}>
                  {item.type.name.charAt(0).toUpperCase() +
                    item.type.name.slice(1)}
                </Text>
              );
            })}
          </View>
        </View>
        <View
          style={{
            alignSelf: 'flex-end',
            marginBottom: 130,
            marginLeft: 20,
          }}>
          <Text style={{color: '#ffffff', fontWeight: '700', fontSize: 15}}>
            {`#0${id}`}
          </Text>
        </View>
      </View>

      <View
        style={{
          height: windowHeight / 1.5,
          backgroundColor: '#ffffff',
          paddingTop: 40,
          paddingHorizontal: 15,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          zIndex: 3000,
        }}>
        <TabView
          navigationState={{index, routes}}
          renderTabBar={renderTabBar}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>
    </View>
  );
};

export default DetailPokeScreen;

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleRow: {
    fontSize: 20,
  },
});
