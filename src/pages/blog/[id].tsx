import { Blog } from "src/pages";
import { client } from "src/libs/client";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import classes from "src/pages/blog/BlogId.module.scss";
import Image from "next/image";
import { load } from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const BlogId: NextPage<Props> = (props) => {
  return (
    <div className=" bg-white p-8">
      <h1 className="bg-gradient-to-r from-purple-700 to-pink-600 p-6 text-3xl font-bold text-white">
        {props.title}
      </h1>
      <div className="relative mt-10">
        <Image
          src={props.thumbnail ? props.thumbnail.url : "/background.jpg"}
          width={1000}
          height={500}
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

  const $ = load(data.body);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
    data.body = $.html();
  });

  $("img").each((_, img) => {
    $(img).replaceWith(`<div class="mb-10">${$.html(img)}</div>`);
    data.body = $.html();
  });

  return {
    props: data,
  };
};

export default BlogId;
