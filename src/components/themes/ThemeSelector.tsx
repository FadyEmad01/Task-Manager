'use client';

import React from 'react';
import { useCustomTheme } from '@/lib/themes/custom-theme-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ThemeSelector() {
  const { allThemes, currentTheme, setCustomTheme } = useCustomTheme();

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Theme Selector</h2>
      <p className="text-muted-foreground">
        Current theme: <span className="font-semibold">{currentTheme?.name || 'Custom'}</span>
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allThemes.map((theme) => (
          <Card 
            key={theme.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              currentTheme?.id === theme.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setCustomTheme(theme.id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {theme.name}
                {currentTheme?.id === theme.id && (
                  <span className="text-sm text-primary">✓ Active</span>
                )}
              </CardTitle>
              <CardDescription>{theme.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: theme.styles.light.background }}
                  />
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: theme.styles.light.primary }}
                  />
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: theme.styles.light.secondary }}
                  />
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: theme.styles.light.accent }}
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCustomTheme(theme.id);
                  }}
                >
                  Apply Theme
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 