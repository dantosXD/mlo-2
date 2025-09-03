import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/clients">Clients</Link></li>
          <li><Link to="/documents">Documents</Link></li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
