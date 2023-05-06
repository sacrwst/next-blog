import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "src/libs/client";
import { Blog } from "src/pages";

const Blog: NextPage<MicroCMSListResponse<Blog>> = (props) => {
  return (
    <div>
      <div>
        <h1>Blog</h1>
        <div>Articles</div>
        <div className="grid grid-cols-3 gap-6">
          {props.contents.map((content) => (
            <Link key={content.id} href={`/blog/${content.id}`} passHref>
              <a className="block overflow-hidden rounded-lg shadow-md shadow-gray-400">
                <div className="relative h-40 w-full">
                  <Image
                    src={
                      content.thumbnail
                        ? content.thumbnail.url
                        : "/background.jpg"
                    }
                    layout="fill"
                    objectFit="cover"
                    alt="サムネイル"
                  />
                </div>
                <div className="min-h-[100px] px-4 py-2">
                  <p className="font-semibold">{content.title}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
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

export default Blog;
