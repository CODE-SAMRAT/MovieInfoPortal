import { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import {fetchDataFromAPI} from "./utils/api"
import Home from './pages/home/Home';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Details from './pages/details/Details';
import PageNotFound from './pages/404/PageNotFound';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';



function App() {
  const {url} = useSelector((state) => state).home
  console.log(url)
  const dispatch = useDispatch();

  useEffect(() =>{
    apiTesting();
  }, []);

  const apiTesting = () => {
    fetchDataFromAPI('/movie/popular')
      .then((res) => {
        // console.log(res);
        dispatch(getApiConfiguration(res))
      })
  }

  return (
    <BrowserRouter>
    {/* <Header /> */}
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/:mediaType/:id" element={<Details />}/>
      <Route path="/search/:query" element={<SearchResult />}/>
      <Route path="/explore/:mediaType" element={<Explore />}/>
      <Route path="*" element={<PageNotFound />}/>


    </Routes>
    {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
