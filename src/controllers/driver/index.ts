/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable require-jsdoc */
import {Response, Request, RequestHandler, NextFunction} from 'express';
import Ctrl from '../ctrl';
import DriverModule from '@src/modules/drivers';


export default class DriverController extends Ctrl {
    private module: DriverModule;
    constructor(module: DriverModule) {
      super();
      this.module = module;
    }

    create(): RequestHandler {
      return async (req: Request, res: Response) =>{
        try {
          const data = await this.module.create({...req.body});
          this.ok(res, 'Driver saved successfully', data);
        } catch (error) {
          // @ts-ignore
          this.handleError(error, req, res);
        }
      };
    }

    verify(): RequestHandler {
      return async (req: Request, res: Response, next: NextFunction)=>{
        try {
          const {query: {email}} = req;
          // @ts-ignore
          const data = await this.module.verifyEmail({email});
          return this.ok(res, 'account verified', data);
        } catch (error) {
          // @ts-ignore
          this.handleError(error, req, res);
        }
      };
    }

    updateLocation(): RequestHandler {
      return async (req: Request, res: Response) => {
        try {
          // @ts-ignore
          const {driver: {id}, body} = req;
          const data = await this.module.shareLocation(body, id);
          return this.ok(res, 'location updated successfully', data);
        } catch (error) {
          // @ts-ignore
          this.handleError(error, req, res);
        }
      };
    }

    fetchNearbyDrivers(): RequestHandler {
      return async (req: Request, res: Response) =>{
        try {
          const {query: {latitude, longitude}} = req;
          // @ts-ignore
          const data = await this.module.fetchNearbyDrivers({latitude, longitude});
          return this.ok(res, 'success', data);
        } catch (error) {
          // @ts-ignore
          this.handleError(error, req, res);
        }
      };
    }
}
