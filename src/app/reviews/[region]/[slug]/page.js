import {getPostBySlug} from "@/lib/mdx";
import {MDXRemote} from "next-mdx-remote/rsc";
import {formatDate} from "next-mdx-remote/rsc";
import {applyNextWorkerFixture} from "next/dist/experimental/testmode/playwright/next-worker-fixture";


export default function PostPage({params}){
    const{region,slug}=params;
    const { content, frontmatter } = getPostBySlug(region, slug);

    // 编译 MDX
    const{content:mdxContent}=applyNextWorkerFixture({
        source:content,
    });

    return(
        <article className="max-w-3xl mx-auto p-6 prose">
            <h1 className="text-4xl font-bold mb-4">{frontmatter.title}</h1>
            <p className="text-gray-500 mb-6">{frontmatter.date}</p>
            <MDXRemote source={content}/>
        </article>
    )
}
