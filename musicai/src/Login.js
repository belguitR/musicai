import { Container } from 'react-bootstrap';
import './Login.css'; // Import the CSS file for custom styles

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=f9bfead203b948469f6b139d3ff345a4&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <div className="login-container">
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ zIndex: 1 }}
      >
        <h1 className="title">Musicai</h1>
        <p className="subtitle">An AI-driven music player</p>
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
          Login With Spotify
        </a>
        <footer className="footer">
          Made by HMX
        </footer>
      </Container>
    </div>
  );
}
