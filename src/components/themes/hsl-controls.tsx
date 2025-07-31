'use client';

import React from 'react';
import { useCustomTheme } from '@/lib/themes/custom-theme-context';
import { RotateCcw, Palette, Check, Undo, Redo } from 'lucide-react';

export function HSLControls() {
  const { 
    state, 
    updateHSLAdjustments, 
    applyHSLAdjustments, 
    resetHSLAdjustments,
    undo,
    redo,
    canUndo,
    canRedo
  } = useCustomTheme();

  const { hslAdjustments } = state.state.themeState;

  return (
    <div className="bg-card p-6 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Palette className="w-5 h-5" />
          HSL Adjustments
        </h3>
        
        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-2 rounded-md bg-secondary text-secondary-foreground disabled:opacity-50"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-2 rounded-md bg-secondary text-secondary-foreground disabled:opacity-50"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Hue Shift */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Hue Shift: {hslAdjustments.hueShift}°
          </label>
          <input
            type="range"
            min="-180"
            max="180"
            step="1"
            value={hslAdjustments.hueShift}
            onChange={(e) => updateHSLAdjustments({ hueShift: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Saturation Scale */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Saturation: {(hslAdjustments.saturationScale * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={hslAdjustments.saturationScale}
            onChange={(e) => updateHSLAdjustments({ saturationScale: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Lightness Scale */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Lightness: {(hslAdjustments.lightnessScale * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={hslAdjustments.lightnessScale}
            onChange={(e) => updateHSLAdjustments({ lightnessScale: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <button
            onClick={applyHSLAdjustments}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
          >
            <Check className="w-4 h-4" />
            Apply Changes
          </button>
          <button
            onClick={resetHSLAdjustments}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}