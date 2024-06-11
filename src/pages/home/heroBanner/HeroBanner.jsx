import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyloadingImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");
  const url = useSelector((state) => state.home.url);

  useEffect(() => {
    if (data?.results?.length) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const backdropPath = data.results[randomIndex]?.backdrop_path || '';
      let bg = backdropPath ? url.backdrop + backdropPath : "";

      // If the backdrop image path includes "undefined" or is an empty string, use fallback image
      if (!bg || bg.includes("undefined")) {
        bg = "../../../assets/herobackground.jpg";
      }

      setBackground(bg);
    } else {
      // Set to fallback image if data is not available
      setBackground("../../../assets/herobackground.jpg");
    }
  }, [data, url]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background}></Img>
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subtitle">Millions of movies, TV shows, and people to discover. Explore now.</span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a Movie or TV show..."
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={() => navigate(`search/${query}`)}>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
