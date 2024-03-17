import test from 'ava';
import { ClientOptions } from "@elastic/elasticsearch";

test('it should true when ES is setup successfully', t => {
    class esSuccessClientMock {
        options: ClientOptions;

        constructor(newOptions: ClientOptions) {
            this.options = newOptions;
        }
        ping() {
            return true;
        }
    }
    const options = {node: 'http://localhost:9200', maxRetries: 2};
    const client = new esSuccessClientMock(options);
    t.true(client.ping());
});

test('it should return an error if ES connextion failed', t => {
    class esFailedClientMock {
        ping() {
            throw new Error(`Error`);
        }
    }
    const client = new esFailedClientMock();
    t.throws(() => client.ping());
});