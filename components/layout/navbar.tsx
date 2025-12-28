"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LoginPopup } from "@/components/login-popup"
import { CreatePostDialog } from "@/components/create/create-post-dialog"
import { PenSquare, Heart, BookOpen } from "lucide-react"
import Link from "next/link"
import type { PostType } from "@/lib/constants"

export function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userNickname, setUserNickname] = useState<string | null>(null)

  const handlePostSubmit = (post: { type: PostType; content: string; imageUrl?: string }) => {
    console.log("New post:", post)
    // In a real app, this would send to backend/database
  }

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Heart className="h-6 w-6 text-primary fill-primary" />
            <h1 className="text-xl font-bold text-foreground">Anonymous Mailbox</h1>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/rules">
              <Button variant="ghost" size="sm" className="gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Rules</span>
              </Button>
            </Link>

            {isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                  onClick={() => setIsCreatePostOpen(true)}
                >
                  <PenSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
                <div className="px-3 py-1.5 rounded-full bg-secondary text-sm font-medium">{userNickname}</div>
              </>
            ) : (
              <Button onClick={() => setIsLoginOpen(true)} size="sm">
                Join Us
              </Button>
            )}
          </div>
        </div>
      </nav>

      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <CreatePostDialog
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </>
  )
}
