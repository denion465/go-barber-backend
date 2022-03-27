interface ImailProvider {
  sendMail(to: string, body: string): Promise<void>;
}

export default ImailProvider;
