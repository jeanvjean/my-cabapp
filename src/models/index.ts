import {createConnection, Connection, Model} from 'mongoose';
import conf from '@configs/mongo';
import {DriverInterface} from '../modules/interfaces';

import driverFactory from './drivers';

export const conn: Connection = createConnection(conf.uri, conf.options);
console.log({db: conf.uri});


export const Driver: Model<DriverInterface> = driverFactory(conn);

conn.once('open', (): void => console.log('db connection open'));
