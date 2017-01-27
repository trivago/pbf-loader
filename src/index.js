'use strict';

var schema = require('protocol-buffers-schema');
var compile = require('pbf/compile').raw;

module.exports = function(content) {
    this.cacheable();

    var proto = schema.parse(Buffer.from(content));
    var code = compile(proto) + '\n';
    
    return '/* ' + content + ' */\n' + code;
}
