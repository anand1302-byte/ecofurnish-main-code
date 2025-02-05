/*
---------------------------------------
    : Custom - Session Timeout js :
---------------------------------------
*/
"use strict";
$(document).ready(function() {     
    $.sessionTimeout({
        message: 'Your session will be locked in one minute.',
        keepAliveUrl: 'advanced-ui-kits-session-timeout.html',
        logoutUrl: '/login',
        redirUrl: '/login',
        warnAfter: 3000,
        redirAfter: 35000,
        ignoreUserActivity: true,
        countdownMessage: 'Redirecting in {timer} seconds.',
        countdownBar: true
    });
});