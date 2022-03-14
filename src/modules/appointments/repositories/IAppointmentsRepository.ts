import ICreateAppointmentDTO from '../dtos/ICreateAppoitmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IAppoitmenstRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>;
}

export default IAppoitmenstRepository;
