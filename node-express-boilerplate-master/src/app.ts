'use strict';

// Include dependencies
import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as favicon from 'serve-favicon';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
// Modular Route definitions
import * as AdminFormRoute from './routes/admin/list';
import * as AdminListRoute from './routes/admin/form';
import * as multer from 'multer'
// Error handler service
import { development as DevelopmentErrorHandler, production as ProductionErrorHandler } from './services/errorHandler';
// Main app
const app = express();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
const DB_NAME = 'db.json';
    const COLLECTION_NAME = 'images';
    const UPLOAD_PATH = 'uploads';
    const upload = multer({ dest: `${UPLOAD_PATH}/` }); 
// app.use(express.static(path.join(__dirname, 'public'))); //serve public files

// Register routes (as middleware layer through express.Router())
// Add headers
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();

});
app.use(AdminListRoute);
app.use(AdminFormRoute);

app.disable('etag');
// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: Function) => {
    let err = new Error('Not Found');
    res.status(404);
    console.log('catching 404 error');
    return next(err);
});

// error handlers

// development error handler - will print stacktrace
// production error handler - no stacktraces leaked to user
if (app.get('env') === 'development') {
  app.use(DevelopmentErrorHandler);
} else {
  app.use(ProductionErrorHandler);
}

export default app;
