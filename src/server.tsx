import path from 'path';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ChunkExtractor } from '@loadable/server';
import { createStore } from 'redux';
import { rootReducer } from './store/reducers';
import createMiddleware from './store/middleware/middleware';
import { Provider } from 'react-redux';

const app = express();

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.client.js');

    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(webpackConfig);

    app.use(
        webpackDevMiddleware(compiler, {
            logLevel: 'silent',
            publicPath: webpackConfig[0].output.publicPath,
            writeToDisk: true,
        }),
    );

    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.resolve(__dirname, 'web')));

app.get('*', (req, res) => {
    const nodeStats = path.resolve(__dirname, './node/loadable-stats.json');
    const webStats = path.resolve(__dirname, './web/loadable-stats.json');
    const nodeExtractor = new ChunkExtractor({statsFile: nodeStats});
    const {default: App} = nodeExtractor.requireEntrypoint();
    const webExtractor = new ChunkExtractor({statsFile: webStats});

    const context = {};

    console.log('El request es: ', req);

    const store = createStore(
        rootReducer,
        createMiddleware(),
    );

    const jsx = webExtractor.collectChunks(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App/>
            </StaticRouter>
        </Provider>
    );

    const html = renderToString(jsx);
    const helmet = Helmet.renderStatic();


    res.set('content-type', 'text/html');
    res.send(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, user-scalable=no">
          <meta name="google" content="notranslate">
          ${helmet.title.toString()}
          ${webExtractor.getLinkTags()}
          ${webExtractor.getStyleTags()}
        </head>
        <body>
          <div id="root">${html}</div>
          ${webExtractor.getScriptTags()}
        </body>
      </html>
  `);
});

app.listen(3003, () => console.log('Server started http://localhost:3003'));
