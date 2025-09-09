import Link from "next/link"
import {getAllPosts} from "@/lib/posts";

export default function HomePage() {
    const posts = getAllPosts();

  return(
      <section className="space-y-8">
          {posts.map((post)=>(
              <article key={post.slug} className="p-6 bg-white rounded-lg shadow">
                  <h2 className="text-xl font-blod">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                          {post.title}
                      </Link>
                  </h2>
                  <p className="text-gray-600 mt-2">{post.date}</p>
                  <p className="mt-4 text-gray-700">
                      {post.excerpt || post.title}...
                  </p>
                  <Link
                      href={`/blog/${post.slug}`}
                      className="inline-block mt-4 text-blue-600 hover:underline"
                      >
                      Read more
                  </Link>
              </article>
              ))}
      </section>

  )
}
