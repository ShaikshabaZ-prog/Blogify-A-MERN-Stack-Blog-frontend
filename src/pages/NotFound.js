import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => (
  <div className="not-found">
    <img
      src="https://i.imgur.com/qIufhof.png" 
      alt="Not Found"
      className="not-found-image"
    />
    <h1>404 - Page Not Found</h1>
    <p>Oops! That route doesn't exist.</p>
    <Link to="/" className="home-button">Go Home</Link>
  </div>
);

export default NotFound;
