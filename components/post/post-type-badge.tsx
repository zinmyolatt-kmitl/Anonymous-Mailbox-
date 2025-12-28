import { Badge } from "@/components/ui/badge"
import { Heart, ImageIcon, Coffee } from "lucide-react"
import type { PostType } from "@/lib/constants"

interface PostTypeBadgeProps {
  type: PostType
}

export function PostTypeBadge({ type }: PostTypeBadgeProps) {
  const config = {
    confession: {
      label: "Confession",
      icon: Heart,
      className: "bg-pink-100 text-pink-700 hover:bg-pink-100 border-pink-200",
    },
    meme: {
      label: "Meme",
      icon: ImageIcon,
      className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200",
    },
    tea: {
      label: "Tea",
      icon: Coffee,
      className: "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200",
    },
  }

  const { label, icon: Icon, className } = config[type]

  return (
    <Badge variant="outline" className={className}>
      <Icon className="h-3 w-3 mr-1" />
      {label}
    </Badge>
  )
}
