import React from 'react';
import { Lightbulb } from 'lucide-react';

interface AITipBoxProps {
  tip: string;
}

export const AITipBox: React.FC<AITipBoxProps> = ({ tip }) => {
  return (
    <div className="mt-6 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-4 shadow-sm dark:from-purple-900/20 dark:to-blue-900/20">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Lightbulb className="h-6 w-6 text-yellow-500" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">AI Writing Tip</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{tip}</p>
        </div>
      </div>
    </div>
  );
};