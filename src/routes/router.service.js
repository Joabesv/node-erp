import indexRouter from './index.routes.js';
import hrRouter from '../modules/humanResources/hr.route.js';

function registerRoutes(app) {
  // add all routes here
  app.use('/', indexRouter);
  app.use('/humanResources', hrRouter);
}

export default registerRoutes;
