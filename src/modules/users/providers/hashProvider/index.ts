import { IHashProvider } from './models/IHashProvider';
//container para injetar as inependencias do hash
import { container } from 'tsyringe';
import BcryptHashProvider from './implementations/BcryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
