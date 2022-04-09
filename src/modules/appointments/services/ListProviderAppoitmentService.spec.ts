import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppoitmentsService from './ListProviderAppoitmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppoitmentsService: ListProviderAppoitmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppoitments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppoitmentsService = new ListProviderAppoitmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2022, 4, 20, 14, 0, 0)
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2022, 4, 20, 15, 0, 0)
    });

    const appointments = await listProviderAppoitmentsService.execute({
      provider_id: 'provider',
      year: 2022,
      month: 5,
      day: 20
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
