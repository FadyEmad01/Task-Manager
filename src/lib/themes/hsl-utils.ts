import { HSLAdjustments } from '@/types/theme';

export class HSLUtils {
  /**
   * Parse OKLCH color format
   * oklch(L C H) where L = lightness, C = chroma, H = hue
   */
  static parseOKLCH(color: string): { l: number; c: number; h: number } | null {
    const match = color.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
    if (!match) return null;
    
    return {
      l: parseFloat(match[1]),
      c: parseFloat(match[2]),
      h: parseFloat(match[3])
    };
  }

  /**
   * Parse HEX color to HSL
   */
  static hexToHsl(hex: string): { h: number; s: number; l: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  /**
   * Convert HSL back to HEX
   */
  static hslToHex(h: number, s: number, l: number): string {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  /**
   * Apply HSL adjustments to a color
   */
  static applyHSLAdjustments(color: string, adjustments: HSLAdjustments): string {
    // Handle OKLCH colors
    const oklch = this.parseOKLCH(color);
    if (oklch) {
      return `oklch(${oklch.l * adjustments.lightnessScale} ${oklch.c * adjustments.saturationScale} ${(oklch.h + adjustments.hueShift + 360) % 360})`;
    }

    // Handle HEX colors
    if (color.startsWith('#')) {
      const hsl = this.hexToHsl(color);
      if (hsl) {
        const newH = (hsl.h + adjustments.hueShift + 360) % 360;
        const newS = Math.min(100, Math.max(0, hsl.s * adjustments.saturationScale));
        const newL = Math.min(100, Math.max(0, hsl.l * adjustments.lightnessScale));
        return this.hslToHex(newH, newS, newL);
      }
    }

    // Handle RGB/RGBA colors
    if (color.startsWith('rgb')) {
      // Convert RGB to HSL, apply adjustments, convert back
      // Implementation would be similar to HEX handling
      return color; // Fallback for now
    }

    return color; // Return original if can't parse
  }

  /**
   * Apply adjustments to entire theme
   */
  static applyAdjustmentsToTheme(
    styles: Record<string, string>, 
    adjustments: HSLAdjustments
  ): Record<string, string> {
    const adjusted: Record<string, string> = {};
    
    // Color properties that should be adjusted
    const colorProperties = [
      'background', 'foreground', 'card', 'card-foreground', 'popover', 
      'popover-foreground', 'primary', 'primary-foreground', 'secondary', 
      'secondary-foreground', 'muted', 'muted-foreground', 'accent', 
      'accent-foreground', 'destructive', 'destructive-foreground', 
      'border', 'input', 'ring', 'sidebar', 'sidebar-accent', 
      'sidebar-accent-foreground', 'sidebar-border', 'sidebar-foreground',
      'sidebar-primary', 'sidebar-primary-foreground', 'sidebar-ring',
      'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'
    ];

    Object.entries(styles).forEach(([key, value]) => {
      if (colorProperties.includes(key)) {
        adjusted[key] = this.applyHSLAdjustments(value, adjustments);
      } else {
        adjusted[key] = value; // Keep non-color properties unchanged
      }
    });

    return adjusted;
  }
}