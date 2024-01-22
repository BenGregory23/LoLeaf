import { useEffect, useState } from "react";
import { loadMusics } from "./assets/musics";
import Playlist from "./components/playlist/Playlist";
import Music from "./components/music/Music";
import Controls from "./components/controls/Controls";

function App() {
  const [musics, setMusics] = useState(loadMusics());
  const [current, setCurrent] = useState(musics[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [timer, setTimer] = useState(0);



  useEffect(()=>{
    setTimer(0)
    
    
  }, [current])

  if (musics.length === 0) return <></>;

  return (
    <div className="h-screen w-screen   ">
      <Playlist musics={musics} setMusics={setMusics} setIsPlaying={setIsPlaying} setCurrent={setCurrent} />

      <Music music={current} setDuration={setDuration} setTimer={setTimer} />
      <Controls
        music={current}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        duration={duration}
        timer={timer}
        setTimer={setTimer}
      />
    </div>
  );
}

export default App;
