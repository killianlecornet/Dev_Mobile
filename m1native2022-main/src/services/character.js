import md5 from 'md5';

import axios from 'axios';
const apiKey = 'c58464e4dc4cead627acd62463008144';
const privateKey = '5223a045025c2e8753b52a3c06055942d2f40ca2';
const ts = Date.now();
const baseURL = 'https://gateway.marvel.com/v1/public';
export default {
  getAllCharacters(offset) {
    return axios.get(`${baseURL}/characters`, {
      params: {
        ts: ts,
        apikey: apiKey,
        hash: md5(`${ts}${privateKey}${apiKey}`),
        offset: offset,
      },
    });
  },
  getOneCharacter(id) {
    return axios.get(`${baseURL}/characters/${id}`, {
      params: {
        ts: ts,
        apikey: apiKey,
        hash: md5(`${ts}${privateKey}${apiKey}`),
      },
    });
  },
};