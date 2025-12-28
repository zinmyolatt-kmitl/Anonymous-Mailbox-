"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { PostTypeSelector } from "./post-type-selector"
import type { PostType } from "@/lib/constants"

interface CreatePostDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (post: { type: PostType; content: string; imageUrl?: string }) => void
}

export function CreatePostDialog({ isOpen, onClose, onSubmit }: CreatePostDialogProps) {
  const [postType, setPostType] = useState<PostType>("confession")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      type: postType,
      content,
      imageUrl: imageUrl || undefined,
    })
    // Reset form
    setContent("")
    setImageUrl("")
    setImagePreview(null)
    setPostType("confession")
    onClose()
  }

  const characterLimit = 500
  const remaining = characterLimit - content.length

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="w-full max-w-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground text-balance">Share Your Story</h2>
            <p className="text-sm text-muted-foreground mt-1">Choose a type and share what's on your mind</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-secondary -mt-2 -mr-2">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Post Type</Label>
            <PostTypeSelector selected={postType} onChange={setPostType} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content" className="text-sm font-medium">
                Your Story
              </Label>
              <span className={`text-xs ${remaining < 50 ? "text-destructive" : "text-muted-foreground"} font-medium`}>
                {remaining} characters left
              </span>
            </div>
            <Textarea
              id="content"
              placeholder="Share your thoughts, feelings, or funny moments..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={characterLimit}
              className="min-h-32 resize-none"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Add Image (Optional)</Label>
            <div className="flex flex-col gap-3">
              {imagePreview ? (
                <div className="relative rounded-lg overflow-hidden border border-border">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-auto max-h-64 object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setImagePreview(null)
                      setImageUrl("")
                    }}
                    className="absolute top-2 right-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload an image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11 border-input hover:bg-secondary bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!content.trim() || content.length > characterLimit}
            >
              Share Post
            </Button>
          </div>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Posts are anonymous. Please follow our community guidelines and be respectful.
        </p>
      </Card>
    </div>
  )
}
