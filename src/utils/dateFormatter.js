/**
 * Format the current date
 * @param {string} format - Optional format string
 * @return {string} Formatted date string
 */
export const formatCurrentDate = (format = 'long') => {
  const now = new Date();
  
  if (format === 'long') {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return now.toLocaleDateString(undefined, options);
  }
  
  if (format === 'short') {
    const options = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return now.toLocaleDateString(undefined, options);
  }
  
  return now.toLocaleDateString();
};
