import { Blog } from "src/pages";
import { client } from "src/libs/client";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const BlogId: NextPage<Props> = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: props.body }} />
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
