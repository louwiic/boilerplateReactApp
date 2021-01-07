import React from 'react';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import LoginView from '../screens/Auth/LoginView';
import {AuthContext} from '../components/context';
import {useSelector, useDispatch} from 'react-redux';

const baseUrl = 'https://api.geko.re';
const apiVersion = 'v1';
const baseUrlImage = '';
var url = '';

export const useApi = () => {
  //const {signOut} = React.useContext(AuthContext);

  const initConfig = async () => {
    let token = await AsyncStorage.getItem('userToken');
    var refreshToken = await AsyncStorage.getItem('refreshToken');

    //expired token
    /*token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZha2VAZW1haWwuZnIiLCJleHAiOjE2MDk4MzQxODAsImlkIjoiZmFrZV9pZCIsIm5hbWUiOiJGYWtlIFVzZXIiLCJyb2xlIjoidXNlciJ9.Ao0NqHDK1k6LdZ7475-Ait6dcg_hdzVJsrVca5ltl4w';*/

    if (token) {
      axios.defaults.headers.common['Authorization'] = token
        ? `Bearer ${token}`
        : '';
      console.log('TOKEN API SUCCESS ###');
      //console.log(token);
    } else {
      axios.defaults.headers.common['Authorization'] = null;
      /* 
    if setting null does not remove `Authorization` header then try     
    delete axios.defaults.headers.common['Authorization'];
         */
    }

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        const navigationRef = React.createRef();
        console.log('Token expired #####');
        if (isTokenExpired(refreshToken)) {
          try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('refreshToken');
            await AsyncStorage.removeItem('user');
          } catch (e) {
            console.log(e);
          }
          dispatch({type: 'LOGOUT'});
          return;
        }

        if (
          refreshToken &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          return axios
            .get(baseUrl + '/restricted/refresh_token', {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            })
            .then(async (res) => {
              if (res.data.success) {
                var accessToken = res.data.access_token;
                await AsyncStorage.setItem('userToken', accessToken);
                axios.defaults.headers.common['Authorization'] = accessToken
                  ? `Bearer ${accessToken}`
                  : '';
                originalRequest.headers[
                  'Authorization'
                ] = `Bearer ${accessToken}`;

                return axios(originalRequest);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
        return Promise.reject(error);
      },
    );
  };

  initConfig();

  //check token validity
  const isTokenExpired = (token) => {
    try {
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  };

  const getOffers = (params) => {
    let page = null;
    let type = '';
    let category_id = '';
    let partner_id = '';
    let limit = 10;
    if (params) {
      if (params.page) {
        page = params.page;
      }
      if (params.type) {
        type = params.type;
      }
      if (params.limit) {
        limit = params.limit;
      }

      if (params.partner_id) {
        partner_id = '&partner_id=' + params.partner_id;
      }

      if (params.category_id) {
        category_id = '&category_id=' + params.category_id;
      }
    }

    if (category_id == '&category_id=9f0584c2-bb77-430a-9fdf-81c994796c3d') {
      category_id = '';
    }

    url =
      baseUrl +
      '/restricted/' +
      apiVersion +
      '/offers?page=' +
      page +
      '&limit=' +
      limit +
      type +
      category_id +
      partner_id;

    console.log(url);

    return axios.get(url, {
      headers: params,
    });
  };

  const getPartners = (params) => {
    let page = null;
    let type = null;
    let category_id = '';
    if (params) {
      if (params.page) {
        page = params.page;
      }
      if (params.type) {
        type = params.type;
      }
      if (params.category_id) {
        category_id = '&category_id=' + params.category_id;
      }
    }
    url =
      baseUrl +
      '/restricted/' +
      apiVersion +
      '/partners?page=' +
      page +
      '&limit=10&';
    return axios.get(url, {
      headers: params,
    });
  };

  const getOffersHome = (params) => {
    return axios.get(
      baseUrl + '/restricted/' + apiVersion + '/home?page=1&limit=5',
      {
        headers: params,
      },
    );
  };

  const getPartner = (params) => {
    return axios.get(
      baseUrl + '/restricted/' + apiVersion + '/partner/' + params.partner_id,
    );
  };

  const getPartnerOffer = () => {
    let url = '';
    return axios.get(url);
  };

  const getFavoriteOffersExpired = (params) => {
    let page = null;
    if (params) {
      if (params.page) {
        page = params.page;
      }
    }
    url = baseUrl + '/restricted/' + apiVersion + '/my-offers?expired=true'; //?expired=true

    console.log(url);
    return axios.get(url, {
      headers: params,
    });
  };

  const getFavoriteOffers = (params) => {
    let page = null;
    if (params) {
      if (params.page) {
        page = params.page;
      }
    }
    url = baseUrl + '/restricted/' + apiVersion + '/my-offers'; //?expired=true

    console.log(url);
    return axios.get(url, {
      headers: params,
    });
  };

  const addFavorite = (params) => {
    url = baseUrl + '/restricted/' + apiVersion + '/toggle-bookmak';
    return axios.put(url, params);
  };

  const addFcmToken = (params) => {
    url = baseUrl + '/restricted/' + apiVersion + '/user';
    return axios.put(url, params);
  };

  const addCategory = (params) => {
    url = baseUrl + '/restricted/' + apiVersion + '/toggle-category';
    return axios.put(url, params);
  };

  const getInfoUser = (params) => {
    return axios.get(baseUrl + '/restricted/' + apiVersion + '/user');
  };

  const getPartnerById = (id) => {
    return axios.get(baseUrl + '/restricted/' + apiVersion + '/partner' + id);
  };

  const getVersionApp = (params) => {
    return axios.get(baseUrl + '/' + apiVersion + '/version');
  };

  const getCategories = (params) => {
    return axios.get(baseUrl + '/restricted/' + apiVersion + '/categories', {
      headers: params,
    });
  };

  const getSimilarOffers = (params) => {
    let category_id = '';
    if (params) {
      if (params.type) {
        type = params.type;
      }
      if (params.category_id) {
        category_id = params.category_id;
      }
    }
    url = baseUrl + '/restricted/' + apiVersion + '/offers?page=1';
    '&limit=5' + type + category_id;

    return axios.get(baseUrl + '/restricted/' + apiVersion + '/categories', {
      headers: params,
    });
  };

  const signIn = (params) => {
    return axios.post(baseUrl + '/' + apiVersion + '/login', params);
  };

  const signUp = (params) => {
    return axios.post(baseUrl + '/' + apiVersion + '/signup', params);
  };

  const checkSignUp = (params) => {
    return axios.post(baseUrl + '/' + apiVersion + '/check-signup', params);
  };

  const postEmailChangePwd = (params) => {
    return axios.post(baseUrl + '/' + apiVersion + '/lost', params);
  };

  const postNewPassword = (params) => {
    return axios.post(baseUrl + '/' + apiVersion + '/new-password', params);
  };

  /*axios
    .all([
      getOffers(),
      signIn(),
      checkSignUp(),
      getOffers(),
      getOffersHome(),
      getPartners(),
    ])
    .then(
      axios.spread(function (acct, perms) {
        // Both requests are now complete
        console.log('API LOG DEBUG ###');
        console.log(acct.config.url);
        console.log('----------');
      }),
    );*/

  return {
    API: {
      baseUrl,
      getPartnerOffer,
      getPartner,
      getCategories,
      addFavorite,
      getFavoriteOffers,
      getFavoriteOffersExpired,
      baseUrlImage,
      addCategory,
      getOffers,
      getPartners,
      getPartnerById,
      signIn,
      signUp,
      getInfoUser,
      checkSignUp,
      initConfig,
      getOffersHome,
      getSimilarOffers,
      postEmailChangePwd,
      postNewPassword,
      getVersionApp,
      addFcmToken,
    },
  };
};

// axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1639ef21d9cef54e2c9656ade400d223&language=fr-US&page='+page)
