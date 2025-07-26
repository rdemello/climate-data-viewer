export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3002';
  }
  return ''; // Let it be relative in production
};

export const fileExtension = (year:number, baseline:string) => {
  if (baseline === 'Absolute') {
    year = year - 1980; // Adjust year for absolute data
    return `PR_Absolute_YearlySum_Clipped_band_${year}`;
  } else {
    year = year - 1995; // Adjust year for change data
    return `PR_Change_YearlySum_Clipped_band_${year}`;
  }
}