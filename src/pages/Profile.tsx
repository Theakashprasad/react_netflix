import React, { useEffect, useState, useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useAuth } from "../context/Authcontext";
import { db } from "../services/FireBase";
import { creatImageUrl } from "../services/MovieServices";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { MovieType } from "../types/MovieType"; // Assuming you have defined MovieType interface
import { AiOutlineClose } from "react-icons/ai";

const Profile = () => {
  const [movies, setMovies] = useState<MovieType[]>([]); // Specify the correct type for movies
  const { user } = useAuth();
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", user.email), (doc) => {
        if (doc.exists()) {
          setMovies(doc.data().favShows || []);
        }
      });
    }
  }, [user?.email]);

  const slide = (offset: number) => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft += offset;
    }
  };

  const handleUnlikeShow = async (movie: MovieType) => {
    const userDoc = doc(db, "users", user?.email || ""); // Providing a default value for user?.email
    await updateDoc(userDoc, {
      favShows: arrayRemove(movie)
    });
  };

  if (!user) {
    return <p>Fetching show...</p>;
  }

  return (
    <div>
      <img
        className="block w-full h-[500px] object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="//"
      />
      <div className="bg-black/20 fixed top-0 left-0 w-full h-[500px]" />
      <div className="absolute top-[20%] p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl font-bold my-2">my show</h1>
        <p className="font-light text-gray-400 text-lg">{user.email}</p>
      </div>
      <h2 className="font-bold md:text-xl p-4 capitalize">fav shows</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={40}
        />
        <div
          ref={sliderRef}
          id="slider"
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
            >
              <img
                className="w-full h-40 block object-cover object-top"
                src={creatImageUrl(
                  movie.backdrop_path ?? movie.poster_path,
                  "w500"
                )}
                alt={movie.title}
              />
              <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-bold">
                  {movie.title}
                </p>
                <p>
                  <AiOutlineClose
                    size={30}
                    onClick={() => handleUnlikeShow(movie)}
                    className="absolute top-2 right-2 cursor-pointer"
                  />
                </p>
              </div>
            </div>
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

export default Profile;
