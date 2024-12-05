import linter from '@lakyjs/eslint-config/nestjs';

export default linter({
  typescript: true,
  yaml: true,
  rules: {
    'unused-imports/no-unused-imports': 2
  },
  ignores: [
    '**/dist/**',
    'prisma/**/*',
    'public',
  ],
});
