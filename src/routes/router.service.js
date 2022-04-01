import indexRouter from './index.routes.js';

function registerRoutes(app) {
  // add all routes here
  app.use('/', indexRouter);
}

export default registerRoutes;
