'use client';

import React, { useState } from 'react';
import { useCustomTheme } from '@/lib/themes/custom-theme-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ThemeStyles } from '@/types/theme';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function ColorInput({ label, value, onChange, placeholder }: ColorInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={label.toLowerCase().replace(/\s+/g, '-')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "oklch(1 0 0)"}
          className="flex-1"
        />
        <div 
          className="w-10 h-10 rounded border"
          style={{ backgroundColor: value || 'transparent' }}
        />
      </div>
    </div>
  );
}

export function CustomThemeEditor() {
  const { createCustomTheme, updateCustomTheme, deleteCustomTheme, customThemes, currentTheme } = useCustomTheme();
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingTheme, setEditingTheme] = useState<string | null>(null);
  const [themeName, setThemeName] = useState('');
  const [themeDescription, setThemeDescription] = useState('');
  
  // Default theme structure
  const defaultTheme: ThemeStyles = {
    light: {
      background: 'oklch(0.9754 0.0084 325.6414)',
      foreground: 'oklch(0.3257 0.1161 325.0372)',
      card: 'oklch(0.9754 0.0084 325.6414)',
      'card-foreground': 'oklch(0.3257 0.1161 325.0372)',
      popover: 'oklch(1.0000 0 0)',
      'popover-foreground': 'oklch(0.3257 0.1161 325.0372)',
      primary: 'oklch(0.5316 0.1409 355.1999)',
      'primary-foreground': 'oklch(1.0000 0 0)',
      secondary: 'oklch(0.8696 0.0675 334.8991)',
      'secondary-foreground': 'oklch(0.4448 0.1341 324.7991)',
      muted: 'oklch(0.9395 0.0260 331.5454)',
      'muted-foreground': 'oklch(0.4924 0.1244 324.4523)',
      accent: 'oklch(0.8696 0.0675 334.8991)',
      'accent-foreground': 'oklch(0.4448 0.1341 324.7991)',
      destructive: 'oklch(0.5248 0.1368 20.8317)',
      'destructive-foreground': 'oklch(1.0000 0 0)',
      border: 'oklch(0.8568 0.0829 328.9110)',
      input: 'oklch(0.8517 0.0558 336.6002)',
      ring: 'oklch(0.5916 0.2180 0.5844)',
      'chart-1': 'oklch(0.6038 0.2363 344.4657)',
      'chart-2': 'oklch(0.4445 0.2251 300.6246)',
      'chart-3': 'oklch(0.3790 0.0438 226.1538)',
      'chart-4': 'oklch(0.8330 0.1185 88.3461)',
      'chart-5': 'oklch(0.7843 0.1256 58.9964)',
      sidebar: 'oklch(0.9360 0.0288 320.5788)',
      'sidebar-foreground': 'oklch(0.4948 0.1909 354.5435)',
      'sidebar-primary': 'oklch(0.3963 0.0251 285.1962)',
      'sidebar-primary-foreground': 'oklch(0.9668 0.0124 337.5228)',
      'sidebar-accent': 'oklch(0.9789 0.0013 106.4235)',
      'sidebar-accent-foreground': 'oklch(0.3963 0.0251 285.1962)',
      'sidebar-border': 'oklch(0.9383 0.0026 48.7178)',
      'sidebar-ring': 'oklch(0.5916 0.2180 0.5844)',
      radius: '0.5rem'
    },
    dark: {
      background: 'oklch(0.2409 0.0201 307.5346)',
      foreground: 'oklch(0.8398 0.0387 309.5391)',
      card: 'oklch(0.2803 0.0232 307.5413)',
      'card-foreground': 'oklch(0.8456 0.0302 341.4597)',
      popover: 'oklch(0.1548 0.0132 338.9015)',
      'popover-foreground': 'oklch(0.9647 0.0091 341.8035)',
      primary: 'oklch(0.4607 0.1853 4.0994)',
      'primary-foreground': 'oklch(0.8560 0.0618 346.3684)',
      secondary: 'oklch(0.3137 0.0306 310.0610)',
      'secondary-foreground': 'oklch(0.8483 0.0382 307.9613)',
      muted: 'oklch(0.2634 0.0219 309.4748)',
      'muted-foreground': 'oklch(0.7940 0.0372 307.1032)',
      accent: 'oklch(0.3649 0.0508 308.4911)',
      'accent-foreground': 'oklch(0.9647 0.0091 341.8035)',
      destructive: 'oklch(0.2258 0.0524 12.6119)',
      'destructive-foreground': 'oklch(1.0000 0 0)',
      border: 'oklch(0.3286 0.0154 343.4461)',
      input: 'oklch(0.3387 0.0195 332.8347)',
      ring: 'oklch(0.5916 0.2180 0.5844)',
      'chart-1': 'oklch(0.5316 0.1409 355.1999)',
      'chart-2': 'oklch(0.5633 0.1912 306.8561)',
      'chart-3': 'oklch(0.7227 0.1502 60.5799)',
      'chart-4': 'oklch(0.6193 0.2029 312.7422)',
      'chart-5': 'oklch(0.6118 0.2093 6.1387)',
      sidebar: 'oklch(0.1893 0.0163 331.0475)',
      'sidebar-foreground': 'oklch(0.8607 0.0293 343.6612)',
      'sidebar-primary': 'oklch(0.4882 0.2172 264.3763)',
      'sidebar-primary-foreground': 'oklch(1.0000 0 0)',
      'sidebar-accent': 'oklch(0.2337 0.0261 338.1961)',
      'sidebar-accent-foreground': 'oklch(0.9674 0.0013 286.3752)',
      'sidebar-border': 'oklch(0 0 0)',
      'sidebar-ring': 'oklch(0.5916 0.2180 0.5844)',
      radius: '0.5rem'
    }
  };

  const [themeColors, setThemeColors] = useState<ThemeStyles>(defaultTheme);

  const handleColorChange = (mode: 'light' | 'dark', key: string, value: string) => {
    setThemeColors(prev => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [key]: value
      }
    }));
  };

  const handleCreateTheme = () => {
    if (!themeName.trim()) return;
    
    createCustomTheme({
      id: `custom-${Date.now()}`,
      name: themeName,
      description: themeDescription,
      styles: themeColors,
      createdAt: new Date().toISOString()
    });
    
    setIsCreating(false);
    setThemeName('');
    setThemeDescription('');
    setThemeColors(defaultTheme);
  };

  const handleUpdateTheme = () => {
    if (!editingTheme) return;
    
    updateCustomTheme(editingTheme, {
      name: themeName,
      description: themeDescription,
      styles: themeColors
    });
    
    setEditingTheme(null);
    setThemeName('');
    setThemeDescription('');
    setThemeColors(defaultTheme);
  };

  const startEditing = (themeId: string) => {
    const theme = customThemes.find(t => t.id === themeId);
    if (!theme) return;
    
    setEditingTheme(themeId);
    setThemeName(theme.name);
    setThemeDescription(theme.description || '');
    setThemeColors(theme.styles);
  };

  const cancelEditing = () => {
    setIsCreating(false);
    setEditingTheme(null);
    setThemeName('');
    setThemeDescription('');
    setThemeColors(defaultTheme);
  };

  return (
    <div className="space-y-6">
      {/* Custom Themes List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Custom Themes</h3>
          <Button 
            onClick={() => setIsCreating(true)}
            disabled={isCreating || editingTheme !== null}
          >
            Create New Theme
          </Button>
        </div>
        
        {customThemes.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                No custom themes yet. Create your first theme!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customThemes.map((theme) => (
              <Card key={theme.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {theme.name}
                    {currentTheme?.id === theme.id && (
                      <span className="text-sm text-primary">✓ Active</span>
                    )}
                  </CardTitle>
                  <CardDescription>{theme.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
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
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => startEditing(theme.id)}
                      disabled={isCreating || editingTheme !== null}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteCustomTheme(theme.id)}
                      disabled={isCreating || editingTheme !== null}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Theme Editor */}
      {(isCreating || editingTheme) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isCreating ? 'Create New Theme' : 'Edit Theme'}
            </CardTitle>
            <CardDescription>
              Customize your theme colors for both light and dark modes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme-name">Theme Name</Label>
                <Input
                  id="theme-name"
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                  placeholder="Enter theme name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme-description">Description</Label>
                <Input
                  id="theme-description"
                  value={themeDescription}
                  onChange={(e) => setThemeDescription(e.target.value)}
                  placeholder="Enter theme description"
                />
              </div>
            </div>

            <Separator />

            {/* Color Editor */}
            <Tabs defaultValue="light" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="light">Light Mode</TabsTrigger>
                <TabsTrigger value="dark">Dark Mode</TabsTrigger>
              </TabsList>
              
                             <TabsContent value="light" className="space-y-4">
                 <div className="space-y-6">
                   {/* Basic Colors */}
                   <div>
                     <h4 className="font-medium mb-3">Basic Colors</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <ColorInput
                         label="Background"
                         value={themeColors.light.background}
                         onChange={(value) => handleColorChange('light', 'background', value)}
                       />
                       <ColorInput
                         label="Foreground"
                         value={themeColors.light.foreground}
                         onChange={(value) => handleColorChange('light', 'foreground', value)}
                       />
                       <ColorInput
                         label="Primary"
                         value={themeColors.light.primary}
                         onChange={(value) => handleColorChange('light', 'primary', value)}
                       />
                       <ColorInput
                         label="Primary Foreground"
                         value={themeColors.light['primary-foreground']}
                         onChange={(value) => handleColorChange('light', 'primary-foreground', value)}
                       />
                       <ColorInput
                         label="Secondary"
                         value={themeColors.light.secondary}
                         onChange={(value) => handleColorChange('light', 'secondary', value)}
                       />
                       <ColorInput
                         label="Secondary Foreground"
                         value={themeColors.light['secondary-foreground']}
                         onChange={(value) => handleColorChange('light', 'secondary-foreground', value)}
                       />
                       <ColorInput
                         label="Muted"
                         value={themeColors.light.muted}
                         onChange={(value) => handleColorChange('light', 'muted', value)}
                       />
                       <ColorInput
                         label="Muted Foreground"
                         value={themeColors.light['muted-foreground']}
                         onChange={(value) => handleColorChange('light', 'muted-foreground', value)}
                       />
                       <ColorInput
                         label="Accent"
                         value={themeColors.light.accent}
                         onChange={(value) => handleColorChange('light', 'accent', value)}
                       />
                       <ColorInput
                         label="Accent Foreground"
                         value={themeColors.light['accent-foreground']}
                         onChange={(value) => handleColorChange('light', 'accent-foreground', value)}
                       />
                       <ColorInput
                         label="Destructive"
                         value={themeColors.light.destructive}
                         onChange={(value) => handleColorChange('light', 'destructive', value)}
                       />
                       <ColorInput
                         label="Destructive Foreground"
                         value={themeColors.light['destructive-foreground']}
                         onChange={(value) => handleColorChange('light', 'destructive-foreground', value)}
                       />
                     </div>
                   </div>

                   {/* UI Elements */}
                   <div>
                     <h4 className="font-medium mb-3">UI Elements</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <ColorInput
                         label="Border"
                         value={themeColors.light.border}
                         onChange={(value) => handleColorChange('light', 'border', value)}
                       />
                       <ColorInput
                         label="Input"
                         value={themeColors.light.input}
                         onChange={(value) => handleColorChange('light', 'input', value)}
                       />
                       <ColorInput
                         label="Ring"
                         value={themeColors.light.ring}
                         onChange={(value) => handleColorChange('light', 'ring', value)}
                       />
                       <ColorInput
                         label="Radius"
                         value={themeColors.light.radius}
                         onChange={(value) => handleColorChange('light', 'radius', value)}
                         placeholder="0.5rem"
                       />
                     </div>
                   </div>

                   {/* Card & Popover */}
                   <div>
                     <h4 className="font-medium mb-3">Card & Popover</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <ColorInput
                         label="Card"
                         value={themeColors.light.card}
                         onChange={(value) => handleColorChange('light', 'card', value)}
                       />
                       <ColorInput
                         label="Card Foreground"
                         value={themeColors.light['card-foreground']}
                         onChange={(value) => handleColorChange('light', 'card-foreground', value)}
                       />
                       <ColorInput
                         label="Popover"
                         value={themeColors.light.popover}
                         onChange={(value) => handleColorChange('light', 'popover', value)}
                       />
                       <ColorInput
                         label="Popover Foreground"
                         value={themeColors.light['popover-foreground']}
                         onChange={(value) => handleColorChange('light', 'popover-foreground', value)}
                       />
                     </div>
                   </div>

                   {/* Chart Colors */}
                   <div>
                     <h4 className="font-medium mb-3">Chart Colors</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <ColorInput
                         label="Chart 1"
                         value={themeColors.light['chart-1']}
                         onChange={(value) => handleColorChange('light', 'chart-1', value)}
                       />
                       <ColorInput
                         label="Chart 2"
                         value={themeColors.light['chart-2']}
                         onChange={(value) => handleColorChange('light', 'chart-2', value)}
                       />
                       <ColorInput
                         label="Chart 3"
                         value={themeColors.light['chart-3']}
                         onChange={(value) => handleColorChange('light', 'chart-3', value)}
                       />
                       <ColorInput
                         label="Chart 4"
                         value={themeColors.light['chart-4']}
                         onChange={(value) => handleColorChange('light', 'chart-4', value)}
                       />
                       <ColorInput
                         label="Chart 5"
                         value={themeColors.light['chart-5']}
                         onChange={(value) => handleColorChange('light', 'chart-5', value)}
                       />
                     </div>
                   </div>

                   {/* Sidebar Colors */}
                   <div>
                     <h4 className="font-medium mb-3">Sidebar Colors</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <ColorInput
                         label="Sidebar"
                         value={themeColors.light.sidebar}
                         onChange={(value) => handleColorChange('light', 'sidebar', value)}
                       />
                       <ColorInput
                         label="Sidebar Foreground"
                         value={themeColors.light['sidebar-foreground']}
                         onChange={(value) => handleColorChange('light', 'sidebar-foreground', value)}
                       />
                       <ColorInput
                         label="Sidebar Primary"
                         value={themeColors.light['sidebar-primary']}
                         onChange={(value) => handleColorChange('light', 'sidebar-primary', value)}
                       />
                       <ColorInput
                         label="Sidebar Primary Foreground"
                         value={themeColors.light['sidebar-primary-foreground']}
                         onChange={(value) => handleColorChange('light', 'sidebar-primary-foreground', value)}
                       />
                       <ColorInput
                         label="Sidebar Accent"
                         value={themeColors.light['sidebar-accent']}
                         onChange={(value) => handleColorChange('light', 'sidebar-accent', value)}
                       />
                       <ColorInput
                         label="Sidebar Accent Foreground"
                         value={themeColors.light['sidebar-accent-foreground']}
                         onChange={(value) => handleColorChange('light', 'sidebar-accent-foreground', value)}
                       />
                       <ColorInput
                         label="Sidebar Border"
                         value={themeColors.light['sidebar-border']}
                         onChange={(value) => handleColorChange('light', 'sidebar-border', value)}
                       />
                       <ColorInput
                         label="Sidebar Ring"
                         value={themeColors.light['sidebar-ring']}
                         onChange={(value) => handleColorChange('light', 'sidebar-ring', value)}
                       />
                     </div>
                   </div>
                 </div>
               </TabsContent>
              
                             <TabsContent value="dark" className="space-y-4">
                 <div className="space-y-6">
                   {/* Basic Colors */}
                   <div>
                     <h4 className="font-medium mb-3">Basic Colors</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <ColorInput
                         label="Background"
                         value={themeColors.dark.background}
                         onChange={(value) => handleColorChange('dark', 'background', value)}
                       />
                       <ColorInput
                         label="Foreground"
                         value={themeColors.dark.foreground}
                         onChange={(value) => handleColorChange('dark', 'foreground', value)}
                       />
                       <ColorInput
                         label="Primary"
                         value={themeColors.dark.primary}
                         onChange={(value) => handleColorChange('dark', 'primary', value)}
                       />
                       <ColorInput
                         label="Primary Foreground"
                         value={themeColors.dark['primary-foreground']}
                         onChange={(value) => handleColorChange('dark', 'primary-foreground', value)}
                       />
                       <ColorInput
                         label="Secondary"
                         value={themeColors.dark.secondary}
                         onChange={(value) => handleColorChange('dark', 'secondary', value)}
                       />
                       <ColorInput
                         label="Secondary Foreground"
                         value={themeColors.dark['secondary-foreground']}
                         onChange={(value) => handleColorChange('dark', 'secondary-foreground', value)}
                       />
                       <ColorInput
                         label="Muted"
                         value={themeColors.dark.muted}
                         onChange={(value) => handleColorChange('dark', 'muted', value)}
                       />
                       <ColorInput
                         label="Muted Foreground"
                         value={themeColors.dark['muted-foreground']}
                         onChange={(value) => handleColorChange('dark', 'muted-foreground', value)}
                       />
                       <ColorInput
                         label="Accent"
                         value={themeColors.dark.accent}
                         onChange={(value) => handleColorChange('dark', 'accent', value)}
                       />
                       <ColorInput
                         label="Accent Foreground"
                         value={themeColors.dark['accent-foreground']}
                         onChange={(value) => handleColorChange('dark', 'accent-foreground', value)}
                       />
                       <ColorInput
                         label="Destructive"
                         value={themeColors.dark.destructive}
                         onChange={(value) => handleColorChange('dark', 'destructive', value)}
                       />
                       <ColorInput
                         label="Destructive Foreground"
                         value={themeColors.dark['destructive-foreground']}
                         onChange={(value) => handleColorChange('dark', 'destructive-foreground', value)}
                       />
                     </div>
                   </div>

                   {/* UI Elements */}
                   <div>
                     <h4 className="font-medium mb-3">UI Elements</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <ColorInput
                         label="Border"
                         value={themeColors.dark.border}
                         onChange={(value) => handleColorChange('dark', 'border', value)}
                       />
                       <ColorInput
                         label="Input"
                         value={themeColors.dark.input}
                         onChange={(value) => handleColorChange('dark', 'input', value)}
                       />
                       <ColorInput
                         label="Ring"
                         value={themeColors.dark.ring}
                         onChange={(value) => handleColorChange('dark', 'ring', value)}
                       />
                       <ColorInput
                         label="Radius"
                         value={themeColors.dark.radius}
                         onChange={(value) => handleColorChange('dark', 'radius', value)}
                         placeholder="0.5rem"
                       />
                     </div>
                   </div>

                   {/* Card & Popover */}
                   <div>
                     <h4 className="font-medium mb-3">Card & Popover</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <ColorInput
                         label="Card"
                         value={themeColors.dark.card}
                         onChange={(value) => handleColorChange('dark', 'card', value)}
                       />
                       <ColorInput
                         label="Card Foreground"
                         value={themeColors.dark['card-foreground']}
                         onChange={(value) => handleColorChange('dark', 'card-foreground', value)}
                       />
                       <ColorInput
                         label="Popover"
                         value={themeColors.dark.popover}
                         onChange={(value) => handleColorChange('dark', 'popover', value)}
                       />
                       <ColorInput
                         label="Popover Foreground"
                         value={themeColors.dark['popover-foreground']}
                         onChange={(value) => handleColorChange('dark', 'popover-foreground', value)}
                       />
                     </div>
                   </div>

                   {/* Chart Colors */}
                   <div>
                     <h4 className="font-medium mb-3">Chart Colors</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <ColorInput
                         label="Chart 1"
                         value={themeColors.dark['chart-1']}
                         onChange={(value) => handleColorChange('dark', 'chart-1', value)}
                       />
                       <ColorInput
                         label="Chart 2"
                         value={themeColors.dark['chart-2']}
                         onChange={(value) => handleColorChange('dark', 'chart-2', value)}
                       />
                       <ColorInput
                         label="Chart 3"
                         value={themeColors.dark['chart-3']}
                         onChange={(value) => handleColorChange('dark', 'chart-3', value)}
                       />
                       <ColorInput
                         label="Chart 4"
                         value={themeColors.dark['chart-4']}
                         onChange={(value) => handleColorChange('dark', 'chart-4', value)}
                       />
                       <ColorInput
                         label="Chart 5"
                         value={themeColors.dark['chart-5']}
                         onChange={(value) => handleColorChange('dark', 'chart-5', value)}
                       />
                     </div>
                   </div>

                   {/* Sidebar Colors */}
                   <div>
                     <h4 className="font-medium mb-3">Sidebar Colors</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <ColorInput
                         label="Sidebar"
                         value={themeColors.dark.sidebar}
                         onChange={(value) => handleColorChange('dark', 'sidebar', value)}
                       />
                       <ColorInput
                         label="Sidebar Foreground"
                         value={themeColors.dark['sidebar-foreground']}
                         onChange={(value) => handleColorChange('dark', 'sidebar-foreground', value)}
                       />
                       <ColorInput
                         label="Sidebar Primary"
                         value={themeColors.dark['sidebar-primary']}
                         onChange={(value) => handleColorChange('dark', 'sidebar-primary', value)}
                       />
                       <ColorInput
                         label="Sidebar Primary Foreground"
                         value={themeColors.dark['sidebar-primary-foreground']}
                         onChange={(value) => handleColorChange('dark', 'sidebar-primary-foreground', value)}
                       />
                       <ColorInput
                         label="Sidebar Accent"
                         value={themeColors.dark['sidebar-accent']}
                         onChange={(value) => handleColorChange('dark', 'sidebar-accent', value)}
                       />
                       <ColorInput
                         label="Sidebar Accent Foreground"
                         value={themeColors.dark['sidebar-accent-foreground']}
                         onChange={(value) => handleColorChange('dark', 'sidebar-accent-foreground', value)}
                       />
                       <ColorInput
                         label="Sidebar Border"
                         value={themeColors.dark['sidebar-border']}
                         onChange={(value) => handleColorChange('dark', 'sidebar-border', value)}
                       />
                       <ColorInput
                         label="Sidebar Ring"
                         value={themeColors.dark['sidebar-ring']}
                         onChange={(value) => handleColorChange('dark', 'sidebar-ring', value)}
                       />
                     </div>
                   </div>
                 </div>
               </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={isCreating ? handleCreateTheme : handleUpdateTheme}
                disabled={!themeName.trim()}
              >
                {isCreating ? 'Create Theme' : 'Update Theme'}
              </Button>
              <Button variant="outline" onClick={cancelEditing}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 