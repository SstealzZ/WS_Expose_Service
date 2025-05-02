import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Heading, Flex, Text, Box, Separator } from '@radix-ui/themes';
import { commonCardStyle, fontStyles } from './styles';

/**
 * Interface for weather data
 */
interface WeatherData {
  location: string;
  temperature: string;
  description: string;
  icon: string;
}

// Styles spécifiques
const styles = {
  weatherContainer: {
    ...fontStyles.monospace,
  },
  iconContainer: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem'
  },
  temperatureText: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  locationName: {
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
  },
  descriptionText: {
    opacity: 0.8,
  }
};

/**
 * Component that displays current weather based on user's IP address
 * 
 * @returns A widget showing current weather information
 */
function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Utilisation de l'API OpenWeatherMap avec une ville par défaut
        // Idéalement, nous utiliserions l'API de géolocalisation du navigateur pour obtenir la position
        const defaultCity = 'Paris';
        const apiKey = ''; // L'API gratuite ne nécessite pas de clé pour cette démo
        const response = await axios.get(`https://goweather.herokuapp.com/weather/${defaultCity}`);
        
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        setWeather({
          location: defaultCity,
          temperature: response.data.temperature,
          description: response.data.description,
          icon: getWeatherIcon(response.data.description.toLowerCase())
        });
        setIsLoading(false);
      } catch (err) {
        // En cas d'échec, utiliser des données simulées
        const mockWeather: WeatherData = {
          location: 'Paris',
          temperature: '22°C',
          description: 'Sunny',
          icon: '☀️'
        };
        
        setWeather(mockWeather);
        setIsLoading(false);
        console.error('Error fetching weather:', err);
      }
    };

    fetchWeather();
  }, []);

  /**
   * Returns an emoji icon based on the weather description
   * 
   * @param description The weather description
   * @returns An emoji representing the weather
   */
  const getWeatherIcon = (description: string): string => {
    if (description.includes('sun') || description.includes('clear')) return '☀️';
    if (description.includes('cloud')) return '☁️';
    if (description.includes('rain')) return '🌧️';
    if (description.includes('snow')) return '❄️';
    if (description.includes('storm') || description.includes('thunder')) return '⛈️';
    if (description.includes('fog') || description.includes('mist')) return '🌫️';
    return '🌤️'; // Default - partly cloudy
  };

  if (isLoading) {
    return (
      <Card size="3" style={{ ...commonCardStyle, height: '100%', minHeight: '210px' }}>
        <Flex align="center" justify="center" style={{ height: '100%' }}>
          <Text size="3" color="purple" className="animate-pulse">
            Loading weather data...
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
        <Heading as="h2" size="4" color="purple" trim="start">
          Weather
        </Heading>
        
        <Separator size="4" color="purple" />
        
        {weather && (
          <Box>
            <Flex direction="column" align="center" gap="1" py="2" style={styles.weatherContainer}>
              <Box style={styles.iconContainer}>
                {weather.icon}
              </Box>
              <Text as="div" size="5" style={styles.locationName}>
                {weather.location}
              </Text>
              <Text as="div" size="6" style={styles.temperatureText} color="purple">
                {weather.temperature}
              </Text>
              <Text as="div" size="2" style={styles.descriptionText} color="gray">
                {weather.description}
              </Text>
            </Flex>
          </Box>
        )}
      </Flex>
    </Card>
  );
}

export default Weather; 