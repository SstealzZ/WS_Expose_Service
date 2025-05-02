import { useState, useEffect } from 'react';
import { Card, Heading, Flex, Text, Box, Separator, Button } from '@radix-ui/themes';
import { commonCardStyle, fontStyles } from './styles';

/**
 * Interface for joke data from API
 */
interface JokeData {
  id: string;
  joke: string;
  status: number;
}

// Styles spécifiques
const styles = {
  jokeText: {
    ...fontStyles.monospace,
    textAlign: 'center' as const,
    lineHeight: '1.5',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem'
  }
};

/**
 * Component that displays a random developer joke
 * 
 * @returns A widget showing a random developer joke
 */
function DeveloperJoke() {
  const [joke, setJoke] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setJoke(data.joke);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch joke');
      setIsLoading(false);
      console.error('Error fetching joke:', err);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  if (isLoading) {
    return (
      <Card size="3" style={{ ...commonCardStyle, height: '100%', minHeight: '210px' }}>
        <Flex align="center" justify="center" style={{ height: '100%' }}>
          <Text size="3" color="pink" className="animate-pulse">
            Loading joke...
          </Text>
        </Flex>
      </Card>
    );
  }

  if (error) {
    return (
      <Card size="3" style={{ ...commonCardStyle, height: '100%', minHeight: '210px', backgroundColor: 'rgba(185, 28, 28, 0.1)' }}>
        <Flex align="center" justify="center" style={{ height: '100%' }}>
          <Text size="3" color="red">
            {error}
          </Text>
        </Flex>
      </Card>
    );
  }

  return (
    <Card size="3" style={commonCardStyle}>
      <Flex direction="column" gap="3">
        <Heading as="h2" size="4" color="pink" trim="start">
          Developer Joke
        </Heading>
        
        <Separator size="4" color="pink" />
        
        <Box py="2">
          <Text size="3" style={styles.jokeText}>
            {joke}
          </Text>
        </Box>
        
        <Box style={styles.buttonContainer}>
          <Button 
            size="2" 
            color="pink" 
            variant="soft" 
            onClick={fetchJoke}
          >
            Get Another Joke
          </Button>
        </Box>
      </Flex>
    </Card>
  );
}

export default DeveloperJoke; 