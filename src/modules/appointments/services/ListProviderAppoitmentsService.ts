import { inject, injectable } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppoitmenstRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppoitmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppoitmenstRepository
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository
      .findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year
      });

    return appointments;
  }
}

export default ListProviderAppoitmentsService;
