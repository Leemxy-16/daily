import React from "react";
import { useNavigate } from "react-router-dom";

// type MovieCardProps = {
//   title: string;
//   imageUrl: string;
//   genre?: string;
//   id: number;
// };

type MovieCardProps = {
  id: number;
  title: string;
  imageUrl: string;
  poster_path?: string;
  release_date?: string;
  runtime?: number;
  genre?: { id: number; name: string }[];
  genre_ids?: number[];
};


export default function MovieCard({ title, imageUrl, genre, id }: MovieCardProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/movie/${id}`)}
      className="min-w-[230px] h-[95%] bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      <div className="h-[30%] w-[100%] bg-[rgba(153,27,27,0.7)] align-items-center justify-center flex flex-col">
        <img
          src={imageUrl}
          alt={title}
          className="w-[100%] h-[90%] object-cover"
        />
        <div className=" text-white text-center flex justify-center items-center bg-text-color h-[40px] w-[200px] ">
          <h3 className="text-sm font-semibold truncate">{title}</h3>
          {genre && Array.isArray(genre) && (
            <p className="text-xs text-gray-400">
              {genre.map((g) => g.name).join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
