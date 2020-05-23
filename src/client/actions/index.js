import axios from 'axios';
import config from '../../../config';

export const FETCH_ARTICLES = 'fetch_articles';

export const fetchArticles = (source) => async (dispatch) => {
  let url;
  if (source) {
    url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=1834aac5340d48b78215c7b4bfd56549`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.apikey}`;
  }

  const res = await axios.get(url);

  dispatch({
    type: FETCH_ARTICLES,
    payload: res.data.articles,
  });
};
