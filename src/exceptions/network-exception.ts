import {NetworkExceptionCode} from './codes';
import Exception from './exception';

/**
 * Handles exception when there is a network error
 * @category Exceptions
 */
class NetworkException extends Exception {
	public err: object | undefined
	public url: string | undefined

	public constructor(message?: string, url?: string, err?: Error) {
	  super(message);
	  Object.setPrototypeOf(this, new.target.prototype);
	  this.name = NetworkException.name;
	  this.code = NetworkExceptionCode;
	  this.url = url;
	  this.err = err;
	}
}

export default NetworkException;
