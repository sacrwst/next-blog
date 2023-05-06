import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticProps, NextPage } from "next";
import { BlogCard } from "src/components/model/BlogCard";
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
            <BlogCard key={content.id} content={content} />
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
