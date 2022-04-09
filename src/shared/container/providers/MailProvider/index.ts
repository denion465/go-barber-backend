import { container } from 'tsyringe';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import ImailProvider from './models/IMailProvider';

container.registerInstance<ImailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
);
