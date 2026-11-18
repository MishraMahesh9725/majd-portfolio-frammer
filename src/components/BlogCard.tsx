import { Link } from "react-router-dom";
import type { Post } from "../data/site";

export function BlogCard({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <Link
      to={`/blog/${post.slug}#article-section`}
      className={`group relative block h-[460px] overflow-hidden rounded-[20px] ${className}`}
    >
      <img src={post.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
        <p className="meta">{post.date}</p>
        <h3 className="h-card mt-1.5 text-cream">{post.title}</h3>
        <p className="meta mt-2.5">{post.excerpt}</p>
      </div>
    </Link>
  );
}
