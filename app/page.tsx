"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { PostFeed } from "@/components/post/post-feed"
import { Button } from "@/components/ui/button"
import { CreatePostDialog } from "@/components/create/create-post-dialog"
import { PenSquare } from "lucide-react"
import type { Post, PostType } from "@/lib/constants"

const mockPosts: Post[] = [
  {
    id: "1",
    type: "confession",
    content:
      "I've had a crush on someone in my class for months but I'm too nervous to say anything. Every time we make eye contact my heart skips a beat. I wish I had the courage to tell them how I feel.",
    author: "ShyPanda",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    reactions: { heart: 24, hug: 12, laugh: 3, support: 18 },
  },
  {
    id: "2",
    type: "meme",
    content: "When you realize it's Monday tomorrow and you haven't done any of your weekend homework 😭",
    imageUrl: "/funny-student-meme-monday-blues.jpg",
    author: "CoolTiger",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    reactions: { heart: 45, hug: 8, laugh: 67, support: 12 },
    userReaction: "laugh",
  },
  {
    id: "3",
    type: "tea",
    content:
      "So apparently there's drama in the dorm kitchen... someone's been eating everyone's labeled food from the fridge and leaving passive aggressive notes. The plot thickens! 🍿",
    author: "DreamWolf",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    reactions: { heart: 15, hug: 3, laugh: 34, support: 7 },
  },
  {
    id: "4",
    type: "confession",
    content:
      "I pretend to understand what's happening in lectures but honestly I'm lost most of the time. Is it just me or does everyone else feel this way too? Should I ask for help?",
    author: "BrightFalcon",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    reactions: { heart: 56, hug: 23, laugh: 8, support: 67 },
    userReaction: "support",
  },
]

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)

  const handlePostSubmit = (newPost: { type: PostType; content: string; imageUrl?: string }) => {
    const post: Post = {
      id: Date.now().toString(),
      type: newPost.type,
      content: newPost.content,
      imageUrl: newPost.imageUrl,
      author: "You",
      timestamp: new Date(),
      reactions: { heart: 0, hug: 0, laugh: 0, support: 0 },
    }
    setPosts([post, ...posts])
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-border">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold text-foreground text-balance">Your Safe Space to Share</h2>
            <p className="text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto">
              Share your thoughts, confessions, and funny vibes. We're all here to listen, react, and support each other
              without judgement.
            </p>
            <Button size="lg" className="gap-2 mt-4" onClick={() => setIsCreatePostOpen(true)}>
              <PenSquare className="h-4 w-4" />
              Share Something
            </Button>
          </div>
        </div>

        <PostFeed posts={posts} />
      </main>

      <CreatePostDialog
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  )
}
