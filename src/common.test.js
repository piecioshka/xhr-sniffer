import { describe, it, expect } from 'vitest';

import { formatter } from './common.js';

describe('common', () => {
    describe('formatter', () => {
        const entry = {
            label: 'Fetch',
            method: 'GET   ',
            status: 'OK',
            url: 'https://example.org/',
            duration: 128
        };

        it('should contain every field from the entry', () => {
            const line = formatter(entry);

            expect(line).toContain('Fetch');
            expect(line).toContain('GET');
            expect(line).toContain('OK');
            expect(line).toContain('https://example.org/');
            expect(line).toContain('128ms');
        });

        it('should wrap the duration in brackets with a ms suffix', () => {
            const line = formatter(entry);

            expect(line).toContain('[128ms]');
        });

        it('should start with a timestamp wrapped in brackets', () => {
            const line = formatter(entry);

            expect(line).toMatch(
                /^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+\]/
            );
        });

        it('should put the current year in the timestamp', () => {
            const year = new Date().getFullYear();
            const line = formatter(entry);

            expect(line).toContain(`[${year}-`);
        });

        it('should keep the order: timestamp, label, method, status, url, duration', () => {
            const line = formatter(entry);

            expect(line).toMatch(
                /^\[.+\] Fetch GET\s+OK https:\/\/example\.org\/ \[128ms\]$/
            );
        });
    });
});
