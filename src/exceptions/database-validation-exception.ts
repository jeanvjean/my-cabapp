import {Error as MongooseError} from 'mongoose';
import {DatabaseValidationExceptionCode} from './codes';
import Exception from './exception';

class DatabaseValidationException extends Exception {
	public err: MongooseError | undefined

	public constructor(message?: string, path?: string, err?: MongooseError) {
	  super(message);
	  Object.setPrototypeOf(this, new.target.prototype);
	  this.name = DatabaseValidationException.name;
	  this.code = DatabaseValidationExceptionCode;
	  this.err = err;
	}
}

export default DatabaseValidationException;
