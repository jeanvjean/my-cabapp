import {BadInputFormatExceptionCode} from './codes';
import Exception from './exception';

interface InputError {
	mapped?: Function;
}

class BadInputFormatException extends Exception {
	public meta: object | undefined
	public errors: InputError[] | undefined

	public constructor(message?: string, errors?: InputError[]) {
	  super(message);
	  Object.setPrototypeOf(this, new.target.prototype);
	  this.name = BadInputFormatException.name;
	  this.code = BadInputFormatExceptionCode;
	  this.errors = errors;
	}
}

export default BadInputFormatException;
