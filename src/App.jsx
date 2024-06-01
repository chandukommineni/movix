import React, { useEffect } from "react";
import {fetchDataFromApi} from "./utils/api"
import {getApiConfiguration,getGeneres} from "./store/homeSlice"
import { useDispatch,useSelector } from "react-redux";
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/home"
import Details from "./pages/details/Details"
import SearchResult from "./pages/searchResult/SearchResult"
import Explore from "./pages/explore/Explore"
import PageNotFound from "./pages/404/PageNotFound"
import { BrowserRouter,Routes,Route } from "react-router-dom";


const App = () => {
  const dispatch=useDispatch()
  const url=useSelector(state=>state.home.url)
  useEffect(()=>{
    fecthApiConfig()
    genresCall()
  },[])
  const fecthApiConfig=()=>{
    fetchDataFromApi("/configuration")
    .then((response)=>{
      const url={
        backdrop:response.images.secure_base_url + "original",
        poster:response.images.secure_base_url + "original",
        profile:response.images.secure_base_url + "original"
      }
      dispatch(getApiConfiguration(url))
    })
    
  }
  const genresCall=async()=>{
        let promises=[]
        let ednPoints=["tv","movie"]
        let allGenres={}
        ednPoints.forEach((url)=>{
          promises.push(fetchDataFromApi(`/genre/${url}/list`))
        })
        const data=await Promise.all(promises)
        data.map(({genres})=>{
          return genres.map((item)=>{
            allGenres[item.id]=item
          })
        })
        dispatch(getGeneres(allGenres))
  }

  return (
    <BrowserRouter>
        <Header/>
           <Routes>

            <Route path="/" element={<Home/>}/>
            <Route path="/:mediaType/:id" element={<Details />} />
            <Route path="/search/:query" element={<SearchResult />} />
            <Route path="/explore/:mediaType" element={<Explore />} />
            <Route path="*" element={<PageNotFound />} />
        
           </Routes>
        <Footer/>
    </BrowserRouter>
  )
};

export default App;
