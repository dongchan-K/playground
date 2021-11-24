import React from 'react';
import axios from 'axios';

const Post = ({ data }) => {
  return (
    <div>
      <h1>Post</h1>
      <ul>
        <li
          style={{
            backgroundImage: `url(${data[0].url})`,
            backgroundSize: 'contain',
            width: 300,
            height: 300,
          }}
        ></li>
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await axios.get(
    `https://api.thecatapi.com/v1/images/search`,
  );

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
}

export default Post;
