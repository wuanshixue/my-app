

export default function AfricaPost({ params }) {
    const { slug } = params;

    // 模拟文章数据（后面可以换成数据库或 MDX）
    const posts = {
        "heart-coffee-kenya-spikes": {
            title: "Review: Heart Coffee Roasters Kenya Spikes PB (Portland, Oregon)",
            date: "March 31, 2025",
            author: "Margaret",
            content: `
        <p>This is the last bag from my recent order from Heart...</p>
        <p>Whole beans: Buttery, rich, sweet fragrance. Definite notes of butterscotch and ...</p>
      `,
        },
    };

    const post = posts[slug];

    if (!post) {
        return <p className="text-center py-10">Post not found.</p>;
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-500 text-sm mb-6">
                Posted on {post.date} by {post.author}
            </p>
            <div
                className="prose prose-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </main>
    );
}
