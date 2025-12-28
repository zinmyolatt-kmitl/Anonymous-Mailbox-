import { PostCard } from "./post-card"
import type { Post } from "@/lib/constants"

interface PostFeedProps {
  posts: Post[]
}

export function PostFeed({ posts }: PostFeedProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-muted-foreground text-lg">No posts yet. Be the first to share something!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
