import { MicroCMSListResponse } from "microcms-js-sdk";
import { client } from "src/libs/client";
import type { GetStaticProps, NextPage } from "next";
import { BlogCard } from "src/components/model/BlogCard";

export type Blog = {
  title: string;
  body: string;
  thumbnail?: {
    url: string;
    width: string;
    height: string;
  };
};

const Home: NextPage<MicroCMSListResponse<Blog>> = (props) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {props.contents.map((content) => (
          <BlogCard key={content.id} content={content} />
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-center">About</h2>
        <p>自己紹介</p>
      </div>
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
