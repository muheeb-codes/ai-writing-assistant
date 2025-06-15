import React from 'react';
import { WordSuggestion } from '../types/types';

interface ResultsSectionProps {
  results: WordSuggestion[];
  searchType: string;
  isLoading: boolean;
  query: string;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  results,
  searchType,
  isLoading,
  query
}) => {
  if (!query.trim()) {
    return <EmptyState message="Enter a word above to see suggestions" />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (results.length === 0) {
    return <EmptyState message="No results found. Try a different word or search type." />;
  }

  return (
    <div className="mt-6 w-full">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
        {getResultsTitle(searchType, query)}
      </h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {results.map((suggestion, index) => (
          <WordCard 
            key={`${suggestion.word}-${index}`} 
            suggestion={suggestion}
            animationDelay={index}
          />
        ))}
      </div>
    </div>
  );
};

interface WordCardProps {
  suggestion: WordSuggestion;
  animationDelay: number;
}

const WordCard: React.FC<WordCardProps> = ({ suggestion, animationDelay }) => {
  const definition = suggestion.defs && suggestion.defs[0] ? 
    suggestion.defs[0].replace(/\t/g, ': ') : 
    'No definition available';

  return (
    <div 
      className="flex animate-fadeIn flex-col justify-between rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-gray-800 dark:hover:bg-gray-750"
      style={{ animationDelay: `${animationDelay * 50}ms` }}
    >
      <div>
        <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
          {suggestion.word}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {definition.length > 100 ? definition.substring(0, 100) + '...' : definition}
        </p>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {suggestion.tags?.slice(0, 3).map((tag, i) => (
          <span 
            key={i} 
            className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          >
            {formatTag(tag)}
          </span>
        ))}
      </div>
    </div>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="mt-6 flex w-full flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
    <p className="text-gray-600 dark:text-gray-400">{message}</p>
  </div>
);

const LoadingState: React.FC = () => (
  <div className="mt-6 w-full">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-1 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-1 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-4 h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex gap-2">
            <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Helper functions
function getResultsTitle(searchType: string, query: string): string {
  const searchTypeMap: Record<string, string> = {
    ml: `Synonyms for "${query}"`,
    rel_rhy: `Words that rhyme with "${query}"`,
    sl: `Words that sound like "${query}"`,
    rel_spc: `Words related to "${query}"`,
    rel_jjb: `Descriptive words for "${query}"`,
    rel_jja: `Nouns related to "${query}"`
  };
  
  return searchTypeMap[searchType] || `Results for "${query}"`;
}

function formatTag(tag: string): string {
  const tagMap: Record<string, string> = {
    n: 'noun',
    v: 'verb',
    adj: 'adjective',
    adv: 'adverb',
    syn: 'synonym',
    ant: 'antonym',
    u: 'common',
    f: 'frequent'
  };
  
  return tagMap[tag] || tag;
}