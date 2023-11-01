export const currencyFormats = {
    USD: {
      symbol: '$',
      decimal: '.',
      thousands: ',',
      precision: 2,
    },
    EUR: {
      symbol: '€',
      decimal: ',',
      thousands: '.',
      precision: 2,
    },
    GBP: {
      symbol: '£',
      decimal: '.',
      thousands: ',',
      precision: 2,
    },
    JPY: {
      symbol: '¥',
      decimal: '.',
      thousands: ',',
      precision: 0, // Yen usually doesn't have decimal places
    },
    CAD: {
      symbol: 'C$',
      decimal: '.',
      thousands: ',',
      precision: 2,
    },
    INR: {
      symbol: '₹',
      decimal: '.',
      thousands: ',',
      precision: 2, // Indian Rupee typically uses 2 decimal places
    },
    // Add more currencies as needed
};
