// app/reviews/africa/page.js
import Link from "next/link";

const posts = [
    {
        id: 1,
        title: "Review: Heart Coffee Roasters Kenya Spikes PB (Portland, Oregon)",
        date: "March 31, 2025",
        author: "Margaret",
        image: "/images/kenya-spikes.jpg", // 放到 public/images 下
        excerpt:
            "This is the last bag from my recent order from Heart. Right from the start, when I cut open the bag, the coffee smelled strong and fragrant...",
        slug: "heart-coffee-kenya-spikes",
    },
    // 以后可以在这里继续加更多文章
];

export default function AfricaPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold mb-6">Africa</h1>

            <div className="space-y-12">
                {posts.map((post) => (
                    <article key={post.id} className="border-b pb-6">
                        <p className="text-sm uppercase text-gray-500 mb-2">Africa</p>

                        <h2 className="text-xl font-bold mb-2">
                            <Link href={`/reviews/africa/${post.slug}`}>
                                {post.title}
                            </Link>
                        </h2>

                        <p className="text-gray-500 text-sm mb-4">
                            Posted on {post.date} by {post.author}
                        </p>

                        <img
                            src={post.image}
                            alt={post.title}
                            className="mb-4 rounded-lg shadow"
                        />

                        <p className="text-gray-700 mb-4">{post.excerpt}</p>

                        <Link
                            href={`/reviews/africa/${post.slug}`}
                            className="text-gray-600 uppercase tracking-wide text-sm font-semibold"
                        >
                            | Read More |
                        </Link>
                    </article>
                ))}
            </div>
        </main>
    );
}
