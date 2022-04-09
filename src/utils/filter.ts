export const filter = (field: string, search: string, rows: any[]): any[] => {
  const filtered = rows.filter((row) =>
    row[field].toLowerCase().includes(search.toLowerCase())
  );

  return filtered;
};
