import { WordSuggestion } from '../types/types';

const BASE_URL = 'https://api.datamuse.com/words';

/**
 * Fetches word suggestions from the Datamuse API based on the provided parameters
 */
export async function fetchWordSuggestions(
  query: string, 
  searchParam: string,
  maxResults: number = 20
): Promise<WordSuggestion[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const url = new URL(BASE_URL);
    url.searchParams.append(searchParam, query);
    url.searchParams.append('max', maxResults.toString());
    url.searchParams.append('md', 'dp'); // Include definitions and parts of speech

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data: WordSuggestion[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching word suggestions:', error);
    return [];
  }
}

/**
 * Generates an AI writing tip based on the current query and results
 */
export function generateAITip(query: string, results: WordSuggestion[]): string {
  if (!query.trim()) {
    return "Start typing to see word suggestions and writing tips.";
  }
  
  if (results.length === 0) {
    return `Try a different phrase or word to get better suggestions.`;
  }
  
  const tips = [
    `Consider using "${results[0]?.word}" to enhance your writing.`,
    `"${results[0]?.word}" might be a good alternative to "${query}".`,
    `Using varied vocabulary like "${results[0]?.word}" can make your writing more engaging.`,
    `For more formal writing, "${results[1]?.word}" might be appropriate.`,
    `To add clarity, try incorporating "${results[0]?.word}" in your text.`
  ];
  
  return tips[Math.floor(Math.random() * tips.length)] || 
    "Consider the suggestions to enhance your writing.";
}