import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  href: string;
  iconColor?: string;
  tagColor?: string;
}

export default function ToolCard({
  icon: Icon,
  title,
  description,
  tags,
  href,
  iconColor = 'text-indigo-300',
  tagColor = 'bg-indigo-400/15 border-indigo-400/30 text-indigo-200',
}: ToolCardProps) {
  return (
    <a href={href}>
      <Card className="group p-4 h-full hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center">
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          {tags.length > 0 && (
            <Badge variant="secondary" className={`text-xs ${tagColor}`}>
              {tags[0]}
            </Badge>
          )}
        </div>
        <h3 className="font-semibold leading-tight mb-2">{title}</h3>
        <p className="text-sm text-foreground/60 mb-4">{description}</p>
        <div className="text-xs text-foreground/50 group-hover:text-foreground/70 transition-colors">
          {/* Arrow icon or "Go to tool" text */}
          <span>→ {/* Arrow will be shown on hover */}</span>
        </div>
      </Card>
    </a>
  );
}
