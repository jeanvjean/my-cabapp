import {Router as expressRouter} from 'express';
import {driverCtrl} from '../controllers';
import Validator from '../controllers/driver/validator';
import DriverMiddleware from '@src/middlewares/middleware.driver';
const val = new Validator();
const driver = new DriverMiddleware();

const router: expressRouter = expressRouter();

router.post(
  '/add-driver',
  Validator.validateDriverSchema(),
  val.validate(),
  driver.getVehicle('create'),
  driverCtrl.create()
);

router.get(
  '/verify',
  driver.getDriver(),
  driverCtrl.verify()
);

router.patch(
  '/share-location/:email',
  driver.getDriver(),
  driverCtrl.updateLocation()
);

router.get(
  '/nearby-drivers',
  driverCtrl.fetchNearbyDrivers()
);

export default router;
