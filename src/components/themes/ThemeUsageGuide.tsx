'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ThemeUsageGuide() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🎨 Theme System Guide</CardTitle>
          <CardDescription>
            Learn how to use and customize themes in your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Available Themes</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Default</Badge>
              <Badge variant="secondary">Twitter</Badge>
              <Badge variant="secondary">Modern</Badge>
              <Badge variant="secondary">Theme 1</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">How to Use Themes</h3>
            <div className="space-y-2 text-sm">
              <p>1. <strong>Select a Theme:</strong> Click on any theme card to apply it instantly</p>
              <p>2. <strong>Create Custom Theme:</strong> Use the "Create New Theme" button to make your own</p>
              <p>3. <strong>Edit Themes:</strong> Click "Edit" on any custom theme to modify it</p>
              <p>4. <strong>Delete Themes:</strong> Remove unwanted custom themes with the "Delete" button</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Color Formats Supported</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <Badge variant="outline" className="mb-1">OKLCH</Badge>
                <p className="text-muted-foreground">oklch(0.5 0.2 240)</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-1">HEX</Badge>
                <p className="text-muted-foreground">#ff0000</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-1">RGB</Badge>
                <p className="text-muted-foreground">rgb(255, 0, 0)</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-1">HSL</Badge>
                <p className="text-muted-foreground">hsl(0, 100%, 50%)</p>
              </div>
            </div>
          </div>

                     <div className="space-y-2">
             <h3 className="font-semibold">Theme Properties</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
               <div>
                 <h4 className="font-medium mb-2">Basic Colors</h4>
                 <p><strong>Background:</strong> Main page background</p>
                 <p><strong>Foreground:</strong> Main text color</p>
                 <p><strong>Primary:</strong> Primary action color</p>
                 <p><strong>Secondary:</strong> Secondary action color</p>
                 <p><strong>Muted:</strong> Subtle background color</p>
                 <p><strong>Accent:</strong> Highlight color</p>
                 <p><strong>Destructive:</strong> Error/warning colors</p>
               </div>
               <div>
                 <h4 className="font-medium mb-2">UI Elements</h4>
                 <p><strong>Border:</strong> Border color</p>
                 <p><strong>Input:</strong> Input field background</p>
                 <p><strong>Ring:</strong> Focus ring color</p>
                 <p><strong>Radius:</strong> Border radius (e.g., 0.5rem)</p>
                 <p><strong>Card:</strong> Card background</p>
                 <p><strong>Popover:</strong> Popover background</p>
               </div>
               <div>
                 <h4 className="font-medium mb-2">Extended Colors</h4>
                 <p><strong>Chart 1-5:</strong> Chart color palette</p>
                 <p><strong>Sidebar:</strong> Sidebar background</p>
                 <p><strong>Sidebar Primary:</strong> Sidebar primary color</p>
                 <p><strong>Sidebar Accent:</strong> Sidebar accent color</p>
                 <p><strong>Sidebar Border:</strong> Sidebar border</p>
                 <p><strong>Sidebar Ring:</strong> Sidebar focus ring</p>
               </div>
             </div>
           </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Tips</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Use OKLCH for better color consistency across themes</li>
              <li>• Test both light and dark modes when creating themes</li>
              <li>• Ensure good contrast between background and foreground colors</li>
              <li>• Custom themes are saved automatically to your browser</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 