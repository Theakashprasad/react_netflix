import React, { useEffect, useState } from "react";
import axios from "axios";
import requests, { creatImageUrl } from "../services/MovieServices";
import { MovieType } from "../types/MovieType";

const Main = () => {
  const [movie, setMovie] = useState<MovieType | null>(null);
  useEffect(() => {
    axios
      .get(requests.requestPopular)
      .then((res) => {
        const movies: MovieType[] = res.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!movie)
    return (
      <>
        <p>fetching....</p>
      </>
    );
  const { title, backdrop_path, release_date, overview } = movie;
  return (
    <div className="w-full h-[500px] lg:h-[850px]">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] lg:h-[850px] bg-gradient-to-r from-black" />
        <img
          className="w-full h-full object-cover object-top"
          src={creatImageUrl(backdrop_path, "original")}
          alt="{title}"
        />
        <div className="absolute w-full top-[10%] lg:top-[25%] p-4 md:p-8">
          <h1 className="text-3xl md:text-6xl font-bold">{title}</h1>
          <div className="mt-8 mb-4">
            <button className="capitalize border bg-gray-300 text-black py-2 px-5">
              play
            </button>
            <button className="capitalize border border-gray-300 py-2 px-5">
              watch later
            </button>
          </div>
          <p className="text-gray-400 text-sm">{release_date}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
