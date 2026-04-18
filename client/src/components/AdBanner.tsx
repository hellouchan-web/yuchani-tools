import React from 'react';
import { Card } from '@/components/ui/card';

interface AdBannerProps {
  position?: 'top' | 'sidebar' | 'bottom';
  className?: string;
}

export default function AdBanner({ position = 'sidebar', className = '' }: AdBannerProps) {
  return (
    <Card className={`p-4 bg-gradient-to-br from-slate-100 to-slate-50 border-slate-200 ${className}`}>
      <div className="text-center">
        <p className="text-xs text-slate-500 mb-2">Advertisement</p>
        <div className="bg-slate-200 rounded h-24 md:h-32 flex items-center justify-center text-slate-400 text-sm">
          {position === 'sidebar' ? 'Ad Space (300x250)' : 'Ad Space (728x90)'}
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {position === 'sidebar'
            ? 'Google AdSense or similar'
            : 'Google AdSense or similar'}
        </p>
      </div>
    </Card>
  );
}
