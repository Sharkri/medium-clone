import BlogMarkdown from "./BlogMarkdown";

export default function BlogMarkdownWithTitleAndDesc({
  title,
  description,
  thumbnail,
  blogContents,
}: {
  title: string;
  description: string;
  thumbnail?: string;
  blogContents: string;
}) {
  return (
    <div className="prose max-sm:prose-p:text-[18px] max-sm:prose-h1:text-[20px] max-sm:prose-h2:text-[18px] max-w-full prose-img:mx-auto prose-img:max-h-[696px] prose-pre:bg-[#282c34] font-source-serif-pro prose-headings:font-sohne-bold">
      <div className="not-prose">
        <h1 className="text-[32px] tracking-[-0.256px] font-sohne-bold">
          {title}
        </h1>
        <h2 className="text-grey text-[22px] font-sans">{description}</h2>
      </div>
      {thumbnail && <img src={thumbnail} alt="" />}
      <BlogMarkdown text={blogContents} />
    </div>
  );
}
