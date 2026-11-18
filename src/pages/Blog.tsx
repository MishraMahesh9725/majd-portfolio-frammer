import { posts } from "../data/site";
import { BlogCard } from "../components/BlogCard";
import { RevealText } from "../components/Reveal";

export function BlogPage() {
  return (
    <section id="hero-section" className="shell-wide pb-24 pt-40">
      <h1 className="h-page max-w-[620px]">
        <RevealText text="My Brightest Thoughts" />
      </h1>
      <p className="copy mt-4 max-w-[460px]">
        Discover ideas, perspectives, and creative thinking shaped by our work in brand identity and art direction. Each article explores how thoughtful design helps brands with clarity and intention.
      </p>
      <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
