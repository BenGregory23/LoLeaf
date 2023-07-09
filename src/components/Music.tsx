/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Youtube from 'react-youtube';
import '../style/Music.css';
import { useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const Music = (props:{name:string,musicId:string, image:string}) => {

    const [videoDuration, setVideoDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);


    const fetchVideoDuration = () => {
       const apiKey = "AIzaSyAvZRV0g5K43qALbQdp9Zy5NW1VQ-Bq18I";

       fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${props.musicId}&key=${apiKey}`)
         .then(res => res.json())
            .then(data => {
            
                const duration = data.items[0].contentDetails.duration;
                const hours = duration.match(/(\d+)H/);
                const minutes = duration.match(/(\d+)M/);
                const seconds = duration.match(/(\d+)S/);
                let totalSeconds = 0;
                if(hours){
                    totalSeconds += parseInt(hours[1]) * 3600;
                }
                if(minutes){
                    totalSeconds += parseInt(minutes[1]) * 60;
                }
                if(seconds){
                    totalSeconds += parseInt(seconds[1]);
                }

                setVideoDuration(totalSeconds);
               
            })
            .catch(err => console.log(err));


    }

    
    
    useEffect(() => {

        if(currentTime === videoDuration){
            setPlaying(false);
        }

        if(!playing){
           return;
        }

        const interval = setInterval(() => {
            setCurrentTime(currentTime => currentTime + 1);
        }
        ,1000);

        return () => clearInterval(interval);


    },[playing])





    useEffect(() => {
        
        const player = document.getElementById('youtube') as HTMLIFrameElement;
        player.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');     
        
        fetchVideoDuration();

        setCurrentTime(0);
        

        
        

    },[props.musicId])



    const play = () => {
        const player = document.getElementById('youtube') as HTMLIFrameElement;
        player.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        setPlaying(true);
    }

    const pause = () => {
        const player = document.getElementById('youtube') as HTMLIFrameElement;
        player.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        setPlaying(false);
    }

    const mute = () => {
        const player = document.getElementById('youtube') as HTMLIFrameElement;
        player.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*');
    }

    const unmute = () => {
        const player = document.getElementById('youtube') as HTMLIFrameElement;
        player.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
    }


    return (
        <div className="music">
            
            <h2>{props.name}</h2>
           
            <img src={props.image} alt="music" className='background-image'/>

            <Youtube id='youtube' videoId={props.musicId} 
            opts={{
                height: '0',
                width: '0',
                playerVars: {
                    autoplay: 1,
                },
            }}
          
            />

      

            <div className="music-container">
                
                <div className="music-image">
                    <img src={props.image} alt="music" />
                </div>  
                
                <div className="music-controls">
                    <div className="music-name">
                        <h3>{props.name}</h3>
                    </div>
                    <div className='slider'>
                        <input type="range" min={0} defaultValue={0}
                        max={videoDuration}
                        
                        
                        onChange={(e) => {
                            const player = document.getElementById('youtube') as HTMLIFrameElement;
                            player.contentWindow?.postMessage(`{"event":"command","func":"seekTo","args":[${e.target.value},true]}`, '*');
                            setCurrentTime(parseInt(e.target.value));
                        }   
                        }/>
                    </div>
                    <div className="music-duration">
                        <p className="current-time">
                            {
                                Math.floor(currentTime / 60) + ':' + (currentTime % 60)
                            }
                        </p>

                        <p className="total-time">
                            {
                                Math.floor(videoDuration / 60) + ':' + (videoDuration % 60)
                            }

                        </p>
                    </div>
                </div>
            </div>


            <div className="stop-and-sound">          
                    <button onClick={() => {
                        if(playing){
                            pause();
                        }else{
                            play();
                        }
                    }
                    }>
                        {playing ?  <Pause size={34} color="#ffffff" strokeWidth={2} /> : <Play size={34} color="#ffffff" strokeWidth={2}  />}
                    </button>

                    <button onClick={() => {
                        if(muted){
                            unmute();
                            setMuted(false);
                        }else{
                            mute();
                            setMuted(true);
                        }
                    }
                    }>
                        {muted ?  <VolumeX size={34} color="#ffffff" strokeWidth={2}/> : <Volume2 size={34} color="#ffffff" strokeWidth={2}  />}

                    </button>
                
            </div>


        </div>
    )

}

export default Music;