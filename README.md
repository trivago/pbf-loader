Webpack loader for .proto files
===============================

> [!CAUTION]
> This repository has been archived as of October 2025.  
> If you wish to update or extend this project, please create a fork.

- to be used along with [mapbox/pbf](https://github.com/mapbox/pbf)
- uses [protocol-buffers-schema](https://github.com/mafintosh/protocol-buffers-schema) as schema parser
- returns a compiled module ready to be used when you `require('./file.proto')`

Installation
------------
```sh
npm install pbf-loader
```

Usage
------

see [example](./example/) for sample implementation.


Given your ```webpack.config.js``` like this:
```javascript
module.exports = {
    module: {
        loaders: [
            {
                test: /\.proto$/,
                loader: "pbf-loader"
            }
        ]
    }
}
```

Instead of: 
```javascript
const Pbf = require('pbf'); 
const compile = require('pbf/compile');
const fs = require('fs');
const schema = require('protocol-buffers-schema');

const data = 'somestring';
const proto = schema.parse(fs.readFileSync('./test.proto'));
const test = compile(proto).test; // assuming message definition: message test {}
```

using this webpack loader, simply require your .proto file like this:
```javascript
const proto = require('./index.proto');
const Pbf = require('pbf');

const data = "somestring"; // data that you want to write;

const schema = proto.test; // accessing the message definition
const pbf = new Pbf();

// now you can write data to your pbf with pbf.writeMessage etc.
pbf.writeString(data);
const buffer = pbf.finish();
// now you can read back your message using schema.read(new Pbf(buffer))
```
You can refer to [index.proto](./example/index.proto) for how the .proto file looks like.

Test
----
Assuming you already did `npm install`, you can:
```sh
npm test
```

## License
This project is released under the terms of the [Apache 2.0 license](http://www.apache.org/licenses/LICENSE-2.0).
