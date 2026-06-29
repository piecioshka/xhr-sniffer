import { describe, it, expect, vi } from 'vitest';

import nock from 'nock';
import nodeFetch from 'node-fetch';

import sniffer from './server.js';

const nFetch = nodeFetch.default || nodeFetch;

nock('https://example.org/')
    .get('/first')
    .reply(200, '1')
    .get('/second')
    .reply(200, '2')
    .get('/third')
    .reply(200, '3');

function delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), time);
    });
}

describe('xhr-sniffer', () => {
    const REQUEST_DELAY = 200;

    it('should execute console.log', async () => {
        const logger = vi
            .spyOn(global.console, 'log')
            .mockImplementation(() => {});

        try {
            await nFetch('https://example.org/first');
            await delay(REQUEST_DELAY);
            expect(logger).toHaveBeenCalledTimes(0);

            sniffer.install();
            await nFetch('https://example.org/second');
            await delay(REQUEST_DELAY);
            expect(logger).toHaveBeenCalledTimes(1);
        } finally {
            sniffer.uninstall();
            logger.mockRestore();
        }
    });

    it('should returns Date in console.log', async () => {
        const logger = vi
            .spyOn(global.console, 'log')
            .mockImplementation(() => {});
        const year = new Date().getFullYear();

        try {
            sniffer.install();
            await nFetch('https://example.org/third');
            await delay(REQUEST_DELAY);

            const value = logger.mock.calls[0][0];
            expect(value).toMatch(new RegExp(`${year}`, 'i'));
        } finally {
            sniffer.uninstall();
            logger.mockRestore();
        }
    });
});
