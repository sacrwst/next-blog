import Image from "next/image";
import Link from "next/link";

type Props = {
  content: {
    id: string;
    title: string;
    body: string;
    thumbnail?: {
      url: string;
      width: string;
      height: string;
    };
  };
};

export const BlogCard = (props: Props) => {
  return (
    <Link key={props.content.id} href={`/blog/${props.content.id}`} passHref>
      <a className="block overflow-hidden rounded-lg shadow-md shadow-gray-400">
        <div className="relative h-40 w-full">
          <Image
            src={
              props.content.thumbnail
                ? props.content.thumbnail.url
                : "/background.jpg"
            }
            layout="fill"
            objectFit="cover"
            alt="サムネイル"
          />
        </div>
        <div className="min-h-[100px] px-4 py-2">
          <p className="font-semibold">{props.content.title}</p>
        </div>
      </a>
    </Link>
  );
};
