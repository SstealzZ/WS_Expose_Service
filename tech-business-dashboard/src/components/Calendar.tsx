import { useState, useEffect } from 'react';
import { Card, Heading, Flex, Text, Box, Separator, Grid } from '@radix-ui/themes';
import { commonCardStyle, fontStyles } from './styles';

// Styles spécifiques
const styles = {
  calendarContainer: {
    ...fontStyles.monospace,
  },
  monthHeader: {
    textAlign: 'center' as const,
    marginBottom: '0.75rem'
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px',
    textAlign: 'center' as const
  },
  dayName: {
    fontSize: '0.75rem',
    color: '#64748b',
    padding: '0.25rem'
  },
  dayCell: {
    fontSize: '0.875rem',
    padding: '0.25rem',
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto'
  },
  today: {
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    borderRadius: '9999px',
    color: '#f97316'
  },
  empty: {
    color: '#475569'
  },
  normalDay: {
    color: '#cbd5e1'
  }
};

/**
 * Helper function to get days in month
 * 
 * @param year The year
 * @param month The month (0-11)
 * @returns Number of days in the specified month
 */
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Helper function to get day of week for first day of month
 * 
 * @param year The year
 * @param month The month (0-11)
 * @returns Day of week (0-6, where 0 is Sunday)
 */
const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

/**
 * Component that displays a minimal calendar for the current month
 * 
 * @returns A widget showing a calendar for the current month
 */
function Calendar() {
  const [currentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<Array<Array<number | null>>>([]);
  
  useEffect(() => {
    generateCalendarData();
  }, []);
  
  /**
   * Generates the calendar data for the current month
   */
  const generateCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = currentDate.getDate();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const calendar: Array<Array<number | null>> = [];
    let week: Array<number | null> = Array(7).fill(null);
    let dayCounter = 1;
    
    // Fill first week with empty days until first day of month
    for (let i = firstDayOfMonth; i < 7; i++) {
      week[i] = dayCounter++;
    }
    calendar.push(week);
    
    // Fill remaining weeks
    while (dayCounter <= daysInMonth) {
      week = Array(7).fill(null);
      for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
        week[i] = dayCounter++;
      }
      calendar.push(week);
    }
    
    setCalendarData(calendar);
  };
  
  /**
   * Returns the month name
   * 
   * @param date The date containing the month to format
   * @returns The month name
   */
  const getMonthName = (date: Date): string => {
    return date.toLocaleString('fr-FR', { month: 'long' });
  };

  /**
   * Get style for a day cell based on whether it's today, null, or a regular day
   * 
   * @param day The day number or null
   * @returns The appropriate style object
   */
  const getDayStyle = (day: number | null): React.CSSProperties => {
    if (day === null) {
      return { ...styles.dayCell, ...styles.empty };
    }
    if (day === currentDate.getDate()) {
      return { ...styles.dayCell, ...styles.today };
    }
    return { ...styles.dayCell, ...styles.normalDay };
  };

  return (
    <Card size="3" style={commonCardStyle}>
      <Flex direction="column" gap="3">
        <Heading as="h2" size="4" color="orange" trim="start">
          Calendar
        </Heading>
        
        <Separator size="4" color="orange" />
        
        <Box style={styles.calendarContainer}>
          <Text as="div" size="3" color="orange" weight="medium" align="center" mb="2">
            {getMonthName(currentDate)} {currentDate.getFullYear()}
          </Text>
          
          <div style={styles.calendarGrid}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={`day-${index}`} style={styles.dayName}>{day}</div>
            ))}
            
            {calendarData.map((week, weekIndex) => (
              week.map((day, dayIndex) => (
                <div 
                  key={`week-${weekIndex}-day-${dayIndex}`} 
                  style={getDayStyle(day)}
                >
                  {day !== null ? day : ''}
                </div>
              ))
            ))}
          </div>
        </Box>
      </Flex>
    </Card>
  );
}

export default Calendar; 