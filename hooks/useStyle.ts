import { StyleSheet } from 'react-native';
import { Colors, Theme } from '@/constants/theme';

export const useTheme = () => {
  const theme: Theme = 'dark'; // 👈 Force dark theme globally
  return Colors[theme];
};

export const useStyles = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    // Layout
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 12,
      paddingTop: 8,
    },
    body: {
      flex: 1,
      backgroundColor: theme.background,
      borderRadius: 12,
    },
    rowSpaceBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
      paddingVertical: 8,
    },

    // Text
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.text,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    viewAll: {
      fontSize: 14,
      color: theme.primary,
    },
    symbol: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.secondaryText,
      marginBottom: 2,
    },
    price: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
    },
    changePositive: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.success,
    },
    changeNegative: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.danger,
    },
    textMuted: {
      fontSize: 12,
      color: theme.secondaryText,
    },

    // Card
    card: {
      flex: 1,
      padding: 16,
      borderRadius: 16,
      backgroundColor: theme.card,
      margin: 8,
      alignItems: 'flex-start',
      justifyContent: 'center',
      minWidth: 160,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.12,
      shadowRadius: 3,
      elevation: 4,
      borderWidth: 1,
      borderColor: theme.border,
      gap: 4,
    },
paginationContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  gap: 16,
},
arrowButton: {
  padding: 10,
  borderRadius: 8,
  backgroundColor: theme.card,
  borderWidth: 1,
  borderColor: theme.border,
},
disabledButton: {
  opacity: 0.4,
},
pageBox: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: theme.card,
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderWidth: 1,
  borderColor: theme.border,
},
pageNumber: {
  fontSize: 16,
  fontWeight: '600',
  color: theme.text,
},
divider: {
  fontSize: 16,
  color: theme.secondaryText,
  marginHorizontal: 4,
},
pageTotal: {
  fontSize: 16,
  color: theme.secondaryText,
},
modalContainer: {
  flex: 1,
  paddingHorizontal: 20,
  paddingTop: 24,
},
modalHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: theme.text,
  marginLeft: 12,
  flexShrink: 1,
},
backButton: {
  padding: 4,
},

// Edit Watchlist Row
editStockRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderColor: theme.border,
},
editStockText: {
  fontSize: 16,
  color: theme.text,
},
editWacthlistModalContainer: {
  padding: 24,
  borderRadius: 12,
  backgroundColor: theme.card,
  elevation: 5,
},
editWacthlistModalmodalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 12,
  color: theme.text,
},
modalMessage: {
  fontSize: 15,
  color: theme.secondaryText,
  marginBottom: 24,
},
modalButtonRow: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: 16,
},
modalButtonText: {
  fontSize: 16,
  fontWeight: '600',
},
alertContainer: {
  backgroundColor: theme.card,
  paddingHorizontal: 20,
  paddingVertical: 14,
  margin: 16,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 6,
},

alertText: {
  color: theme.text,
  fontSize: 15,
  textAlign: 'center',
},

  });

  return { styles, theme };
};
