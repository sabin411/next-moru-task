import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// const
const routes = [
  { name: 'Home', path: '/' },
  { name: 'users', path: '/users' },
  { name: 'server side', path: '/server-side' },
  { name: 'static site', path: '/static-site' },
];

export default function NavBar() {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <nav className='nav-container customContainer'>
      {routes.map(route => (
        <Link
          className={`nav-link ${
            currentRoute === route.path ? 'active-link' : ''
          }`}
          key={route.name}
          href={route.path}
        >
          {route.name}
        </Link>
      ))}
    </nav>
  );
}
