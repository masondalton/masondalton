import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

// NASA API Configuration
const NASA_API_KEY =
  import.meta.env.VITE_NASA_API_KEY ||
  'M1x2YeBbegbE0iSBqePw8yihMe8kvtdEaaujb302';
const NASA_BASE_URL = 'https://api.nasa.gov';
const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/api/rest_v1';

interface NasaItem {
  id?: string;
  title: string;
  date?: string;
  explanation?: string;
  url?: string;
  hdurl?: string;
  media_type?: string;
  thumbnail_url?: string;
  [key: string]: any;
}

interface WikipediaDefinition {
  title?: string;
  extract?: string;
  url?: string;
  thumbnail?: string;
  error?: string;
}

// Client-side rate limiting
const rateLimiter = {
  nasa: { lastRequest: 0, delay: 1200 }, // 1.2 seconds between NASA requests
  wikipedia: { lastRequest: 0, delay: 500 }, // 0.5 seconds between Wikipedia requests
};

async function rateLimitedFetch(
  url: string,
  service: 'nasa' | 'wikipedia',
  timeout: number = 30000 // 30 second default timeout
): Promise<Response> {
  const limiter = rateLimiter[service];
  const now = Date.now();
  const timeSinceLastRequest = now - limiter.lastRequest;

  if (timeSinceLastRequest < limiter.delay) {
    await new Promise((resolve) =>
      setTimeout(resolve, limiter.delay - timeSinceLastRequest)
    );
  }

  limiter.lastRequest = Date.now();

  // Create an AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeout / 1000} seconds`);
    }
    throw err;
  }
}

