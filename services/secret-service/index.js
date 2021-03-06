const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const logger = require('@basaas/node-logger');

const Server = require('@openintegrationhub/secret-service');
const { EventBus } = require('@openintegrationhub/event-bus');
const conf = require('@openintegrationhub/secret-service/src/conf');

const log = logger.getLogger(`${conf.log.namespace}/main`);

function exitHandler(options, err) {
    let status = 0;
    if (err) {
        status = 1;
        log.error(`Error ${err}`);
    }
    log.info('Perform exit');
    process.exit(status);
}

process.on('SIGINT', exitHandler.bind(null));

(async () => {
    try {
        // configuring the EventBus
        const eventBus = new EventBus({
            serviceName: conf.name,
            rabbitmqUri: process.env.RABBITMQ_URI,
        });

        const server = new Server({
            adapter: {
                key: require('@openintegrationhub/secret-service/src/adapter/key/global'),
                preprocessor: {
                    microsoft: require('@openintegrationhub/secret-service/src/adapter/preprocessor/microsoft'),
                },
            },
            eventBus,
        });

        await server.start();
        log.info(`Listening on port ${conf.port}`);
        log.info(`Introspect type ${conf.iam.introspectType}`);
    } catch (err) {
        exitHandler(null, err);
    }
})();
