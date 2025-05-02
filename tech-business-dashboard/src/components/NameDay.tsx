import { useState, useEffect } from 'react';
import { Card, Heading, Flex, Text, Box, Separator } from '@radix-ui/themes';
import { commonCardStyle, fontStyles } from './styles';

/**
 * Interface for the name day API response
 */
interface NameDayResponse {
  name: string;
  date: string;
}

// Styles spécifiques
const styles = {
  nameContainer: {
    ...fontStyles.monospace,
    textAlign: 'center' as const,
  },
  nameDayText: {
    ...fontStyles.monospace,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  dateText: {
    ...fontStyles.monospace,
    fontSize: '0.875rem',
  }
};

/**
 * Component that displays the saint or name day for today
 * 
 * @returns A widget showing today's saint/name day
 */
function NameDay() {
  const [nameDay, setNameDay] = useState<NameDayResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation des données du saint du jour avec données hardcodées par mois/jour
    const fetchNameDayLocal = () => {
      const today = new Date();
      const month = today.getMonth() + 1; // getMonth() retourne 0-11
      const day = today.getDate();
      
      // Table simplifiée des saints du jour (limité pour cet exemple)
      const saintsCalendar: Record<string, string> = {
        "1-1": "Saint Jour de l'An",
        "1-2": "Saint Basile",
        "1-3": "Sainte Geneviève",
        "2-1": "Sainte Ella",
        "2-2": "Sainte Présentation",
        "2-3": "Saint Blaise",
        "3-1": "Saint Aubin",
        "3-2": "Saint Charles le Bon",
        "3-3": "Saint Guénolé",
        "4-1": "Saint Hugues",
        "4-2": "Saint Sandrine",
        "4-3": "Saint Richard",
        "5-1": "Saint Sylvain",
        "5-2": "Saint Boris",
        "5-3": "Sainte Judith",
        "5-8": "Saint Désiré",
        "6-1": "Saint Justin",
        "6-2": "Sainte Blandine",
        "6-3": "Saint Kévin",
        "7-1": "Saint Thierry",
        "7-2": "Saint Martinien",
        "7-3": "Saint Thomas",
        "8-1": "Saint Amour",
        "8-2": "Saint Dominique",
        "8-3": "Sainte Lydie",
        "9-1": "Saint Alain",
        "9-2": "Sainte Inès",
        "9-3": "Saint Grégoire",
        "10-1": "Saint Ghislain",
        "10-2": "Saint Léon",
        "10-3": "Saint Stanislas",
        "11-1": "Saint Martin",
        "11-2": "Saint Christian",
        "11-3": "Saint Véran",
        "12-1": "Saint Corentin",
        "12-2": "Sainte Chantal",
        "12-3": "Sainte Lucie"
        // Cette liste pourrait être complétée avec tous les jours de l'année
      };

      // Rechercher le saint pour aujourd'hui
      const key = `${month}-${day}`;
      const saintName = saintsCalendar[key] || "Saint du jour";

      // Formatage de la date
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      };
      const dateString = today.toLocaleDateString('fr-FR', options);

      setNameDay({
        name: saintName,
        date: dateString
      });
      setIsLoading(false);
    };

    // Appliquer un petit délai pour simuler le chargement
    const timer = setTimeout(() => {
      fetchNameDayLocal();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Card size="3" style={{ ...commonCardStyle, height: '100%', minHeight: '210px' }}>
        <Flex align="center" justify="center" style={{ height: '100%' }}>
          <Text size="3" color="yellow" className="animate-pulse">
            Loading name day...
          </Text>
        </Flex>
      </Card>
    );
  }

  return (
    <Card size="3" style={commonCardStyle}>
      <Flex direction="column" gap="3">
        <Heading as="h2" size="4" color="yellow" trim="start">
          Name Day
        </Heading>
        
        <Separator size="4" color="yellow" />
        
        {nameDay && (
          <Box style={styles.nameContainer}>
            <Flex direction="column" align="center" gap="1" py="2">
              <Text as="div" size="6" style={styles.nameDayText} color="yellow">
                {nameDay.name}
              </Text>
              <Text as="div" size="2" style={styles.dateText} color="gray">
                {nameDay.date}
              </Text>
            </Flex>
          </Box>
        )}
      </Flex>
    </Card>
  );
}

export default NameDay; 