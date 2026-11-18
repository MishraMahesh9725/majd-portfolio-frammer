import { FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { posts } from "../data/site";
import { BlogCard } from "../components/BlogCard";
import { RevealText } from "../components/Reveal";

export function PostPage() {
  const { slug } = useParams();
  const index = posts.findIndex((post) => post.slug === slug);
  const post = posts[index];
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (post) document.title = `${post.title} — Majd`;
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;
  const more = [1, 2, 3].map((step) => posts[(index + step) % posts.length]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSent(true);
  }

  return (
    <article id="article-section" className="shell-wide pb-20 pt-40">
      <div className="grid gap-10 xl:grid-cols-[740px_300px]">
        <div>
          <p className="meta text-ink/50">
            <Link to="/blog#hero-section">Blog</Link> / Article
          </p>
          <h1 className="h-page mt-4 max-w-[740px]">{post.title}</h1>
          <p className="copy mt-4 max-w-[740px]">{post.summary}</p>
          <div className="mt-5 flex justify-between meta">
            <span>{post.date}</span>
            <span>{post.read}</span>
          </div>
          <img src={post.image} alt="" className="mt-5 aspect-[740/430] w-full rounded-[20px] object-cover" />
          <div className="mt-12 max-w-[740px] space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="h-article">
                  <RevealText text={section.heading} />
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="copy mt-5">
                    {paragraph}
                  </p>
                ))}
                {section.list.length > 0 && (
                  <ul className="mt-4 list-disc space-y-1 pl-5">
                    {section.list.map((item) => (
                      <li key={item} className="copy">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
        <aside className="xl:sticky xl:top-36 xl:self-start">
          <form onSubmit={onSubmit} className="rounded-[18px] bg-ink p-5 text-cream">
            <h2 className="text-[28px] font-medium leading-tight tracking-display">Join the newsletter</h2>
            <p className="meta mt-2 text-cream/80">Be the first to read our articles.</p>
            {sent ? (
              <p className="meta mt-6" role="status">You’re on the list.</p>
            ) : (
              <>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  className="mt-6 w-full rounded-lg bg-cream/10 px-3 py-3 text-[16px] text-cream outline-none placeholder:text-cream/50"
                />
                <button type="submit" className="mt-3 h-10 w-full rounded-lg bg-cream text-[16px] font-medium tracking-display text-ink">
                  Submit
                </button>
              </>
            )}
          </form>
        </aside>
      </div>
      <section className="mt-20">
        <h2 className="mb-8 text-[48px] font-semibold leading-none tracking-display md:text-[68px]">More Articles</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {more.map((item) => (
            <BlogCard key={item.slug} post={item} />
          ))}
        </div>
      </section>
    </article>
  );
}
