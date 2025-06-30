import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Info } from "lucide-react"
import Link from "next/link"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-hidden shadow-none">
        <CardHeader>
          <Link href="/" className="items-center justify-center flex mb-4">
            <img
              src="/logo.jpg"
              width={160}
              height={160}
              alt="3sandrlogo"
            />
          </Link>
          <CardTitle className="text-center text-4xl">Automation System</CardTitle>
          <CardDescription className="text-center text-sm text-muted-foreground">
            3S&R Frozen Meat Products Trading Inc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-3">
              <div className="grid gap-3">
                {/* <Label htmlFor="email">Email</Label> */}
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  required
                />
              </div>
              <div className="grid">
                <div className="flex items-center">
                  {/* <Label htmlFor="password">Password</Label> */}
                </div>
                <Input id="password" placeholder="password" type="password" required />
              </div>
              <div className="flex flex-col mt-4 gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
               <Info className="inline"/> Forgot your password?
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
