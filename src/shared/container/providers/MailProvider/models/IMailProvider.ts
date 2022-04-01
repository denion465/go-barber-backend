import ISendMailDTO from '../dtos/ISendMailDTO';

interface ImailProvider {
  sendMail(to: ISendMailDTO): Promise<void>;
}

export default ImailProvider;
