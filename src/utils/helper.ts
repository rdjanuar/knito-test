export const log = (...args: any) => {
  if (typeof window !== "undefined") {
    console.log(...args);
  }
};
