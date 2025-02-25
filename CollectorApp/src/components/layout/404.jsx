import { NavLink } from 'react-router';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>
        Nie znaleziono strony. Sprawdź adres lub wróć na
        <NavLink to="/">stronę główną</NavLink>.
      </p>
    </div>
  );
};

export default NotFound;
