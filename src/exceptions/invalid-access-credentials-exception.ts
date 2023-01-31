import {InvalidAccessCredentialExceptionCode} from './codes';
import Exception from './exception';
class InvalidAccessCredentialsException extends Exception {
	private cred: object | undefined

	public constructor(message?: string, cred?: object) {
	  super(message);
	  Object.setPrototypeOf(this, new.target.prototype);
	  this.name = InvalidAccessCredentialsException.name;
	  this.code = InvalidAccessCredentialExceptionCode;
	  this.cred = cred;
	}
}

export default InvalidAccessCredentialsException;
