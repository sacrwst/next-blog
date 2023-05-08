import { Blog } from "src/pages";
import { client } from "src/libs/client";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import classes from "src/pages/blog/BlogId.module.scss";
import Image from "next/image";

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const BlogId: NextPage<Props> = (props) => {
  return (
    <div className="mt-10">
      <h1 className="text-3xl font-bold">{props.title}</h1>
      <div className="relative mt-10 h-80">
        <Image
          src={props.thumbnail ? props.thumbnail.url : "/background.jpg"}
          layout="fill"
          objectFit="cover"
          alt="サムネイル"
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: props.body }}
        className={classes.blogId}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList({
    endpoint: "blog",
  });

  const ids = data.contents.map((content) => `/blog/${content.id}`);

  return {
    paths: ids,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  context
) => {
  if (!context.params) return { notFound: true };
  const data = await client.getListDetail<Blog>({
    endpoint: "blog",
    contentId: context.params.id,
  });

  return {
    props: data,
  };
};

export default BlogId;
