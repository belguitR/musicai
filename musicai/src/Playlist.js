import React from 'react';
import { Card } from 'react-bootstrap';

export default function Playlist({ playlist, setSelectedPlaylist }) {
  return (
    <Card
      className="mb-2"
      style={{ cursor: 'pointer' }}
      onClick={() => setSelectedPlaylist(playlist)}
    >
      <Card.Img variant="top" src={playlist.images[0]?.url} />
      <Card.Body>
        <Card.Title>{playlist.name}</Card.Title>
        <Card.Text>{playlist.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
