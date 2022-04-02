import indexRouter from './index.routes.js';
import hrRouter from '../modules/humanResources/hr.routes.js';
import staffRouter from '../modules/staff/staff.routes.js';
import devsRouter from '../modules/devs/dev.routes.js';

function registerRoutes(app) {
  // add all routes here
  app.use('/', indexRouter);
  app.use('/humanResources', hrRouter);
  app.use('/staffs', staffRouter);
  app.use('/devs', devsRouter);
}

export default registerRoutes;
