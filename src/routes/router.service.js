import indexRouter from './index.routes.js';
import hrRouter from '../modules/humanResources/hr.routes.js';
import staffRouter from '../modules/staff/staff.routes.js';
function registerRoutes(app) {
  // add all routes here
  app.use('/', indexRouter);
  app.use('/humanResources', hrRouter);
  app.use('/staffs', staffRouter);
}

export default registerRoutes;
