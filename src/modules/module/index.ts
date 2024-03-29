/* eslint-disable no-tabs */
import {Error as MongooseError} from 'mongoose';
import {MongoError} from 'mongodb';
import {
  DatabaseException,
  DatabaseValidationException,
  ResourceNotFoundException
} from '@exceptions/index';

export interface QueryInterface {
	page?: number;
	limit?: number;
	search?: string;
	sort?: object;
	range?: string[] | undefined;
}
export abstract class Module {
  handleException(error: Error): void {
    if (error instanceof MongooseError.ValidationError) {
      throw new DatabaseValidationException(error.message, '', error);
    } else if (error instanceof MongoError) {
      throw new DatabaseException(error.errmsg, error);
    } else if (error instanceof MongooseError.DocumentNotFoundError) {
      throw new ResourceNotFoundException();
    } else {
      throw error;
    }
  }
}
