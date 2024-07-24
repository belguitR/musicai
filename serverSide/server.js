require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
const PORT = process.env.PORT || 3001; // Default to port 3001 if PORT is not set in .env

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to refresh the Spotify access token
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token, // Fixed typo: accessToken -> access_token
        expiresIn: data.body.expires_in, // Fixed typo: expiresIn -> expires_in
      });
    })
    .catch(err => {
      console.error('Error refreshing access token', err);
      res.sendStatus(400);
    });
});

// Route to handle Spotify login
app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(err => {
      console.error('Error during authorization code grant', err);
      res.sendStatus(400);
    });
});

// Route to fetch lyrics
app.get("/lyrics", async (req, res) => {
  try {
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found";
    res.json({ lyrics });
  } catch (err) {
    console.error('Error fetching lyrics', err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
