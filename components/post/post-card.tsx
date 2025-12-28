"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PostTypeBadge } from "./post-type-badge"
import { Heart, Users, Laugh, Sparkles, Flag } from "lucide-react"
import type { Post } from "@/lib/constants"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [reactions, setReactions] = useState(post.reactions)
  const [userReaction, setUserReaction] = useState<string | undefined>(post.userReaction)

  const handleReaction = (reactionType: "heart" | "hug" | "laugh" | "support") => {
    setReactions((prev) => ({
      ...prev,
      [reactionType]: userReaction === reactionType ? prev[reactionType] - 1 : prev[reactionType] + 1,
      ...(userReaction && userReaction !== reactionType
        ? { [userReaction]: prev[userReaction as keyof typeof prev] - 1 }
        : {}),
    }))
    setUserReaction(userReaction === reactionType ? undefined : reactionType)
  }

  const reactionButtons = [
    { type: "heart" as const, icon: Heart, label: "Heart", color: "text-pink-500" },
    { type: "hug" as const, icon: Users, label: "Hug", color: "text-blue-500" },
    { type: "laugh" as const, icon: Laugh, label: "Laugh", color: "text-yellow-500" },
    { type: "support" as const, icon: Sparkles, label: "Support", color: "text-purple-500" },
  ]

  return (
    <Card className="p-6 space-y-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold">
            {post.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-foreground">{post.author}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(post.timestamp).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <PostTypeBadge type={post.type} />
      </div>

      <div className="space-y-3">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
        {post.imageUrl && (
          <div className="rounded-lg overflow-hidden border border-border">
            <img src={post.imageUrl || "/placeholder.svg"} alt="Post content" className="w-full h-auto" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex gap-2">
          {reactionButtons.map(({ type, icon: Icon, label, color }) => (
            <Button
              key={type}
              variant="ghost"
              size="sm"
              onClick={() => handleReaction(type)}
              className={`gap-1.5 ${userReaction === type ? color : "text-muted-foreground"}`}
            >
              <Icon className="h-4 w-4" fill={userReaction === type ? "currentColor" : "none"} />
              <span className="text-xs font-medium">{reactions[type]}</span>
            </Button>
          ))}
        </div>

        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
          <Flag className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
