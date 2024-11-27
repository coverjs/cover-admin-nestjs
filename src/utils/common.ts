import process from 'node:process';

export function isDev() {
  return process.env.NODE_ENV === 'development';
<<<<<<< HEAD
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
=======
}
>>>>>>> main
