import { useState, useEffect } from 'react';
import { Card, Heading, Flex, Text, Box, Separator, Button } from '@radix-ui/themes';
import { commonCardStyle, fontStyles } from './styles';

// Styles spécifiques
const styles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: '0.375rem',
    position: 'relative' as const,
    height: '220px',
    marginTop: '0.5rem'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  }
};

/**
 * Component that displays a random tech/startup image from Unsplash
 * 
 * @returns A widget showing a random tech-themed image
 */
function UnsplashImage() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRandomImage();
  }, []);

  /**
   * Loads a random image from Unsplash
   */
  const loadRandomImage = () => {
    setIsLoading(true);
    // Create a timestamp to prevent caching
    const timestamp = new Date().getTime();
    // Create Unsplash source URL with tech/startup tags and timestamp
    const url = `https://source.unsplash.com/800x600/?startup,technology,office&${timestamp}`;
    
    // Create new image to preload
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      setImageUrl(url);
      setIsLoading(false);
    };
    img.onerror = () => {
      // En cas d'erreur, utiliser une image par défaut
      setImageUrl('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxhbGx8fHx8fHx8fHwxNjE0MDc1OTMw&ixlib=rb-1.2.1&q=80&w=800');
      setIsLoading(false);
    };
  };

  const refreshImage = () => {
    loadRandomImage();
  };

  return (
    <Card size="3" style={commonCardStyle}>
      <Flex direction="column" gap="2">
        <Box style={styles.headerContainer}>
          <Heading as="h2" size="4" color="indigo" trim="start">
            Tech Inspiration
          </Heading>
          
          <Button 
            size="1" 
            color="indigo" 
            variant="soft" 
            onClick={refreshImage}
          >
            Refresh
          </Button>
        </Box>
        
        <Separator size="4" color="indigo" />
        
        <Box style={styles.imageContainer}>
          {isLoading ? (
            <Flex align="center" justify="center" style={{ height: '100%', backgroundColor: '#131b2c' }}>
              <Text size="3" color="indigo" className="animate-pulse">
                Loading image...
              </Text>
            </Flex>
          ) : (
            <img 
              src={imageUrl} 
              alt="Tech & Startup Inspiration" 
              style={styles.image}
            />
          )}
        </Box>
      </Flex>
    </Card>
  );
}

export default UnsplashImage; 