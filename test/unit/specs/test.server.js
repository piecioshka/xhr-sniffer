'use strict';

const nFetch = require('node-fetch');

const sniffer = require('../../../src/server');

function delay(time) {
    return () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), time);
        });
    };
}

describe('xhr-sniffer', () => {
    const REQUEST_DELAY = 400;
    let logger;

    beforeAll(() => {
        logger = spyOn(console, 'log');
    });

    beforeEach(() => {
        sniffer.uninstall();
    });

    afterEach(() => {
        logger.calls.reset();
    });

    it('should execute console.log', (done) => {


        Promise.resolve()
            .then(() => {
                return nFetch('https://example.org/first');
            })
            .then(delay(REQUEST_DELAY))
            .then(() => {
                const count = logger.calls.count();
                expect(count).toEqual(0);
            })
            .then(() => {
                sniffer.install();
            })
            .then(() => {
                return nFetch('https://example.org/second');
            })
            .then(delay(REQUEST_DELAY))
            .then(() => {
                const count = logger.calls.count();
                expect(count).toEqual(1);
                done();
            })
            .catch((err) => {
                console.error(err);
                done.fail(err.message);
            });
    });

    it('should returns Date in console.log', (done) => {
        const year = new Date().getFullYear();

        Promise.resolve()
            .then(() => {
                sniffer.install();
            })
            .then(() => {
                return nFetch('https://example.org/third');
            })
            .then(delay(REQUEST_DELAY))
            .then(() => {
                const value = logger.calls.argsFor(0)[0];
                expect(value).toMatch(new RegExp(`${year}`, 'i'));
                done();
            })
            .catch((err) => {
                console.error(err);
                done.fail(err.message);
            });
    });
});
