import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import Player from './Player';
import TrackSearchResult from './TrackSearchResult';
import Playlist from './Playlist'; 
import { Container, Form, Button } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import './Dashboard.css'; 

const spotifyApi = new SpotifyWebApi({
  clientId: "f9bfead203b948469f6b139d3ff345a4",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [specificTrackUri, setSpecificTrackUri] = useState(null); // New state for specific track URI chosen by the AI

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getUserPlaylists().then((response) => {
      setPlaylists(response.body.items);
    });
  }, [accessToken]);

  useEffect(() => {
    if (selectedPlaylist) {
      spotifyApi.getPlaylistTracks(selectedPlaylist.id).then(response => {
        setPlaylistTracks(response.body.items.map(item => item.track));
        setCurrentTrackIndex(0); 
      });
    }
  }, [selectedPlaylist]);

  useEffect(() => {
    if (currentTrackIndex >= 0 && playlistTracks.length > 0) {
      setPlayingTrack(playlistTracks[currentTrackIndex]);
    }
  }, [currentTrackIndex, playlistTracks]);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setCurrentTrackIndex(playlistTracks.findIndex(t => t.uri === track.uri));
    setSearch("");
  }

  function playNextTrack() {
    if (currentTrackIndex < playlistTracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  }

  function playPreviousTrack() {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  }

  function playSpecificTrack(trackUri) {
    const trackIndex = playlistTracks.findIndex(t => t.uri === trackUri);
    if (trackIndex !== -1) {
      setPlayingTrack(playlistTracks[trackIndex]);
      setCurrentTrackIndex(trackIndex);
      setSpecificTrackUri(trackUri); //soemhow we get the uri from the song suggested by the AI  ? we ll see once u tara lcdoe hihih
    }
  }

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Container className="d-flex flex-column full-height">
      <div className="d-flex flex-grow-1">
        <div className="playlist-sidebar">
          <h5 className="text-light">My Playlists</h5>
          {playlists.map(playlist => (
            <Playlist
              key={playlist.id}
              playlist={playlist}
              setSelectedPlaylist={setSelectedPlaylist}
            />
          ))}
        </div>
        <div className="d-flex flex-column flex-grow-1 track-list">
          <Form.Control
            type="search"
            placeholder="Search Songs/Artists"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setSelectedPlaylist(null); // Clear selected playlist when searching
            }}
            className="mb-3 search-bar"
          />
          {selectedPlaylist ? (
            <div>
              <h5 className="text-light">Tracks in {selectedPlaylist.name}</h5>
              {playlistTracks.map(track => (
                <TrackSearchResult
                  key={track.uri}
                  track={{
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: track.album.images[0]?.url,
                  }}
                  chooseTrack={chooseTrack}
                  onPlay={() => playSpecificTrack(track.uri)} // ZITOUN either fama specific uri ye5tara l AI  wala default typeshi
                />
              ))}
            </div>
          ) : (
            searchResults.map(track => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
                onPlay={() => playSpecificTrack(track.uri)} // ZITOUN either fama specific uri ye5tara l AI  wala default typeshi
              />
            ))
          )}
        </div>
      </div>
      <div className="player-controls">
        <Button 
          onClick={playPreviousTrack} 
          disabled={currentTrackIndex === 0} 
          className="control-button"
        >
          Previous
        </Button>
        <Player 
          accessToken={accessToken} 
          trackUri={playingTrack?.uri}
          onEnded={specificTrackUri ? () => setSpecificTrackUri(null) : playNextTrack} // ZITOUN either fama specific uri ye5tara l AI  wala default typeshi
        />
        <Button 
          onClick={playNextTrack} 
          disabled={currentTrackIndex === playlistTracks.length - 1} 
          className="control-button"
        >
          Next
        </Button>
      </div>
    </Container>
  );
}
