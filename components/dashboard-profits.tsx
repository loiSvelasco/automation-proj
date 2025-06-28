import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DashboardProfits({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className="flex flex-col min-h-screen bg-muted p-8 gap-8" {...props}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-secondary w-16 h-16 flex items-center justify-center text-lg font-bold">Logo</div>
          <span className="text-lg font-medium">Welcome Juan!</span>
        </div>
        <nav className="flex gap-2">
          <Button variant="secondary">Dashboard</Button>
          <Button variant="ghost">Stocks</Button>
          <Button variant="ghost">Sales</Button>
          <Button variant="ghost">Operations</Button>
          <Button variant="ghost">Reports</Button>
          <Button variant="ghost">Backup/Restore</Button>
          <Button variant="ghost">Logout</Button>
        </nav>
      </div>

      {/* Filters */}
      <Card className="w-fit border-dashed border-2">
        <CardContent className="flex items-center gap-4 py-4">
          <span className="font-medium">Filters</span>
          <Label><Input type="checkbox" className="mr-2" />Label</Label>
          <Label><Input type="checkbox" className="mr-2" />Label</Label>
          <Label><Input type="checkbox" className="mr-2" />Label</Label>
          <Label><Input type="checkbox" className="mr-2" defaultChecked />Label</Label>
          <Label><Input type="checkbox" className="mr-2" defaultChecked />Label</Label>
        </CardContent>
      </Card>


      <div className="grid grid-cols-2 gap-8">
        {/* Jay Graphs */}
        <div className="flex flex-col gap-8">
          <div className="flex gap-16">
            <div className="flex flex-col items-center">
              <span className="text-muted-foreground text-lg">Merchants</span>
              <span className="text-6xl font-bold">121</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-muted-foreground text-lg">Coverage</span>
              <span className="text-6xl font-bold">50</span>
            </div>
          </div>
          {/* Charts 1  */}
          <Card className="h-48 flex items-center justify-center">
            <span className="text-muted-foreground">[Chart 1 Placeholder]</span>
          </Card>
        </div>
        {/* Charts 2 */}
        <div className="flex flex-col gap-8">
          <Card className="h-48 flex items-center justify-center">
            <span className="text-muted-foreground">[Chart 2 Placeholder]</span>
          </Card>
          <Card className="h-48 flex items-center justify-center">
            <span className="text-muted-foreground">[Chart 3 Placeholder]</span>
          </Card>
        </div>
      </div>

      {/* Naavv*/}
      <div className="flex items-center gap-4 border-t pt-4 mt-8">
        <span className="text-muted-foreground">Navigation Controls</span>
        <Button variant="outline" size="icon"><span className="material-icons">home</span></Button>
        <Button variant="secondary">Merchants</Button>
        <Button variant="ghost">Products</Button>
        <Button variant="ghost">Profit</Button>
        <Button variant="ghost">Loss</Button>
        <Button variant="ghost">Collection</Button>
        <Button variant="ghost">Expenses</Button>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-muted-foreground mt-8">© 2025 Company Name</footer>
    </div>
  )
}

export default DashboardProfits 