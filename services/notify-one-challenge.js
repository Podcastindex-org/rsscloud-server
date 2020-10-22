(function () {
    "use strict";

    const notifyOne = require('./notify-one'),
        getRandomPassword = require('./get-random-password'),
        querystring = require('querystring'),
        request = require('request-promise-native');

    async function notifyOneChallengeRest(apiurl, resourceUrl) {
        const challenge = getRandomPassword(20),
            testUrl = apiurl + '?' + querystring.stringify({
                'url': resourceUrl,
                'challenge': challenge
            }),
            res = await request({
                uri: testUrl,
                resolveWithFullResponse: true
            });

        if (res.statusCode < 200 || res.statusCode > 299 || res.body !== challenge) {
            throw new Error('Notification Failed');
        }
    }

    function notifyOneChallenge(notifyProcedure, apiurl, protocol, resourceUrl) {
        if ('xml-rpc' === protocol) {
            // rssCloud.root originally didn't support this flow
            return notifyOne(notifyProcedure, apiurl, protocol, resourceUrl);
        }

        return notifyOneChallengeRest(apiurl, resourceUrl);
    }

    module.exports = notifyOneChallenge;
}());
