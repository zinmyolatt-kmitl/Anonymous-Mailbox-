export const POST_TYPES = {
  CONFESSION: "confession",
  MEME: "meme",
  TEA: "tea",
} as const

export type PostType = (typeof POST_TYPES)[keyof typeof POST_TYPES]

export interface Post {
  id: string
  type: PostType
  content: string
  imageUrl?: string
  author: string
  timestamp: Date
  reactions: {
    heart: number
    hug: number
    laugh: number
    support: number
  }
  userReaction?: "heart" | "hug" | "laugh" | "support"
}
