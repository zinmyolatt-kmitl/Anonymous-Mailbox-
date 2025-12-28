import { Navbar } from "@/components/layout/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Heart, Users, Flag, Lock, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function RulesPage() {
  const rules = [
    {
      icon: Heart,
      title: "Be Kind and Supportive",
      description:
        "We're here to support each other. Treat everyone with kindness and empathy. Remember, behind every post is a real person with real feelings.",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      icon: Shield,
      title: "Stay Safe and Respectful",
      description:
        "No hate speech, harassment, bullying, or discrimination of any kind. We have zero tolerance for content that makes others feel unsafe or unwelcome.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Users,
      title: "Respect Privacy",
      description:
        "Don't share personal information about yourself or others. No real names, phone numbers, addresses, or other identifying details. Keep it anonymous.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: MessageCircle,
      title: "Keep It Appropriate",
      description:
        "No explicit sexual content, graphic violence, or illegal activities. Keep your posts suitable for a diverse community of students and young adults.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Lock,
      title: "No Spam or Self-Promotion",
      description:
        "This isn't a place for advertising, selling products, or spamming. Share genuine thoughts, feelings, and experiences, not promotional content.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Flag,
      title: "Report Rule Violations",
      description:
        "If you see something that breaks these rules, please report it. Help us maintain a safe, supportive community for everyone.",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground text-balance">Community Guidelines</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            These rules help us maintain a safe, supportive, and welcoming space for everyone to share their thoughts
            and feelings without judgement.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {rules.map((rule, index) => (
            <Card key={index} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <div className={`h-12 w-12 rounded-lg ${rule.bgColor} flex items-center justify-center shrink-0`}>
                  <rule.icon className={`h-6 w-6 ${rule.color}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{rule.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rule.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-border">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground text-balance">What Happens If Rules Are Broken?</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Violations of these guidelines may result in content removal, temporary suspension, or permanent ban
              depending on severity. We review all reports carefully and take appropriate action to maintain a healthy
              community.
            </p>
            <div className="pt-4">
              <Link href="/">
                <Button size="lg">Back to Home</Button>
              </Link>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
