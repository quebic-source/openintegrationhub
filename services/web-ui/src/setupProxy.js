const proxy = require('http-proxy-middleware');
const conf = require('../server/conf');

const ORIGIN = 'https://web-ui.openintegrationhub.com';

// eslint-disable-next-line func-names
module.exports = function (app) {
    app.use(proxy('/iam-api', {
        pathRewrite: { '^/iam-api': '/' },
        target: 'http://34.120.69.157',
        changeOrigin: true,
        onProxyReq(proxyReq) {
            // add custom header to request
            proxyReq.setHeader('Origin', ORIGIN);
            proxyReq.setHeader('Host', 'iam.openintegrationhub.com');
            // or log the req
            console.log('on-proxy');
        },
    }));

    app.use(proxy('/flow-api', {
        pathRewrite: { '^/flow-api': '/' },
        target: conf.endpoints.flow,
        changeOrigin: true,
        onProxyReq(proxyReq) {
            // add custom header to request
            proxyReq.setHeader('Origin', ORIGIN);
            // or log the req
        },
    }));

    app.use(proxy('/app-directory-api', {
        pathRewrite: { '^/app-directory-api': '/' },
        target: conf.endpoints.appDirectory,
        changeOrigin: true,
        onProxyReq(proxyReq) {
            // add custom header to request
            proxyReq.setHeader('Origin', ORIGIN);
            // or log the req
        },
    }));

    app.use(proxy('/dispatcher-api', {
        pathRewrite: { '^/dispatcher-api': '/' },
        target: conf.endpoints.dispatcher,
        changeOrigin: true,
        onProxyReq(proxyReq) {
            // add custom header to request
            proxyReq.setHeader('Origin', ORIGIN);
            // or log the req
        },
    }));

    app.use(proxy('/component-api', {
        pathRewrite: { '^/component-api': '/' },
        target: conf.endpoints.component,
        changeOrigin: true,
        onProxyReq(proxyReq) {
            // add custom header to request
            proxyReq.setHeader('Origin', ORIGIN);
            // or log the req
        },
    }));
    app.use(proxy('/metadata-api', {
        pathRewrite: { '^/metadata-api': '/' },
        changeOrigin: true,
        target: conf.endpoints.metadata,
        onProxyReq(proxyReq) {
            // add custom header to request
            proxyReq.setHeader('Origin', ORIGIN);
            // or log the req
        },
    }));

    app.use(proxy('/secrets-api', {
        pathRewrite: { '^/secrets-api': '/' },
        target: conf.endpoints.secrets,
        changeOrigin: true,
        onProxyReq(proxyReq) {
            // add custom header to request
            proxyReq.setHeader('Origin', ORIGIN);
            // or log the req
        },
    }));

    app.use(proxy('/webhooks', {
        pathRewrite: { '^/webhooks': '/' },
        target: conf.endpoints.webhooks,
        changeOrigin: true,
        onProxyReq(proxyReq) {
            // add custom header to request
            proxyReq.setHeader('Origin', ORIGIN);
            // or log the req
        },
    }));
    // proxy server config
    app.use('/config', (req, res) => {
        res.send(conf);
    });
};
