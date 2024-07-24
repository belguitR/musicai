# Music Player with Spotify API

## Overview
This project is a music player application that leverages the Spotify API to search for tracks, display playlists, and play music. It consists of a server-side component and a client-side component, working together to provide a seamless music experience.

## Features
- **Search for tracks**: Search for songs and artists using the Spotify search functionality.
- **Playlists**: Display and select playlists from the user's Spotify account.
- **Track Playback**: Play selected tracks with controls for next and previous tracks.

## Components

### Server-Side
The server-side component is built using Node.js and Express. It handles Spotify authentication, token management, and fetching lyrics.

#### Key Routes:
- **POST /login**: Handles Spotify authentication and returns access and refresh tokens.
- **POST /refresh**: Refreshes the Spotify access token.
- **GET /lyrics**: Fetches lyrics for a specific track.

#### Dependencies:
- `express`: Web framework for Node.js.
- `cors`: Middleware to enable CORS.
- `body-parser`: Middleware to parse incoming request bodies.
- `spotify-web-api-node`: Node.js wrapper for the Spotify Web API.
- `lyrics-finder`: Library to fetch lyrics.

### Client-Side
The client-side is built using React and provides the user interface for interacting with the music player. It allows users to search for tracks, view playlists, and control playback.

#### Key Components:
- **Dashboard**: Manages state for playlists, search results, and playback.
- **Player**: Integrates with the Spotify Web Playback SDK to play tracks.
- **TrackSearchResult**: Displays individual search results and allows selection.
- **Playlist**: Displays playlists and allows selection.

#### Dependencies:
- `react`: Library for building user interfaces.
- `react-bootstrap`: Bootstrap components for React.
- `spotify-web-api-node`: Node.js wrapper for the Spotify Web API.
- `react-spotify-web-playback`: Component to integrate Spotify's Web Playback SDK.

## Setup

### Server-Side Setup
1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

Install Server Dependencies

Ensure you have Node.js installed. If not, download and install it from nodejs.org.

bash
Copier le code
npm install
Create a .env File

Create a .env file in the root directory and add the following environment variables:

plaintext
Copier le code
CLIENT_ID=<your-spotify-client-id>
CLIENT_SECRET=<your-spotify-client-secret>
REDIRECT_URI=<your-redirect-uri>
Start the Server

bash
Copier le code
npm start
The server will run on http://localhost:3001.

Client-Side Setup
Navigate to the Client Directory

bash
Copier le code
cd client
Install Client Dependencies

Ensure you have Node.js installed. If not, download and install it from nodejs.org.

bash
Copier le code
npm install
Start the Client

bash
Copier le code
npm start
The client will run on http://localhost:3000.
