import { Link } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => (
  <div className="unauthorized">
    <h1>403 - Unauthorized</h1>
    <p>You don’t have permission to access this page.</p>
    <div className="unauthorized-buttons">
      <Link to="/" className="unauthorized-button">Go Home</Link>
      <Link to="/login" className="unauthorized-button">Login</Link>
    </div>
  </div>
);

export default Unauthorized;
