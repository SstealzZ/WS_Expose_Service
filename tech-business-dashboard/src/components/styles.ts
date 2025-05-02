/**
 * Common styles for dashboard components
 */

// Couleurs communes pour l'application
export const colors = {
  background: '#0f172a',       // Fond principal
  backgroundCard: '#0f172a',   // Fond des cartes
  border: '#1e293b',           // Bordures
  text: '#e2e8f0',             // Texte principal
  lightText: '#94a3b8',        // Texte secondaire
}

export const commonCardStyle = {
  backgroundColor: colors.backgroundCard,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: colors.border,
  borderRadius: '8px',
  overflow: 'hidden'
};

// Style pour les états de chargement
export const loadingContainerStyle = {
  height: '100%',
  minHeight: '210px',
  backgroundColor: colors.backgroundCard,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export const fontStyles = {
  monospace: {
    fontFamily: '"JetBrains Mono", monospace',
  }
}; 