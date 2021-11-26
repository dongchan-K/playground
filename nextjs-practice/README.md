# Nextjs

Nextjs는 SSR 및 정적 페이지 생성에 필요한 기능을 제공하는 Nodejs 기반의 React 프레임워크다.

## Nextjs Basic

### Pages

Nextjs는 pages 디렉토리 내부에 있는 파일(.js, .jsx, .ts, .tsx)이름을 기반으로 개별적인 페이지 컴포넌트로 연결한다.

```js
// pages/main.js => /main
const Home = () => {
  return <div>HomePage</div>;
};

// 동적 경로가 있는 페이지의 경우
// pages/posts/[id].js => posts/1

const PostItem = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>PostItem : {id}</div>;
};
```

기본적으로 Nextjs는 모든 페이지를 사전 렌더링(pre-rendering)한다. 각 페이지에 대해 미리 HTML을 생성하기 때문에 성능과 SEO 관점에서 이점을 얻을 수 있다.

Nextjs는 두 가지 형태의 사전 렌더링을 제공한다.

- Static Generation(정적 생성) : 빌드시 HTML을 생성하며, 요청에서 재사용한다. -> next build 스크립트에 의해 생성되고 CDN에 의해 캐싱될 수 있다. 캐싱된 HTML을 받을 수 있기 때문에 성능에 이점이 있다. (공식 문서에서는 해당 방법을 권장)

- Server-side Rendering(서버 사이드 렌더링) : 각 요청에 따라 HTML을 생성한다.

### Data Fetching

```js
// 데이터가 없는 정적 생성
const Home = () => {
  return <div>HomePage</div>;
};

export default Home;
```

페이지 컨텐츠가 외부 데이터에 의존한다면 getStaticProps 함수를 사용한다.
페이지 경로가 외부 데이터에 의존한다면 getStaticPaths 함수를 사용한다. => paths, fallback 프로퍼티는 필수!

```js
// 데이터를 사용한 정적 생성
const Post = ({ data }) => {
  return (
    <div>
      <ul>
        <li
          style={{
            backgroundImage: `url(${data[0].url})`,
          }}
        />
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
  };
};

export const getStaticPaths = async () => {
  const { data } = await axios.get(
    `https://api.thecatapi.com/v1/images/search`,
  );

  const paths = data.map((item) => ({ params: { id: item.id } }));
  return { paths, fallback: false };
};

export default Post;
```

getServerSideProps 함수를 사용해 데이터를 전달할 수 있다.

```js
const Page = ({ data }) => {
  return (
    <div>
      <ul>
        <li
          style={{
            backgroundImage: `url(${data[0].url})`,
          }}
        />
      </ul>
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(
    `https://api.thecatapi.com/v1/images/search`,
  );

  return {
    props: { data },
  };
};
export default Page;
```
