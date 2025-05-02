import { useState, useEffect } from 'react';
import { Card, Heading, Flex, Text, Box, Separator } from '@radix-ui/themes';
import { commonCardStyle, fontStyles } from './styles';

// Styles spécifiques
const styles = {
  dateContainer: {
    ...fontStyles.monospace,
    textAlign: 'center' as const,
  },
  dateText: {
    ...fontStyles.monospace,
    fontSize: '1.125rem',
  },
  timeText: {
    ...fontStyles.monospace,
    fontSize: '2.5rem',
    fontWeight: 'bold',
  }
};

/**
 * Component that displays the current local date and time
 * 
 * @returns A widget showing current date and time information
 */
function DateTime() {
  const [date, setDate] = useState(new Date());
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  /**
   * Formats the date to a readable string
   * 
   * @param date The date to format
   * @returns The formatted date string
   */
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('fr-FR', options);
  };
  
  /**
   * Formats the time to a readable string with seconds
   * 
   * @param date The date containing the time to format
   * @returns The formatted time string
   */
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <Card size="3" style={commonCardStyle}>
      <Flex direction="column" gap="3">
        <Heading as="h2" size="4" color="cyan" trim="start">
          Current Date & Time
        </Heading>
        
        <Separator size="4" color="cyan" />
        
        <Box style={styles.dateContainer}>
          <Flex direction="column" align="center" gap="2" py="2">
            <Text size="2" style={styles.dateText} color="gray">
              {formatDate(date)}
            </Text>
            <Text style={styles.timeText} color="cyan">
              {formatTime(date)}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}

export default DateTime; 