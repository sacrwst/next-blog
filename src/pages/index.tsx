import Link from "next/link";
import { BlogCard } from "src/components/model/BlogCard";
import { client } from "src/libs/client";
import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";

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
        <Link href="/blog">
          <a className="mx-auto block w-40 border-2 border-blue-500 py-2 text-center font-semibold text-blue-700 hover:bg-blue-500 hover:text-white">
            もっと見る
          </a>
        </Link>
      </div>
      <div className="mt-10">
        <h2 className="text-center">About</h2>
        <p>自己紹介</p>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.getList({
    endpoint: "pickup",
  });

  return {
    props: {
      contents: data.contents[0].pickupBlog,
    },
  };
};

export default Home;
