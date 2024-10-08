"use client";
import { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
  
interface TooltipProps {
  content: ReactNode;
  side?: string;
  children: ReactNode;
}

const ToolTip = ({ children, content, side = 'top' }: TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
            {children}
        </TooltipTrigger>
        <TooltipContent side={side}>
         {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};



export default ToolTip;
