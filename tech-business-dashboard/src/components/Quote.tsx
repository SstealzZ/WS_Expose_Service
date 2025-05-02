import { useState, useEffect } from 'react';
import { Card, Heading, Flex, Text, Box, Separator, Quote as RadixQuote } from '@radix-ui/themes';
import { commonCardStyle, fontStyles } from './styles';

/**
 * Interface for quote data from API
 */
interface QuoteData {
  content: string;
  author: string;
  tags: string[];
}

// Styles spécifiques
const styles = {
  quoteText: {
    ...fontStyles.monospace,
    fontStyle: 'italic',
    lineHeight: '1.5',
  },
  author: {
    ...fontStyles.monospace,
    opacity: 0.8,
  }
};

/**
 * Component that displays a random startup or business related quote
 * 
 * @returns A widget showing an inspirational quote
 */
function Quote() {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        // Utiliser l'API Quotable avec le tag technology pour des citations tech
        const response = await fetch('https://api.quotable.io/random?tags=technology,business,success');
        if (!response.ok) {
          // Si l'API principale échoue, utiliser une citation par défaut
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setQuoteData(data);
        setIsLoading(false);
      } catch (err) {
        // Utiliser une citation par défaut en cas d'échec
        setQuoteData({
          content: "Innovation distinguishes between a leader and a follower.",
          author: "Steve Jobs",
          tags: ["technology", "business", "innovation"]
        });
        setIsLoading(false);
        console.error('Error fetching quote:', err);
      }
    };

    fetchQuote();
  }, []);

  if (isLoading) {
    return (
      <Card size="3" style={{ ...commonCardStyle, height: '100%', minHeight: '210px' }}>
        <Flex align="center" justify="center" style={{ height: '100%' }}>
          <Text size="3" color="green" className="animate-pulse">
            Loading quote...
          </Text>
        </Flex>
      </Card>
    );
  }

  return (
    <Card size="3" style={commonCardStyle}>
      <Flex direction="column" gap="3">
        <Heading as="h2" size="4" color="green" trim="start">
          Quote of the Day
        </Heading>
        
        <Separator size="4" color="green" />
        
        {quoteData && (
          <Box py="2">
            <RadixQuote color="green">
              <Text size="3" style={styles.quoteText}>
                "{quoteData.content}"
              </Text>
              <Flex justify="end" mt="2">
                <Text size="2" style={styles.author} color="gray">
                  — {quoteData.author}
                </Text>
              </Flex>
            </RadixQuote>
          </Box>
        )}
      </Flex>
    </Card>
  );
}

export default Quote; 