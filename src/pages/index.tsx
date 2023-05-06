import Link from "next/link";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { client } from "src/libs/client";
import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";

export type Blog = {
  title: string;
  body: string;
};

const Home: NextPage<MicroCMSListResponse<Blog>> = (props) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {props.contents.map((content) => (
          <Link key={content.id} href={`/blog/${content.id}`} passHref>
            <a className="block overflow-hidden rounded-lg shadow-md shadow-gray-400">
              <div className="relative h-40 w-full">
                <Image
                  src="/background.jpg"
                  alt="img"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="min-h-[100px] px-4 py-2">
                <p className="font-semibold">{content.title}</p>
              </div>
            </a>
          </Link>
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
