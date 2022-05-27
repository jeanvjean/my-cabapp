/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import {join} from 'path';
import {json, urlencoded} from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as compression from 'compression';

import AppConfig from './configs/app';
import {ctrl} from './controllers';
import router from './routes';
const fileUpload = require('express-fileupload');

/**
 * Express application
 */
class Application {
	/**
	 * Express application
	 */
	public express: express.Application

	/**
	 * @constructor
	 */
	constructor() {
	  this.express = express();
	  this.configure();
	  this.handleExceptions();
	  this.express.listen(AppConfig.port, () => {
	    console.log(`${AppConfig.appName} is listening at port ${AppConfig.port}`);
	  });
	}

	/**
	 * Configure express application
	 */
	private configure(): void {
	  this.express.use(logger('dev'));
	  this.express.use(json({limit: AppConfig.clientBodyLimit}));
	  this.express.use(urlencoded({extended: true}));
	  this.express.use(cookieParser());
	  this.express.use(express.static(join(__dirname, '../', 'public')));
	  this.express.use(compression());
	  this.express.use(fileUpload());
	  this.express.use('*', cors());
	  this.express.options('*', cors());
	  this.express.use(helmet());
	  this.express.use('/api/', router);
	}

	/**
	 * Handles express application exceptions
	 */
	private handleExceptions(): void {
	  this.express.use(ctrl.handleNotFound);
	  this.express.use(ctrl.handleError);
	}
}

export default Application;
