import {ConnectionOptions} from 'mongoose';

class Mongo {
	static uri = `${process.env.NODE_ENV}` === 'development' ? `${process.env.DEV_DATABASE_URL}` :
	  `${process.env.NODE_ENV}` === 'test' ? `${process.env.TEST_DATABASE_URL}` :
	    `${process.env.NODE_ENV}` === 'production' ? `${process.env.PROD_DATABASE_URL}` :
	      `${process.env.DEV_DATABASE_URL}`

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
