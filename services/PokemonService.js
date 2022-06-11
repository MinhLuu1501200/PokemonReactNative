import axios from '../services/AxiosConfig';

const getPokemonList = () => {
  return axios.get('pokemon?limit=100000&offset=0');
};

export {getPokemonList};
