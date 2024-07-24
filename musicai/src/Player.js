import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri, onEnded }) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    // W start playing the new track directly  dinzbi krzt
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) {
          setPlay(false);
          if (state.progressMs === 0 && !state.nextTracks.length) {
            onEnded();
          }
        }
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  );
}
