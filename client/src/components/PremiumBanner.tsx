import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Zap } from 'lucide-react';

interface PremiumBannerProps {
  className?: string;
}

export default function PremiumBanner({ className = '' }: PremiumBannerProps) {
  return (
    <Card className={`p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Crown className="w-6 h-6 text-amber-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-amber-900 mb-1">Upgrade to Premium</h3>
          <p className="text-sm text-amber-800 mb-3">
            Get unlimited access to all tools, batch processing, and priority support.
          </p>
          <div className="flex gap-2">
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
              <Zap className="w-4 h-4 mr-1" />
              Upgrade Now
            </Button>
            <Button size="sm" variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
