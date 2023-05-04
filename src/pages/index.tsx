import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import { client } from "src/libs/client";

type Articles = {
  title: string;
  body: string;
};

const Home: NextPage<MicroCMSListResponse<Articles>> = (props) => {
  console.log(props);

  return (
    <div>
      {props.contents.map((content) => (
        <h2 key={content.id}>{content.title}</h2>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  MicroCMSListResponse<Articles>
> = async () => {
  const data = await client.getList({
    endpoint: "articles",
  });
  console.log(data);

  return {
    props: data,
  };
};

export default Home;
