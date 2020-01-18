(function () {
    "use strict";

    const express = require('express'),
        router = new express.Router();

    router.use('/', require('./home'));
    router.use('/pleaseNotify', require('./please-notify'));
    router.use('/ping', require('./ping'));
    router.use('/pingForm', require('./ping-form'));
    // router.use('/viewLog', require('./view-log'));

    module.exports = router;
}());
