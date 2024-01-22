import React from "react";
import { useState, useEffect } from "react";
import Youtube from "react-youtube";

const Music = ({ music, setDuration, setTimer }) => {
  const fetchVideoDuration = () => {
    const apiKey = "AIzaSyAvZRV0g5K43qALbQdp9Zy5NW1VQ-Bq18I";

    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${music.musicId}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.items);
        const duration = data.items[0].contentDetails.duration;
        const hours = duration.match(/(\d+)H/);
        const minutes = duration.match(/(\d+)M/);
        const seconds = duration.match(/(\d+)S/);
        let totalSeconds = 0;
        if (hours) {
          totalSeconds += parseInt(hours[1]) * 3600;
        }
        if (minutes) {
          totalSeconds += parseInt(minutes[1]) * 60;
        }
        if (seconds) {
          totalSeconds += parseInt(seconds[1]);
        }

        setDuration(totalSeconds);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const player = document.getElementById("youtube") as HTMLIFrameElement;
    player.contentWindow?.postMessage(
      `{"event":"command","func":"seekTo","args":[${0},true]}`,
      "*"
    );

    fetchVideoDuration();

    setTimer(0);
  }, [music.musicId]);

  return (
    <div className="flex justify-center items-center absolute top-0 left-0 h-screen w-screen z-1">
      <img src={music.image} className="rounded-md w-80 h-80 object-cover" />
      <img
        src={music.image}
        className="w-full h-full absolute top-0 left-0 blur-md -z-50 opacity-97"
      />

      <Youtube
        id="youtube"
        videoId={music.musicId}
        opts={{
          // make it the same size as the background image

          width: "0",
          height: "1",

          playerVars: {
            autoplay: 0,
          },
        }}
        className="bg-red-300"
      />
    </div>
  );
};

export default Music;
