// @vitest-environment happy-dom

import { describe, it, expect, vi, beforeEach } from 'vitest';

// `browser.js` patches `window.XMLHttpRequest` and `window.fetch` as a side
// effect on import, so we install fakes first and import the module lazily.

class FakeXMLHttpRequest {
    constructor() {
        this.listeners = {};
        this.statusText = 'OK';
    }

    addEventListener(type, handler) {
        this.listeners[type] = handler;
    }

    open(method, url) {
        this.openArgs = [method, url];
    }

    send() {
        this.sendCalled = true;
    }

    emit(type, payload) {
        if (this.listeners[type]) {
            this.listeners[type](payload);
        }
    }
}

async function loadBrowserSniffer({ fetch } = {}) {
    window.XMLHttpRequest = FakeXMLHttpRequest;
    window.fetch = fetch || vi.fn(() => Promise.resolve({ statusText: 'OK' }));

    vi.resetModules();
    await import('./browser.js');
}

describe('browser', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    describe('XMLHttpRequest', () => {
        it('should keep the original open/send behaviour', async () => {
            await loadBrowserSniffer();

            const xhr = new window.XMLHttpRequest();
            xhr.open('GET', 'https://example.org/');
            xhr.send();

            expect(xhr.openArgs).toEqual(['GET', 'https://example.org/']);
            expect(xhr.sendCalled).toBe(true);
            expect(xhr.method).toBe('GET');
            expect(xhr.requestURL).toBe('https://example.org/');
        });

        it('should log a single line on loadend', async () => {
            const logger = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});
            await loadBrowserSniffer();

            const xhr = new window.XMLHttpRequest();
            xhr.open('GET', 'https://example.org/');
            xhr.send();
            xhr.emit('loadend');

            expect(logger).toHaveBeenCalledTimes(1);
            const line = logger.mock.calls[0][0];
            expect(line).toContain('XMLHttpRequest');
            expect(line).toContain('GET');
            expect(line).toContain('https://example.org/');
        });

        it('should forward errors to console.error', async () => {
            const errorLogger = vi
                .spyOn(console, 'error')
                .mockImplementation(() => {});
            await loadBrowserSniffer();

            const xhr = new window.XMLHttpRequest();
            xhr.open('GET', 'https://example.org/');
            xhr.send();
            const boom = new Error('boom');
            xhr.emit('error', boom);

            expect(errorLogger).toHaveBeenCalledWith(boom);
        });
    });

    describe('fetch', () => {
        it('should log the request and return the original response', async () => {
            const logger = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});
            const response = { statusText: 'OK' };
            const nativeFetch = vi.fn(() => Promise.resolve(response));
            await loadBrowserSniffer({ fetch: nativeFetch });

            const result = await window.fetch('https://example.org/api', {
                method: 'POST'
            });

            expect(result).toBe(response);
            expect(nativeFetch).toHaveBeenCalledOnce();
            expect(logger).toHaveBeenCalledTimes(1);
            const line = logger.mock.calls[0][0];
            expect(line).toContain('Fetch');
            expect(line).toContain('POST');
            expect(line).toContain('https://example.org/api');
        });

        it('should default the method to GET', async () => {
            const logger = vi
                .spyOn(console, 'log')
                .mockImplementation(() => {});
            const nativeFetch = vi.fn(() =>
                Promise.resolve({ statusText: 'OK' })
            );
            await loadBrowserSniffer({ fetch: nativeFetch });

            await window.fetch('https://example.org/');

            expect(logger.mock.calls[0][0]).toContain('GET');
        });

        it('should re-throw and log fetch failures', async () => {
            const errorLogger = vi
                .spyOn(console, 'error')
                .mockImplementation(() => {});
            const boom = new Error('network down');
            const nativeFetch = vi.fn(() => Promise.reject(boom));
            await loadBrowserSniffer({ fetch: nativeFetch });

            await expect(window.fetch('https://example.org/')).rejects.toThrow(
                'network down'
            );
            expect(errorLogger).toHaveBeenCalledWith(boom);
        });
    });
});
