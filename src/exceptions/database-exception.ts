import {MongoError} from 'mongodb';
import {DatabaseExceptionCode} from './codes';
import Exception from './exception';

class DatabaseException extends Exception {
	public err: MongoError | undefined

	public constructor(message?: string, err?: MongoError) {
	  super(message);
	  Object.setPrototypeOf(this, new.target.prototype);
	  this.name = DatabaseException.name;
	  this.code = DatabaseExceptionCode;
	  this.err = err;
	}
}

export default DatabaseException;
