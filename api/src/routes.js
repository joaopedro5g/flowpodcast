import { Router } from 'express';

import ScopesMiddleware from './middlewares/scopes';

import AuthController from './controller/AuthController';
import EpisodeController from './controller/EpisodeController';
import UserController from './controller/UserController';
import DeviceController from './controller/DeviceController';

import TokenGen from './secure/TokenGen';

const routes = Router();

const auth = new AuthController();
const episode = new EpisodeController();
const user = new UserController();
const device = new DeviceController();


routes.post('/auth', auth.store);

routes.get('/episodes', episode.index);
routes.get('/episode/:id', episode.show);

routes.get('/user/:id', user.show);

routes.get('/device', ScopesMiddleware, device.index);
routes.get('/token/gen', TokenGen);

export default routes;