"use client"

import { Button } from "@/components/ui/button"
import { Heart, ImageIcon, Coffee } from "lucide-react"
import type { PostType } from "@/lib/constants"

interface PostTypeSelectorProps {
  selected: PostType
  onChange: (type: PostType) => void
}

export function PostTypeSelector({ selected, onChange }: PostTypeSelectorProps) {
  const types = [
    {
      value: "confession" as PostType,
      label: "Confession",
      icon: Heart,
      description: "Share your feelings",
      color: "text-pink-600",
      bgColor: "bg-pink-50 hover:bg-pink-100 border-pink-200",
      selectedColor: "bg-pink-100 border-pink-300",
    },
    {
      value: "meme" as PostType,
      label: "Meme",
      icon: ImageIcon,
      description: "Share something funny",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200",
      selectedColor: "bg-yellow-100 border-yellow-300",
    },
    {
      value: "tea" as PostType,
      label: "Tea",
      icon: Coffee,
      description: "Spill the tea",
      color: "text-purple-600",
      bgColor: "bg-purple-50 hover:bg-purple-100 border-purple-200",
      selectedColor: "bg-purple-100 border-purple-300",
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {types.map(({ value, label, icon: Icon, description, color, bgColor, selectedColor }) => (
        <Button
          key={value}
          type="button"
          variant="outline"
          onClick={() => onChange(value)}
          className={`h-auto flex-col gap-2 p-4 ${selected === value ? selectedColor : bgColor}`}
        >
          <Icon className={`h-5 w-5 ${color}`} />
          <div className="text-center">
            <div className="font-semibold text-sm">{label}</div>
            <div className="text-xs text-muted-foreground">{description}</div>
          </div>
        </Button>
      ))}
    </div>
  )
}
