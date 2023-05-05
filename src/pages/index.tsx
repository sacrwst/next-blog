import Link from "next/link";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { client } from "src/libs/client";
import type { GetStaticProps, NextPage } from "next";

export type Blog = {
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
  const data = await client.getList<Blog>({
    endpoint: "blog",
  });

  return {
    props: data,
  };
};

export default Home;
