/* eslint-disable @typescript-eslint/no-explicit-any */

export const isValidDate = (d: any) => {
  return d instanceof Date && !isNaN(d as any);
};
