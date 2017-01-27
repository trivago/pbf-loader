var proto = require('./index.proto');
var Pbf = require('pbf');

var data = {
    state: 1,
    items: [
        {
            id : 1,
            name: 'Super-freaking awesome Hotel',
        },
        {
            id : 2,
            name: 'Yada Yada',
        }
    ]
};

var schema = proto.test;
var pbf = new Pbf();

// write dummy data to the Pbf() object
writeData(data, pbf);
var buffer = pbf.finish();

/**
 * Helper functions to write to the Pbf() object
 */
function writeData(data, pbf) {
    for (var i=0;i<data.items.length; i++) {
        pbf.writeMessage(1, writeItem, data.items[i]);
    }
    pbf.writeVarintField(2, data.state);
}

function writeItem (item, pbf) {
    pbf.writeVarintField(1, item.id);
    pbf.writeStringField(2, item.name);
}

// read from the buffer
var utfBuffer = Buffer.from(buffer);
var content = new Pbf(utfBuffer);
var obj = schema.read(content);

console.log("Data that has been read back from buffer: ", obj);
