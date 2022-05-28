/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import {ConnectionOptions} from 'mongoose';

/**
 * MongoDB configurations
 * @category Configurations
 */
class Mongo {
	/**
	 * @param {string} uri Connection string for mongodb database server
	 */
	static uri =
	  `${process.env.NODE_ENV}` === 'development' ? `${process.env.DEV_DATABASE_URL}` :
	  `${process.env.NODE_ENV}` === 'test' ? `${process.env.TEST_DATABASE_URL}` :
	  `${process.env.NODE_ENV}` === 'production' ? `${process.env.PROD_DATABASE_URL}` :
	  `${process.env.DEV_DATABASE_URL}`

	/**
	 * @param {ConnectionOptions} options Mongodb server options
	 */
	static options: ConnectionOptions = {
	  socketTimeoutMS: 0,
	  keepAlive: true,
	  poolSize: `${process.env.NODE_ENV}` !== 'development' ? 5 : 1,
	  useNewUrlParser: true,
	  useCreateIndex: true,
	  useUnifiedTopology: true
	}
}

export default Mongo;
