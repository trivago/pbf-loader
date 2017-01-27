const protoloader =  require('../src');

/**
 * Mocking webpack loader to compile content of .proto file
 */
function Loader() {
    this.cacheable = () => undefined;
}

// assigning protoloader as property of the Loader object
Object.assign(Loader.prototype, {
    protoloader
});

function compile(content) {
    const l = new Loader();
    return l.protoloader(content);
}

describe('protobuf-loader', () => {
    it('should load compiled .proto file', () => {
        const proto = `
        syntax = "proto2";

        message test {
            message item {
                required int32 id = 1;
                required string name = 4;
            }

            repeated item item = 1;
            required int32 state = 2;
        }
        `;
        
        expect(compile(proto)).toMatchSnapshot();
    });


});