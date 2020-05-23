import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types'; // ES6
import { fetchArticles } from '../actions';
import ArticleDetailModal from '../components/ArticleDetailModal';
import axios from 'axios';

const HomePage = (props) => {
  const [modal, setModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({});
  const [dataArticle, setDataArticle] = useState([]);

  const readArticle = (article) => {
    setCurrentArticle(article);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>SSR Daily News - ilker ALTIN</title>
        <meta property="og:title" content="SSR Daily News - ilker ALTIN" />
        <meta
          name="description"
          content="Breaking news,latest articles, popular articles from most popular news websites of the world"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://react-ssr-ilker.herokuapp.com" />
      </Helmet>
    );
  };

  const updateArticle = async () => {
    // if (dataArticle) {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    setDataArticle(res.data);
    // }
  };
  const { fetchArticles: loadArticles } = props;

  useEffect(async () => {
    window.scrollTo(0, 0);
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    setDataArticle(res.data);
    // props.fetchArticles();
  }, []);
  return (
    <div>
      {head()}
      {modal ? <ArticleDetailModal handler={closeModal} data={currentArticle} /> : null}
      <div className="row">
        <div className="section">
          <h3>Popular Articles</h3>
        </div>
        <div className="divider" />
        <div className="section">
          <div className="row">
            {dataArticle.map((article) => (
              <div className="col s12 m6 l6 xl4" key={article.title}>
                <div className="card large">
                  <div className="card-image">
                    {/* <img alt={article.title} src={article.url}></img> */}
                    {/* <LazyLoadImage alt={article.title} src={article.urlToImage} /> */}
                  </div>
                  <div className="card-content">
                    <span className="card-title">{article.title}</span>
                  </div>
                  <div className="card-action">
                    {/* <a onClick={() => readArticle(article)}>Read More</a> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
  };
};

const loadData = async (store) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  let res = axios.get(`https://jsonplaceholder.typicode.com/posts`); // Manually dispatch a network request
  return setDataArticle(res.data);
  // return updateArticle();
};

export default {
  component: connect(mapStateToProps, { fetchArticles })(HomePage),
  loadData,
};
