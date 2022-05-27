/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable require-jsdoc */
/* eslint-disable no-undef */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import {Request, Response} from 'express';
import {
  Exception,
  InvalidAccessCredentialsException,
  BadInputFormatException,
  NetworkException,
  ResourceNotFoundException,
  DuplicateException,
  DatabaseException,
  DatabaseValidationException
} from '@exceptions/index';

/**
 * @interface
 * @category Controllers
 */
interface ResponseInterface {
	code: number;
	message: string | undefined;
	data?: object | string;
}

/**
 * Base controller which would be inherited by other controllers.
 * @category Controllers
 */
class Ctrl {
	public HTTP_OK = 200
	public HTTP_CREATED = 201
	public HTTP_BAD_REQUEST = 400
	public HTTP_RESOURCE_NOT_FOUND = 404
	public HTTP_INTERNAL_SERVER_ERROR = 500
	public HTTP_UNAUTHENTICATED = 401
	public HTTP_UNAUTHORIZED = 403

	/**
	 * handle successful response
	 * @param {Response} res
	 * @param {string} message
	 * @param {Object|string} data
	 */
	public ok(res: Response, message?: string, data?: object | string): void {
	  const load: ResponseInterface = {
	    code: this.HTTP_OK,
	    message: message,
	    data
	  };
	  res.status(this.HTTP_OK).json(load);
	}

	/**
	 * @param {Exception} error
	 * @param {Request} req
	 * @param {Response} res
	 */
	public handleError(error: Exception, req: Request, res: Response): void {
	  // set locals, only providing error in development
	  res.locals.message = error.message;
	  res.locals.error = req.app.get('env') === 'development' ? error : {};

	  if (error instanceof InvalidAccessCredentialsException) {
	    const load: ResponseInterface = {
	      code: error.code,
	      message: error.message
	    };
	    res.status(this.HTTP_UNAUTHORIZED).json(load);
	  } else if (error instanceof BadInputFormatException) {
	    const load: ResponseInterface = {
	      code: error.code,
	      message: error.message
	    };
	    res.status(this.HTTP_BAD_REQUEST).json(load);
	  } else if (error instanceof NetworkException) {
	    const load: ResponseInterface = {
	      code: error.code,
	      message: error.message
	    };
	    res.status(this.HTTP_INTERNAL_SERVER_ERROR).json(load);
	  } else if (error instanceof ResourceNotFoundException) {
	    const load: ResponseInterface = {
	      code: error.code,
	      message: error.message
	    };
	    res.status(this.HTTP_RESOURCE_NOT_FOUND).json(load);
	  } else if (error instanceof DuplicateException) {
	    const load: ResponseInterface = {
	      code: error.code,
	      message: error.message
	    };
	    res.status(this.HTTP_BAD_REQUEST).json(load);
	  } else if (error instanceof DatabaseException) {
	    const load: ResponseInterface = {
	      code: error.code,
	      message: 'A database error has occurred'
	    };
	    res.status(this.HTTP_INTERNAL_SERVER_ERROR).json(load);
	  } else if (error instanceof DatabaseValidationException) {
	    const load: ResponseInterface = {
	      code: error.code,
	      message: 'There was an error with your request'
	    };
	    res.status(this.HTTP_BAD_REQUEST).json(load);
	  } else {
	    res.status(500);
	  }
	}

	public errorResponse(req: Request, res: Response, errorCode: number, message: string) {
	  const response = {
	    status: 'error',
	    message
	  };
	  res.status(errorCode).json(response);
	}

	/**
	 * Handler non existent routes
	 * @param {Request} req
	 * @param {Response} res
	 */
	public handleNotFound(req: Request, res: Response): void {
	  res.status(404).send('Resource not found.');
	}

	/**
	 * Standardize response format
	 * @param {ResponseInterface} resp
	 * @return {ResponseInterface}
	 */
	protected format(resp: ResponseInterface): ResponseInterface {
	  return resp;
	}
}

export default Ctrl;
