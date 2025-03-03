import React, { useRef, useState, useEffect } from 'react';
import videoM from '../assets/videoM.mp4'; // Upewnij się, że ścieżki do plików są poprawne
import videoS from '../assets/videoS.mp4';

const VideoPlayer = () => {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const [isFirstVideoPlaying, setIsFirstVideoPlaying] = useState(true); // Stan kontrolujący, który film jest wyświetlany

  // Używamy useEffect, aby uruchomić pierwszy film po załadowaniu komponentu
  useEffect(() => {
    if (videoRef1.current) {
      videoRef1.current.play(); // Odtwarzaj pierwszy film automatycznie
    }
  }, []);

  const handleEnd = (videoIndex) => {
    if (videoIndex === 1) {
      // Jeśli pierwszy film się skończy, przełącz na drugi film
      setIsFirstVideoPlaying(false); // Zmieniamy stan, aby pokazać drugi film
      videoRef2.current.play(); // Odtwarzaj drugi film
    } else {
      // Jeśli drugi film się skończy, przełącz na pierwszy film
      setIsFirstVideoPlaying(true); // Zmieniamy stan, aby pokazać pierwszy film
      videoRef1.current.play(); // Odtwarzaj pierwszy film
    }
  };

  return (
    <div
      className="video-container"
      style={{ position: 'relative', width: '100%' }}
    >
      <video
        ref={videoRef1}
        width="100%"
        height={{
          base: '300px',
          sm: '350px',
          md: '400px',
          lg: '500px',
          xl: '700px'
        }}
        autoPlay
        muted
        onEnded={() => handleEnd(1)} // Po zakończeniu pierwszego filmu, uruchom drugi
        loop={false} // Bez zapętlania, przełączamy ręcznie
        style={{
          display: isFirstVideoPlaying ? 'block' : 'none', // Jeśli pierwszy film odtwarzowany, pokazujemy go
          objectFit: 'cover' // Zastosowanie objectFit jako część stylu CSS
        }}
      >
        <source src={videoM} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video
        ref={videoRef2}
        width="100%"
        height={{
          base: '300px',
          sm: '350px',
          md: '400px',
          lg: '500px',
          xl: '700px'
        }}
        autoPlay
        muted
        onEnded={() => handleEnd(2)} // Po zakończeniu drugiego filmu, uruchom pierwszy
        loop={false} // Bez zapętlania, przełączamy ręcznie
        style={{
          display: !isFirstVideoPlaying ? 'block' : 'none', // Jeśli drugi film odtwarzany, pokazujemy go
          objectFit: 'cover' // Zastosowanie objectFit jako część stylu CSS
        }}
      >
        <source src={videoS} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
