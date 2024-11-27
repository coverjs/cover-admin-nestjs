export const isDev = () => {
  return process.env.NODE_ENV === 'development';
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
