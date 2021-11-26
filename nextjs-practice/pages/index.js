import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link href="/about">
            <a>AboutPage</a>
          </Link>
        </li>
        <li>
          <Link href="/posts/1">
            <a>PostPage</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
