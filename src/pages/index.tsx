import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { client } from "src/libs/client";

type Blog = {
  title: string;
  body: string;
};

const Home: NextPage<MicroCMSListResponse<Blog>> = (props) => {
  return (
    <div>
      {props.contents.map((content) => (
        <Link key={content.id} href={`blog/${content.id}`} passHref>
          <h2>{content.title}</h2>
        </Link>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  MicroCMSListResponse<Blog>
> = async () => {
  const data = await client.getList({
    endpoint: "blog",
  });
  console.log(data);

  return {
    props: data,
  };
};

export default Home;
