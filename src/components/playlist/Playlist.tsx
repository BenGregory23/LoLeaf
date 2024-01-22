import React, { useEffect, useState } from "react";
import MusicRow from "./MusicRow";

interface PlaylistProps {
  musics: any[];
  setMusics: React.Dispatch<React.SetStateAction<any[]>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrent: React.Dispatch<React.SetStateAction<any[]>>;
}

const Playlist = ({ musics, setMusics, setIsPlaying, setCurrent }: PlaylistProps) => {
    const putFirstAndPlay = (index: number, move:boolean) => {
      if(move == false){
        setCurrent(musics[index])
        return
      } 
        const updatedMusics = [...musics]; // Create a copy of the array to avoid mutating state directly
        const selectedMusic = updatedMusics[index];
        
        // Remove the selected music from its current position
        updatedMusics.splice(index, 1);
    
        // Add the selected music to the first position
        updatedMusics.unshift(selectedMusic);
      
        // Update the state with the new array
        setMusics(updatedMusics);
        setIsPlaying(true)
  
      };

      const play = () =>{

      }

  

  return (
    <div className="p-3 absolute z-50" id="items">
      {musics.map((music, index) => (
        <MusicRow
          key={index}
          id={index}
          music={music}
          putFirstAndPlay={() => putFirstAndPlay(index, false)}
        />
      ))}
    </div>
  );
};

export default Playlist;
