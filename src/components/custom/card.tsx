import { useState, useRef } from 'react';
import './LoveLetter.css';
import audioFile from './music.mp3';

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullSize, setIsFullSize] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpenLetter = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsFullSize(true);
      // Ensuring audio play is directly a result of this user interaction
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => console.log("Playback succeeded"))
          .catch((e: any) => console.error("Playback failed:", e));
      }
    }, 800);
  };

  const handleCloseLetter = () => {
    setIsFullSize(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsOpen(false);
    }, 800);
  };

  return (
    <div className={`envelope rounded-lg text-sm ${isOpen ? 'open' : ''}`} onClick={!isFullSize ? handleOpenLetter : handleCloseLetter}>
      <div className="flap"></div>
      <div className="body"></div>
      <div className={`letter text-black ${isFullSize ? 'fullSize' : ''}`}>
        Hola mi reyna🖤,<br />
        hoy queria decirte lo importante que sos para mi, espero que este simple gesto te guste<br />te amoooo :)<br />
        gracias por ser mi todo,<br />
        Te ama con toda el alma, tu novio. <br />
        Gracias por ser mi todo, mi amor y por hacerme feliz.
      </div>
      <audio ref={audioRef} src={audioFile} onError={(e: any) => console.error('Audio error:', e.message)} />
    </div>
  );
};

export default LoveLetter;