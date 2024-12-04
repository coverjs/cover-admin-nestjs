import linter from '@lakyjs/eslint-config/nestjs';

export default linter({
  typescript: true,
  yaml: true,
  ignores: [
    '**/dist/**',
    'prisma/**/*',
    'public',
  ],
});
