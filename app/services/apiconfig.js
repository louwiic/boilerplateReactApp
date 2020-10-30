import React from 'react';
import axios from "axios";


//movies API
const ApiKey = "1639ef21d9cef54e2c9656ade400d223";
const baseUrl = "https://api.themoviedb.org/3/movie/popular?api_key="+ApiKey+"&language=fr-US";
const baseUrlImage = "https://image.tmdb.org/t/p/w500/";


const getMovies = (params) => {
    return axios.get(baseUrl, { headers: params }) 
    
}

axios.all([getMovies()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
    console.warn(acct.config.url)  
    console.log("----------")

  }));


export default {
    baseUrl,
    baseUrlImage,
    getMovies
}
// axios.get('https://api.themoviedb.org/3/movie/popular?api_key=1639ef21d9cef54e2c9656ade400d223&language=fr-US&page='+page)