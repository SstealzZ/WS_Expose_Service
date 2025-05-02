import { useState, useEffect } from 'react';
import { Theme, ThemePanel } from '@radix-ui/themes';
import * as Separator from '@radix-ui/react-separator';
import Bitcoin from './components/Bitcoin';
import Quote from './components/Quote';
import Weather from './components/Weather';
import NameDay from './components/NameDay';
import DeveloperJoke from './components/DeveloperJoke';
import DateTime from './components/DateTime';
import UnsplashImage from './components/UnsplashImage';
import Calendar from './components/Calendar';
import '@radix-ui/themes/styles.css';
import { colors } from './components/styles';

// Styles inline pour le composant App
const styles = {
  appWrapper: {
    backgroundColor: colors.background,
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
    backgroundColor: colors.background,
    color: colors.text,
    fontFamily: '"JetBrains Mono", monospace',
    minHeight: '100vh'
  },
  header: {
    marginBottom: '2rem',
    textAlign: 'center' as const
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#f8fafc'
  },
  separator: {
    width: '180px',
    height: '2px',
    margin: '0 auto',
    marginBottom: '2rem',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem',
  }
};

/**
 * Main application component that renders the Tech & Business Daily Dashboard
 * 
 * @returns The dashboard application UI
 */
function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Theme appearance="dark" accentColor="blue" grayColor="slate" radius="medium" scaling="95%">
      <div style={styles.appWrapper}>
        <div style={{
          ...styles.container,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.8s'
        }}>
          <header style={styles.header}>
            <h1 style={styles.heading}>Tech & Business Daily Dashboard</h1>
            <Separator.Root 
              style={styles.separator}
              decorative 
              className="bg-blue-600" 
            />
          </header>
          
          <main style={styles.mainGrid}>
            <Bitcoin />
            <Quote />
            <Weather />
            <NameDay />
            <DeveloperJoke />
            <DateTime />
            <UnsplashImage />
            <Calendar />
          </main>
        </div>
      </div>
    </Theme>
  );
}

export default App;
