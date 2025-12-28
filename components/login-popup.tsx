"use client"

import type React from "react"

import { useState } from "react"
import { X, Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface LoginPopupProps {
  isOpen: boolean
  onClose: () => void
}

const randomAdjectives = ["Cool", "Happy", "Swift", "Bright", "Clever", "Sunny", "Cosmic", "Dream", "Magic", "Wonder"]
const randomNouns = ["Panda", "Tiger", "Falcon", "Dragon", "Phoenix", "Wolf", "Bear", "Eagle", "Lion", "Hawk"]

function generateRandomNickname(): string {
  const adjective = randomAdjectives[Math.floor(Math.random() * randomAdjectives.length)]
  const noun = randomNouns[Math.floor(Math.random() * randomNouns.length)]
  return `${adjective}${noun}`
}

export function LoginPopup({ isOpen, onClose }: LoginPopupProps) {
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [isCheckingNickname, setIsCheckingNickname] = useState(false)
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null)

  // Simulated database of taken nicknames
  const [takenNicknames] = useState(new Set(["tohsayar", "tohsayar2", "admin", "user"]))

  const handleRandomNickname = () => {
    const randomName = generateRandomNickname()
    setNickname(randomName)
    checkNickname(randomName)
  }

  const checkNickname = async (name: string) => {
    if (!name) {
      setNicknameAvailable(null)
      return
    }

    setIsCheckingNickname(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    let finalNickname = name
    let counter = 1

    // Check if nickname is taken and increment if necessary
    while (takenNicknames.has(finalNickname.toLowerCase())) {
      counter++
      finalNickname = `${name}${counter}`
    }

    // If we had to increment, update the nickname field
    if (finalNickname !== name) {
      setNickname(finalNickname)
    }

    setNicknameAvailable(true)
    setIsCheckingNickname(false)
  }

  const handleNicknameChange = (value: string) => {
    setNickname(value)
    setNicknameAvailable(null)
  }

  const handleNicknameBlur = () => {
    checkNickname(nickname)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login submitted:", { email, nickname })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground text-balance">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">We're happy to see you again</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-secondary -mt-2 -mr-2">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 bg-background border-input focus-visible:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nickname" className="text-sm font-medium">
              Nickname
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="nickname"
                  type="text"
                  placeholder="Choose a nickname"
                  value={nickname}
                  onChange={(e) => handleNicknameChange(e.target.value)}
                  onBlur={handleNicknameBlur}
                  required
                  className="h-11 bg-background border-input focus-visible:ring-primary pr-10"
                />
                {isCheckingNickname && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
                {nicknameAvailable === true && !isCheckingNickname && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleRandomNickname}
                className="h-11 w-11 shrink-0 border-input hover:bg-secondary bg-transparent"
                title="Generate random nickname"
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>
            {nicknameAvailable === true && (
              <p className="text-xs text-green-600 flex items-center gap-1">Nickname is available</p>
            )}
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
              disabled={!email || !nickname || !nicknameAvailable}
            >
              Continue
            </Button>
          </div>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          By continuing, you agree to our Terms and Privacy Policy
        </p>
      </Card>
    </div>
  )
}
