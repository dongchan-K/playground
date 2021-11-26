import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Post = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>PostItem : {id}</h1>
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

export const getStaticProps = async () => {
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
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const { data } = await axios.get(
    `https://api.thecatapi.com/v1/images/search`,
  );

  const paths = data.map((item) => {
    return {
      params: { id: item.id },
    };
  });
  console.log(paths);

  return {
    paths,
    fallback: 'blocking',
  };
};

export default Post;
