import React, { useEffect } from "react";

const Controls = ({
  music,
  isPlaying,
  setIsPlaying,
  isMuted,
  setIsMuted,
  duration,
  timer,
  setTimer,
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(timer);
      if (!isPlaying) return;
      setTimer(Number(timer + 1));
    }, 1000);

    return () => clearInterval(interval);
  });

  const play = () => {
    const player = document.getElementById("youtube") as HTMLIFrameElement;
    player.contentWindow?.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      "*"
    );
    setIsPlaying(true);
  };

  const pause = () => {
    const player = document.getElementById("youtube") as HTMLIFrameElement;

    player.contentWindow?.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
    setIsPlaying(false);
  };

  const mute = () => {
    const player = document.getElementById("youtube") as HTMLIFrameElement;
    player.contentWindow?.postMessage(
      '{"event":"command","func":"mute","args":""}',
      "*"
    );
    setIsMuted(true);
  };

  const unmute = () => {
    const player = document.getElementById("youtube") as HTMLIFrameElement;
    player.contentWindow?.postMessage(
      '{"event":"command","func":"unMute","args":""}',
      "*"
    );
    setIsMuted(false);
  };

  return (
    <div className="flex w-screen absolute bottom-0 right-0 rounded-none bg-black space-x-5 p-7  border-gray-500 border-t ">
      <img src={music.image} className="rounded-md w-16 h-16 object-cover" />

      <div className="flex items-center space-x-2">
        <button
          onClick={() => {
            if (isPlaying) pause();
            else play();
          }}
        >
          {isPlaying === true ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              className="w-10 h-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
          )}
        </button>

        <button
          onClick={() => {
            if (isMuted) unmute();
            else mute();
          }}
        >
          {isMuted === true ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              className="w-9 h-9"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              className="w-9 h-9"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="w-full flex items-center range">
        <input
          type="range"
          value={timer}
          onChange={(e) => {
            setTimer(e.target.value);
            const player = document.getElementById(
              "youtube"
            ) as HTMLIFrameElement;
            player.contentWindow?.postMessage(
              `{"event":"command","func":"seekTo","args":[${e.target.value},true]}`,
              "*"
            );
          }}
          className="w-full rounded-sm"
          step={0.01}
          min={0}
          max={duration}
        />
      </div>
    </div>
  );
};

export default Controls;
