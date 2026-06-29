import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['test/unit/specs/**/test.*.js'],
        environment: 'node'
    }
});
