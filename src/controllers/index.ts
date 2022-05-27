import {driver} from '../modules';
import Ctrl from './ctrl';
import DriverCtrl from './driver';

export const ctrl = new Ctrl();
export const driverCtrl = new DriverCtrl(driver);
