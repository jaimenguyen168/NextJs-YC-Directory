import React, {Suspense} from 'react'
import {client} from "@/sanity/lib/client";
import {PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY} from "@/sanity/lib/query";
import {notFound} from "next/navigation";
import {formatDate} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import {Skeleton} from "@/components/ui/skeleton";
import TotalViews from "@/components/TotalViews";
import StartupCard, {StartupCardType} from "@/components/StartupCard";

const md = markdownit()

export const experimental_ppr = true;

const Page =async ({ params }: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id

  const [post, { select: hotPicks }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "hot-picks",
    }),
  ]);

  const parsedContent = md.render(post?.pitch || '')

  if (!post) return notFound()

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">
          {formatDate(post?._createdAt)}
        </p>
        <h1 className="heading">
          {post.title}
        </h1>
        <p className="sub-heading !max-w-5xl">
          {post.description}
        </p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post.author._id}`} className="flex gap-2 items-center mb-3">
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">@{post.author.username}</p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose max-w-4xl font-work-sans break-all"
            />
          ): (
            <p className="no-results">No results found</p>
          )}
        </div>

        <hr className="divider" />

        {hotPicks?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Hot Picks</p>

            <ul className="mt-7 card_grid-sm">
              {hotPicks.map((post: StartupCardType, index: number) => (
                <StartupCard key={index} post={post}/>
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton"/>}>
          <TotalViews id={id}/>
        </Suspense>
      </section>
    </>
  )
}
export default Page
