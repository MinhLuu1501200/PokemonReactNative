import axios from 'axios';
import {Alert} from 'react-native';
const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if ((error.code = 'ERR_NETWORK')) {
      Alert.alert('Network Error', 'Please check your internet connection');
    }

    return Promise.reject(error);
  },
);

export default instance;
