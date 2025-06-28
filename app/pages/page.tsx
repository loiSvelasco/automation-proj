import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, FileText, Users, Settings, ShoppingCart, BarChart3 } from "lucide-react"

export default function PagesDirectory() {
  // Organize your pages by categories for better navigation
  const pageCategories = [
    {
      title: "Core Pages",
      description: "Main application pages",
      icon: <Home className="h-5 w-5" />,
      pages: [
        { name: "Home", href: "/", description: "Landing page" },
        { name: "About", href: "/about", description: "About us page" },
        { name: "Contact", href: "/contact", description: "Contact information" },
      ],
    },
    {
      title: "Authentication",
      description: "User authentication flows",
      icon: <Users className="h-5 w-5" />,
      pages: [
        { name: "Login", href: "/login", description: "User login form" },
        { name: "Register", href: "/register", description: "User registration" },
        { name: "Forgot Password", href: "/forgot-password", description: "Password reset" },
      ],
    },
    {
      title: "Dashboard",
      description: "User dashboard and analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      pages: [
        { name: "Dashboard", href: "/dashboard", description: "Main dashboard" },
        { name: "Analytics", href: "/dashboard/analytics", description: "Analytics overview" },
        { name: "Reports", href: "/dashboard/reports", description: "Detailed reports" },
      ],
    },
    {
      title: "Settings",
      description: "Configuration and preferences",
      icon: <Settings className="h-5 w-5" />,
      pages: [
        { name: "Profile", href: "/settings/profile", description: "User profile settings" },
        { name: "Preferences", href: "/settings/preferences", description: "User preferences" },
        { name: "Security", href: "/settings/security", description: "Security settings" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Pages Directory</h1>
          <p className="text-muted-foreground text-lg">Navigate through all available pages in your prototype</p>
          <Badge variant="secondary" className="mt-2">
            Prototype Navigation Hub
          </Badge>
        </div>

        {/* Page Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pageCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {category.icon}
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.pages.map((page, pageIndex) => (
                    <Link
                      key={pageIndex}
                      href={page.href}
                      className="block p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium group-hover:text-primary transition-colors">{page.name}</h4>
                          <p className="text-sm text-muted-foreground">{page.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {page.href}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Use This Directory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              • <strong>Add new pages:</strong> Edit the <code>pageCategories</code> array in{" "}
              <code>app/pages/page.tsx</code>
            </p>
            <p className="text-sm text-muted-foreground">
              • <strong>Create categories:</strong> Add new category objects with title, description, icon, and pages
            </p>
            <p className="text-sm text-muted-foreground">
              • <strong>Update links:</strong> Modify the <code>href</code> values to match your actual routes
            </p>
            <p className="text-sm text-muted-foreground">
              • <strong>Customize icons:</strong> Import different icons from <code>lucide-react</code> for each
              category
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
