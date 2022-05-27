/* eslint-disable require-jsdoc */
import {
  Schema,
  Connection,
  Model
} from 'mongoose';
import {DriverInterface, DriverStatus} from '../modules/interfaces';

export const LocationSchema = new Schema({
  type: String,
  coordinates: {
    type: [Number],
    index: '2dsphare'
  }
});

export const driverSchema = new Schema<DriverInterface>({
  name: {type: String},
  email: {type: String, unique: true, required: true},
  phoneNumber: {type: String, required: true},
  licenceNumber: {type: String, unique: true, required: true},
  carNumber: {type: String, unique: true, required: true},
  isVerified: {type: Boolean, default: false},
  status: {type: String, enum: Object.values(DriverStatus), default: DriverStatus.INACTIVE},
  location: LocationSchema
});

driverSchema.index( {location: '2dsphere'} );

export default function factory(conn: Connection): Model<DriverInterface> {
  return conn.model('drivers', driverSchema);
}
