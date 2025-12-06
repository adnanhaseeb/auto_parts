import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Database, Server } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Configure your admin panel</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>MongoDB Connection</CardTitle>
              <CardDescription>Connect your MongoDB database</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="connectionString">Connection String</Label>
            <Input
              id="connectionString"
              type="password"
              placeholder="mongodb+srv://username:password@cluster.mongodb.net/database"
              className="font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dbName">Database Name</Label>
            <Input
              id="dbName"
              placeholder="sehgal_motors"
            />
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-start gap-3">
              <Server className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Backend Required</p>
                <p>
                  MongoDB requires a backend server to connect securely. The current setup uses local state. 
                  To connect MongoDB, you'll need to set up a Node.js/Express backend or use MongoDB Realm/Atlas Data API.
                </p>
              </div>
            </div>
          </div>
          <Button disabled className="bg-primary text-primary-foreground">
            Save Connection (Backend Required)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
