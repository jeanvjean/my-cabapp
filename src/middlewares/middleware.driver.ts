/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable require-jsdoc */
import Ctrl from '@src/controllers/ctrl';
import {Request, Response, NextFunction, query} from 'express';
import {RequestHandler} from 'express-serve-static-core';
import {driver as DriverModule} from '../modules';


export default class DriverMiddleware extends Ctrl {
  public getVehicle(type: string): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {body: {email, car_number, license_number, phone_number}} = req;
        const driver = await DriverModule.fetchDriver({
          email,
          car_number,
          license_number,
          phone_number
        });

        if (driver && type === 'create') {
          return this.errorResponse(req, res, 400, 'Driver already exists');
        }
        if (!driver && type === 'verify') {
          return this.errorResponse(req, res, 404, 'No driver with this details found');
        }
        if (!driver && type === 'create') {
          return next();
        }
        // @ts-ignore
        req.driver = driver;
        return next();
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }

  public getDriver(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) =>{
      try {
        const {params, query} = req;
        const payload = params.email || query.email;
        // @ts-ignore
        const driver = await DriverModule.fetchSingleDriver(payload);

        if (!driver) {
          return this.errorResponse(req, res, 404, 'No driver with this details found');
        }
        // @ts-ignore
        req.driver = driver;
        return next();
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }
}
