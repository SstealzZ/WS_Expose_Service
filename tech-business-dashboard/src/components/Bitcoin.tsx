import { useState, useEffect } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Card, Heading, Flex, Text, Box, Separator, Badge } from '@radix-ui/themes';
import { commonCardStyle, fontStyles } from './styles';

/**
 * Interface for Bitcoin price data from the API
 */
interface BitcoinData {
  bpi: {
    USD: {
      rate: string;
      rate_float: number;
    };
    EUR: {
      rate: string;
      rate_float: number;
    };
  };
  time: {
    updated: string;
  };
}

// Styles spécifiques pour les éléments personnalisés
const styles = {
  valueContainer: {
    ...fontStyles.monospace,
  },
  currencyLabel: {
    ...fontStyles.monospace,
    width: '48px',
    textAlign: 'left' as const,
  },
  priceValue: {
    ...fontStyles.monospace,
    fontWeight: 'bold',
    fontSize: '22px',
  },
  updatedText: {
    fontSize: '11px',
    opacity: 0.7,
    textAlign: 'right' as const,
    marginTop: '8px',
    ...fontStyles.monospace,
  }
};

/**
 * Component that displays the current Bitcoin price
 * 
 * @returns A widget showing current BTC prices in USD and EUR
 */
function Bitcoin() {
  const [bitcoinData, setBitcoinData] = useState<BitcoinData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        // Utilisation d'un proxy CORS pour éviter les problèmes d'accès
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur&include_last_updated_at=true');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        
        // Convertir les données de CoinGecko au format attendu par notre interface
        const formattedData: BitcoinData = {
          bpi: {
            USD: {
              rate: data.bitcoin.usd.toLocaleString(),
              rate_float: data.bitcoin.usd
            },
            EUR: {
              rate: data.bitcoin.eur.toLocaleString(),
              rate_float: data.bitcoin.eur
            }
          },
          time: {
            updated: new Date(data.bitcoin.last_updated_at * 1000).toUTCString()
          }
        };
        
        setBitcoinData(formattedData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch Bitcoin price');
        setIsLoading(false);
        console.error('Error fetching Bitcoin price:', err);
      }
    };

    fetchBitcoinPrice();
    const intervalId = setInterval(fetchBitcoinPrice, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <Card size="3" style={{ ...commonCardStyle, height: '100%', minHeight: '210px' }}>
        <Flex align="center" justify="center" style={{ height: '100%' }}>
          <Text size="3" color="blue" className="animate-pulse">
            Loading Bitcoin data...
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
        <Heading as="h2" size="4" color="blue" trim="start">
          Bitcoin Price
        </Heading>
        
        <Separator size="4" color="blue" />
        
        {bitcoinData && (
          <Box style={styles.valueContainer}>
            <Tooltip.Provider>
              <Flex justify="between" align="center" mb="2">
                <Text size="2" style={styles.currencyLabel}>USD</Text>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Text style={styles.priceValue}>
                      ${bitcoinData.bpi.USD.rate}
                    </Text>
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <Badge color="blue" variant="soft">
                      Live BTC price in USD
                    </Badge>
                  </Tooltip.Content>
                </Tooltip.Root>
              </Flex>
            
              <Flex justify="between" align="center">
                <Text size="2" style={styles.currencyLabel}>EUR</Text>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Text style={styles.priceValue}>
                      €{bitcoinData.bpi.EUR.rate}
                    </Text>
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <Badge color="blue" variant="soft">
                      Live BTC price in EUR
                    </Badge>
                  </Tooltip.Content>
                </Tooltip.Root>
              </Flex>
            </Tooltip.Provider>
            
            <Text style={styles.updatedText}>
              Updated: {bitcoinData.time.updated}
            </Text>
          </Box>
        )}
      </Flex>
    </Card>
  );
}

export default Bitcoin; 