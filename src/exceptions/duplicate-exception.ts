import {DuplicateExceptionCode} from './codes';
import Exception from './exception';

class DuplicateException extends Exception {
	public field: string | undefined

	public constructor(message?: string, field?: string) {
	  super(message);
	  Object.setPrototypeOf(this, new.target.prototype);
	  this.name = DuplicateException.name;
	  this.code = DuplicateExceptionCode;
	  this.field = field;
	}
}

export default DuplicateException;
