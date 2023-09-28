export const MOCK_BAND_ID = '3e3d8eee-dc3a-422f-9658-b08f61b84d1d'
export const MOCK_TOUR_MANAGER_ID = '484c3155-78d2-4d0c-ab09-dab3768803e4'
export const MOCK_CONCERT_ID = '2e756ddc-191a-4728-97a4-e90a6ffe4955'
export const MOCK_DATE = '2021-03-06T17:30:05.519Z'
export const MOCK_PLACE = 'Oslo'
export const MOCK_AMOUNT = '12345'
export const MOCK_SALARY_ID = 'd471e2c6-0282-4314-98bc-49836809eb57'
export const MOCK_BAND_NAME = 'Mock Band Name'
export const MOCK_FRONTMAN = 'Mock front man'
export const MOCK_TOUR_MANAGER_NAME = 'Mock Tour Manager Name'

export const mockBandService = {
  getBands: () => [MOCK_BAND_NAME],
  getBandNames: () => [MOCK_BAND_NAME],
  getBandById: () => [MOCK_BAND_NAME],
  createBand: () => ({
    name: MOCK_BAND_NAME,
    frontMan: MOCK_FRONTMAN,
  }),
  updateBand: () => ({
    id: MOCK_BAND_ID,
    name: MOCK_BAND_NAME,
    frontMan: MOCK_FRONTMAN,
  }),
}

export const mockConcertService = {
  getConcerts: () => [MOCK_PLACE],
  getConcertsByBandId: () => [MOCK_PLACE],
  createConcert: () => ({
    date: MOCK_DATE,
    place: MOCK_PLACE,
    bandId: MOCK_BAND_ID,
    tourManagerId: MOCK_TOUR_MANAGER_ID,
  }),
  updateConcert: () => ({
    id: MOCK_CONCERT_ID,
    date: MOCK_DATE,
    place: MOCK_PLACE,
    bandId: MOCK_BAND_ID,
    tourManagerId: MOCK_TOUR_MANAGER_ID,
  }),
}

export const mockSalaryService = {
  createSalary: () => ({
    amount: MOCK_AMOUNT,
    bandId: MOCK_BAND_ID,
    tourManagerId: MOCK_TOUR_MANAGER_ID,
    concertId: MOCK_CONCERT_ID,
  }),
  getReport: () => ({
    id: MOCK_SALARY_ID,
    amount: MOCK_AMOUNT,
    place: MOCK_PLACE,
    bandName: MOCK_BAND_NAME,
    tourManagerName: MOCK_TOUR_MANAGER_NAME,
  }),
  updateSalary: () => ({
    id: MOCK_SALARY_ID,
    amount: MOCK_AMOUNT,
    bandId: MOCK_BAND_ID,
    tourManagerId: MOCK_TOUR_MANAGER_ID,
    concertId: MOCK_CONCERT_ID,
  }),
  deleteSalary: () => ({}),
}

export const mockTourManagerService = {
  getTourManagers: () => [MOCK_TOUR_MANAGER_NAME],
}