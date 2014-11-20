#!/usr/bin/env node
//var debug = require('debug')('basic');
var app = require('../server');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
