import React from "react";
import Main from "../components/Main";
import MovieRow from "../components/MovieRow";
import requests from "../services/MovieServices";
const Home = () => {
  return (
    <div>
      <Main />
      <MovieRow title="requestHorror" url={requests.requestHorror} />
      <MovieRow title="requestPopular" url={requests.requestPopular} />
      <MovieRow title="requestTopRated" url={requests.requestTopRated} />
      <MovieRow title="requestTrending" url={requests.requestTrending} />
    </div>
  );
};

export default Home;