export default function NasaExplorer() {
  const { source } = useParams<{ source: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<NasaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<NasaItem | null>(null);
  const [definitions, setDefinitions] = useState<
    Record<string, WikipediaDefinition>
  >({});

  const sources = [
    {
      id: 'apod',
      label: 'Astronomy Picture of the Day',
      fetchFn: async () => {
        const url = `${NASA_BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}&count=20`;
        const response = await rateLimitedFetch(url, 'nasa');
        if (!response.ok)
          throw new Error(`NASA API error: ${response.statusText}`);
        const data = await response.json();
        return Array.isArray(data) ? data : [data];
      },
    },
    {
      id: 'eonet',
      label: 'Earth Observatory Events',
      fetchFn: async () => {
        // EONET uses a different base URL
        const url = `https://eonet.gsfc.nasa.gov/api/v3/events?days=30&limit=20`;
        try {
          const response = await rateLimitedFetch(url, 'nasa');
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
              `EONET API error (${response.status}): ${response.statusText}. ${errorText.substring(0, 200)}`
            );
          }
          const data = await response.json();
          if (!data.events || data.events.length === 0) {
            return [
              {
                id: 'no-events',
                title: 'No events found',
                explanation:
                  'No Earth Observatory events found for the selected time period.',
              },
            ];
          }
          return (data.events || []).map((event: any) => ({
            id: event.id,
            title: event.title,
            date: event.geometry?.[0]?.date,
            explanation: event.description || event.title,
            url: event.geometry?.[0]?.coordinates
              ? `https://www.google.com/maps?q=${event.geometry[0].coordinates[1]},${event.geometry[0].coordinates[0]}`
              : '',
            thumbnail_url: event.categories?.[0]?.title || '',
            media_type: 'event',
          }));
        } catch (err) {
          // If CORS error, provide helpful message
          if (
            err instanceof TypeError &&
            err.message.includes('Failed to fetch')
          ) {
            throw new Error(
              'EONET API is not accessible from the browser due to CORS restrictions. This API requires a backend proxy.'
            );
          }
          throw err;
        }
      },
    },
  ];

  const currentSource =
    sources.find((s) => s.id === (source || 'apod')) || sources[0];

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setItems([]);
    setSelectedItem(null);
    setDefinitions({});
    try {
      const normalizedItems = await currentSource.fetchFn();
      setItems(normalizedItems);
    } catch (err) {
      let errorMessage = 'Unknown error occurred';
      if (err instanceof Error) {
        errorMessage = err.message;
        if (
          err.message.includes('CORS') ||
          err.message.includes('Failed to fetch')
        ) {
          errorMessage +=
            '\n\nNote: Some NASA APIs may not support direct browser access due to CORS restrictions. Consider using APOD which works reliably from the browser.';
        }
      }
      setError(errorMessage);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [source]);

  useEffect(() => {
    setItems([]);
    setSelectedItem(null);
    setDefinitions({});
    setError(null);
    setLoading(true);
    fetchData();
  }, [source, fetchData]);

  const extractScientificTerms = (text: string): string[] => {
    if (!text) return [];

    // Common non-scientific words to filter out
    const commonWords = new Set([
      'The',
      'This',
      'That',
      'These',
      'Those',
      'NASA',
      'Image',
      'Credit',
      'Above',
      'Below',
      'Left',
      'Right',
      'Top',
      'Bottom',
      'Here',
      'There',
      'Where',
      'When',
      'What',
      'Which',
      'Who',
      'How',
      'Why',
      'Some',
      'Many',
      'Most',
      'All',
      'Each',
      'Every',
      'Both',
      'Such',
      'Same',
      'Different',
      'Other',
      'Another',
      'Today',
      'Tomorrow',
      'Yesterday',
      'Now',
      'Then',
    ]);

    // Extract capitalized phrases (potential scientific terms)
    const capitalizedPhrases =
      text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+\b/g) || [];

    // Also extract single capitalized words that might be scientific terms
    const singleCaps = text.match(/\b[A-Z][a-z]{3,}\b/g) || [];

    // Combine and deduplicate
    const allTerms = [...new Set([...capitalizedPhrases, ...singleCaps])];

    // Filter out common words and short terms
    const scientificTerms = allTerms
      .filter((term) => {
        const words = term.split(' ');
        // Filter if all words are common words
        if (words.every((w) => commonWords.has(w))) return false;
        // Keep if at least one word is not common
        return words.some((w) => !commonWords.has(w)) && term.length > 3;
      })
      .slice(0, 15); // Limit to 15 terms

    return scientificTerms;
  };

  const fetchWikipediaDefinition = async (
    term: string
  ): Promise<WikipediaDefinition | null> => {
    try {
      // URL encode the term
      const encodedTerm = encodeURIComponent(term.replace(/\s+/g, '_'));
      const url = `${WIKIPEDIA_API_URL}/page/summary/${encodedTerm}`;

      const response = await rateLimitedFetch(url, 'wikipedia');

      if (!response.ok) {
        if (response.status === 404) {
          return { error: 'Not found' };
        }
        return null;
      }

      const data = await response.json();
      return {
        title: data.title,
        extract: data.extract || '',
        url: data.content_urls?.desktop?.page || '',
        thumbnail: data.thumbnail?.source || undefined,
      };
    } catch (err) {
      console.error(`Failed to fetch definition for ${term}:`, err);
      return null;
    }
  };

  const fetchDefinitions = async (terms: string[]) => {
    if (terms.length === 0) return;

    const results: Record<string, WikipediaDefinition> = {};

    // Fetch definitions with rate limiting
    for (const term of terms) {
      const definition = await fetchWikipediaDefinition(term);
      if (definition) {
        results[term] = definition;
      }
    }

    setDefinitions(results);
  };

  const handleItemClick = async (item: NasaItem) => {
    setSelectedItem(item);
    setDefinitions({}); // Clear previous definitions

    // Extract scientific terms and fetch definitions
    const text = `${item.title} ${item.explanation || ''}`;
    const terms = extractScientificTerms(text);
    if (terms.length > 0) {
      await fetchDefinitions(terms);
    }
  };

  const renderContentWithLinks = (text: string) => {
    if (!text) return null;

    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;

    // Find terms that have definitions and create links
    Object.keys(definitions).forEach((term) => {
      const regex = new RegExp(
        `\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
        'gi'
      );
      const matches = [...text.matchAll(regex)];

      matches.forEach((match) => {
        if (match.index !== undefined && match.index >= lastIndex) {
          // Add text before match
          if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
          }

          // Add linked term
          const def = definitions[term];
          if (def && !def.error && def.url) {
            parts.push(
              <a
                key={`${term}-${match.index}`}
                href={def.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
                title={def.extract?.substring(0, 100)}
              >
                {term}
              </a>
            );
          } else {
            parts.push(term);
          }

          lastIndex = match.index + match[0].length;
        }
      });
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 0 ? <>{parts}</> : text;
  };

  if (loading && items.length === 0) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <p className="text-muted">Loading NASA data...</p>
            {currentSource.id === 'eonet' && (
              <div className="mt-4 p-4 bg-bg border border-border rounded max-w-md mx-auto">
                <p className="text-sm text-muted">
                  ⚠️ EONET may have CORS restrictions. If this fails, try APOD
                  instead.
                </p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <div className="bg-surface border border-red-500/50 p-6 rounded-lg text-left">
              <h2 className="text-2xl font-bold text-red-500 mb-4">
                Error Loading Data
              </h2>
              <div className="text-text mb-4 whitespace-pre-line">{error}</div>

              {error.includes('CORS') && (
                <div className="mt-4 p-4 bg-bg border border-border rounded">
                  <p className="text-sm text-muted mb-2">
                    <strong>Why this happens:</strong> Some NASA APIs don't
                    allow direct browser access due to CORS (Cross-Origin
                    Resource Sharing) restrictions.
                  </p>
                  <p className="text-sm text-muted">
                    <strong>Solution:</strong> Use the APOD endpoint which works
                    reliably, or set up a backend proxy for other endpoints.
                  </p>
                </div>
              )}

              <div className="flex gap-4 justify-center mt-6">
                <button
                  onClick={() => navigate('/projects/nasa-explorer/apod')}
                  className="px-6 py-3 bg-primary text-white rounded hover:bg-primary/90 font-semibold"
                >
                  Try APOD Instead
                </button>
                <button
                  onClick={fetchData}
                  className="px-6 py-3 bg-bg border border-border text-text rounded hover:bg-surface font-semibold"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="section-header text-4xl font-bold mb-8">
          NASA Explorer
        </h1>

        {/* Source selector */}
        <div className="mb-8 border-b border-border bg-surface/50 p-4">
          <div className="flex gap-4 flex-wrap items-center">
            {sources.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate(`/projects/nasa-explorer/${s.id}`)}
                className={`px-4 py-2 text-sm transition-colors rounded ${
                  currentSource.id === s.id
                    ? 'bg-primary text-white font-semibold'
                    : 'bg-bg text-muted hover:text-primary border border-border'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">
            💡 <strong>Tip:</strong> APOD works reliably from the browser. EONET
            may have CORS restrictions.
          </p>
        </div>

        {selectedItem ? (
          /* Detail view */
          <div className="space-y-6">
            <button
              onClick={() => setSelectedItem(null)}
              className="text-primary hover:underline mb-4"
            >
              ← Back to list
            </button>

            <article className="bg-surface p-6 border-l-4 border-primary">
              <h2 className="text-3xl font-bold mb-4">{selectedItem.title}</h2>

              {selectedItem.date && (
                <p className="text-muted mb-4">
                  {new Date(selectedItem.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}

              {selectedItem.url && selectedItem.media_type === 'image' && (
                <div className="mb-6">
                  <img
                    src={selectedItem.hdurl || selectedItem.url}
                    alt={selectedItem.title}
                    className="w-full max-w-4xl mx-auto border border-border rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {selectedItem.explanation && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-text leading-relaxed text-lg">
                    {renderContentWithLinks(selectedItem.explanation)}
                  </p>
                </div>
              )}

              {/* Definitions sidebar */}
              {Object.keys(definitions).length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="text-xl font-bold mb-4">Related Terms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(definitions).map(([term, def]) => {
                      if (def.error || !def.extract) return null;
                      return (
                        <div
                          key={term}
                          className="bg-bg p-4 border border-border rounded"
                        >
                          <a
                            href={def.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-semibold"
                          >
                            {def.title || term}
                          </a>
                          <p className="text-sm text-muted mt-2 line-clamp-3">
                            {def.extract}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted mb-4">No items found.</p>
            <button
              onClick={fetchData}
              className="px-6 py-3 bg-primary text-white rounded hover:bg-primary/90 font-semibold"
            >
              Retry
            </button>
          </div>
        ) : (
          /* Grid view */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div
                key={item.id || index}
                onClick={() => handleItemClick(item)}
                className="bg-surface border border-border rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors"
              >
                {item.url && item.media_type === 'image' && (
                  <div className="aspect-video bg-bg overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Hide image if it fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                {!item.url && (
                  <div className="aspect-video bg-bg flex items-center justify-center">
                    <span className="text-muted text-sm">
                      No image available
                    </span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  {item.date && (
                    <p className="text-sm text-muted mb-2">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  )}
                  {item.explanation && (
                    <p className="text-sm text-muted line-clamp-3">
                      {item.explanation.substring(0, 150)}...
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
