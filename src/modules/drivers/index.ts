/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable require-jsdoc */
import {Module} from '../module';
import {
  DriverInterface,
  CreateDriver,
  checkCar,
  VerifyMail,
  LocationInterface,
  SearchQuery,
  DriverStatus,
} from '../interfaces';
import {Model} from 'mongoose';
// import MailService from '../../utils/mailer';
import {BadInputFormatException} from '../../exceptions';

export type DriverPropInterface = {
    driver: Model<DriverInterface>;
}


export default class DriverModule extends Module {
    private driver: Model<DriverInterface>;

    constructor(props: DriverPropInterface) {
      super();
      this.driver = props.driver;
    }
    public async create(data: CreateDriver): Promise<any> {
      try {
        const {phone_number, license_number, car_number, name, email} = data;
        const driver = new this.driver({
          name,
          email,
          phoneNumber: phone_number,
          carNumber: car_number,
          licenceNumber: license_number
        });
        await driver.save((err, saved)=>{
          if (err) throw new Error(err.message);
          return saved;
        });
        const emailData = {email, name};
        console.log(process.env.NODE_ENV);

        if (process.env.NODE_ENV === 'test') {
          return {
            driver,
            status: 'success'
          };
        }
        // await MailService('Verify email', 'verify_email', emailData);
        return {
          driver,
          status: 'success'
        };
      } catch (error) {
        throw new Error('an error occured');
      }
    }

    public async fetchDriver(payload: checkCar): Promise<any> {
      try {
        const {email, car_number, license_number, phone_number} = payload;
        const query = {
          $or: [{email}, {carNumber: car_number}, {licenseNumber: license_number}, {phoneNumber: phone_number}]
        };
        const data = await this.driver.findOne(query);
        return data;
      } catch (error) {
        // @ts-ignore
        this.handleException(error);
      }
    }

    public async fetchSingleDriver(payload: string): Promise<any> {
      try {
        const query = {
          $or: [{email: payload}, {carNumber: payload}, {licenseNumber: payload}, {phoneNumber: payload}]
        };
        console.log(query);
        const data = await this.driver.findOne(query);
        return data;
      } catch (error) {
        // @ts-ignore
        this.handleException(error);
      }
    }

    public async verifyEmail(payload: VerifyMail): Promise<any> {
      try {
        const {email} = payload;
        const driver = await this.driver.findOneAndUpdate({email}, {isVerified: true, status: DriverStatus.ACTIVE}, {new: true});
        return {driver, status: 'success'};
      } catch (error) {
        // @ts-ignore
        this.handleException(error);
      }
    }

    public async shareLocation(payload: LocationInterface, id: string): Promise<any> {
      try {
        const driver = await this.driver.findByIdAndUpdate(id, {location: payload}, {new: true});
        return {driver, status: 'success'};
      } catch (error) {
        // @ts-ignore
        this.handleException(error);
      }
    }

    public async fetchNearbyDrivers(payload: SearchQuery): Promise<any> {
      try {
        // @ts-ignore
        const driver = await this.driver.aggregate([
          {
            $geoNear: {
              // @ts-ignore
              near: {type: 'Point', coordinates: [parseFloat(payload.latitude) || 0, parseFloat(payload.longitude) || 0]},
              maxDistance: 4*1000 || 0,
              spherical: true,
              distanceField: 'calcDistance'
            }
          },
          {
            $project: {
              name: 1,
              carNumber: 1,
              phoneNumber: 1
            }
          }
        ]);

        const message = driver.length > 0 ? 'Fetched all drivers within 4km of you' : 'No cabs available!';
        return {
          message,
          available_cabs: driver
        };
      } catch (error) {
        // @ts-ignore
        this.handleException(error);
      }
    }
}
