import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import MovieItem from "./MovieItem";
import { MovieType } from "../types/MovieType";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface Props {
  title: string;
  url: string;
}

const MovieRow = ({ title, url }: Props) => {

  const [movies, setMovies] = useState<MovieType[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.get(url).then((res) => setMovies(res.data.results));
  }, [url]);

  const slide = (offset: number) => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft += offset;
    }
  };

  return (
    <div>
      <h2 className="font-bold md:text-xl p-4 capitalize">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
        <div
          ref={sliderRef}
          id="slider" // Remove curly braces from id
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <MovieItem key={movie.id} item={movie} />
          ))}
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
      </div>
    </div>
  );
};

export default MovieRow;
