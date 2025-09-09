import { getPosts } from "@/lib/mdx";
import Link from "next/link";


export default function RegionPage({params}){
    const{region}=params;
    const posts=getPosts(region);

    if(!posts.length){
        return <p className="p-6">No posts found for {region}</p>
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold capitalize mb-6">
                Reviews in {region}
            </h1>
            <ul className="space-y-4">
                {posts.map((post)=>(
                    <li key={post.slug}>
                        <Link
                            href={`/reviews/${region}/${post.slug}`}
                            className="text-blue-600 hover:underline"
                        >
                            {post.frontmatter.title || post.slug}
                        </Link>
                        <p className="text-gray-500">{post.frontmatter.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
