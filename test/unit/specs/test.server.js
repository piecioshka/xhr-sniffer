'use strict';

require('jasmine');

const nock = require('nock');
const nFetch = require('node-fetch').default;

const sniffer = require('../../../src/server');

nock('https://example.org/')
    .get('/first').reply(200, '1')
    .get('/second').reply(200, '2')
    .get('/third').reply(200, '3')

function delay(time) {
    return () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), time);
        });
    };
}

describe('xhr-sniffer', () => {
    const REQUEST_DELAY = 200;

    it('should execute console.log', (done) => {

        const logger = spyOn(global.console, 'log');

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
                sniffer.uninstall();
                done();
            })
            .catch((err) => {
                sniffer.uninstall();
                console.error(err);
                done.fail(err.message);
            });
    });

    it('should returns Date in console.log', (done) => {

        const logger = spyOn(console, 'log');
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
                sniffer.uninstall();
                done();
            })
            .catch((err) => {
                sniffer.uninstall();
                console.error(err);
                done.fail(err.message);
            });
    });
});
