import { useState } from "react";
import { creatImageUrl } from "../services/MovieServices";
import { MovieType } from "../types/MovieType";
import { IoIosHeart } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/FireBase";
import { useAuth } from "../context/Authcontext";

interface Movie {
  item: MovieType;
  key: number;
}

const MovieItem = ({ item }: Movie) => {
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { title, backdrop_path, poster_path } = item;

  const markFacShow = async () => {
    setLoading(true);
    try {
      const userEmail = user?.email;
      if (userEmail) {
        const userDoc = doc(db, "users", userEmail);
        setLike(!like);
        await updateDoc(userDoc, {
          favShows: arrayUnion({ ...item })
        });
        // Provide feedback to the user
        console.log("Marked as favorite successfully!");
      } else {
        alert("Login to save movie");
      }
    } catch (error) {
      console.error("Error marking as favorite:", error);
      // Handle error gracefully, e.g., display a toast message
    }
    setLoading(false);
  };

  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
      <img
        className="w-full h-40 block object-cover object-top"
        src={creatImageUrl(backdrop_path ?? poster_path, "w500")}
        alt={title}
      />
      <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
        <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-bold">
          {title}
        </p>
        <button
          onClick={markFacShow}
          className="absolute top-2 left-2 text-gray-300 cursor-pointer"
          disabled={loading}
        >
          {like ? <IoIosHeart /> : <FaHeart />}
        </button>
      </div>
    </div>
  );
};

export default MovieItem;
