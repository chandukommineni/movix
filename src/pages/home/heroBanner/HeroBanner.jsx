import React, { useEffect, useState } from "react";
import "./style.scss"
import { useNavigate } from "react-router-dom"; 
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyloadingImage/Img"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background,setBackground]=useState("")
  const [query,setQuery]=useState("")
  const navigate=useNavigate()
  const {data,loading}=useFetch("/movie/upcoming")
  const url=useSelector((state)=>state.home.url)
  useEffect(()=>{
     const bg=url.backdrop +data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path
     setBackground(bg)
  },[data])

  const searchQueryHandler=(e)=>{
    if (e.key==="Enter" && query.length>0){
        navigate(`search/${query}`)
    }
  }

  return (
    <div className="heroBanner">
      {!loading &&
      <div className="backdrop-img">
          <Img src={background}></Img>
      </div>
      }
      <div className="opacity-layer">
        
      </div>
      <ContentWrapper>
            <div className="wrapper">
              <div className="heroBannerContent">
                <span className="title">Welcome</span>
                <span className="subtitle">Millions of movies,TV shows and people to discover Explore now.</span>
                <div className="searchInput">
                  <input
                    type="text" 
                    placeholder="Search from a Movie or TV show..."
                    onKeyUp={searchQueryHandler}
                    onChange={(e)=>setQuery(e.target.value)}
                    />
                    <button onClick={()=>navigate(`search/${query}`)}>Search</button>
                </div>
              </div>
            </div>
      </ContentWrapper>
    </div>

     
      
  )
};

export default HeroBanner;
