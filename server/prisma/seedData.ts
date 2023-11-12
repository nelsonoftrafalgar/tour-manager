export const tourManagers = [
  {
    id: '484c3155-78d2-4d0c-ab09-dab3768803e4',
    name: 'Sam Cutler',
  },
  {
    id: '8074596c-3a5d-40d1-823b-ad595bb39be8',
    name: 'Mal Evans',
  },
  {
    id: 'c55f9488-8e4b-48c9-a75f-99faf2e77f1b',
    name: 'Richard Cole',
  },
  {
    id: '5b23ace0-b302-4df4-91da-1c9d56c1332c',
    name: 'Albert Chapman',
  },
  {
    id: 'a7619785-2b6b-4441-aa27-7558cf7cadcd',
    name: 'Colin Hart',
  },
]

export const bands = [
  {
    id: 'd471e2c6-0282-4314-98bc-49836809eb57',
    name: 'The Rolling Stones',
    frontMan: 'Mick Jagger',
  },
  {
    id: 'c45757a0-7fd4-40e4-9483-e34a01bc1ccc',
    name: 'The Beatles',
    frontMan: 'John Lennon',
  },
  {
    id: '557ac722-fca4-47b0-b004-5bfabb145a22',
    name: 'Led Zeppelin',
    frontMan: 'Robert Plant',
  },
  {
    id: '3e3d8eee-dc3a-422f-9658-b08f61b84d1d',
    name: 'Black Sabbath',
    frontMan: 'Ozzy Osbourne',
  },
  {
    id: '22c9a810-9160-4f54-a846-407895c207bf',
    name: 'Deep Purple',
    frontMan: 'Ian Gillan',
  },
]

export const concerts = [
  {
    id: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
    date: '2021-03-06',
    place: 'Oslo',
    bandId: 'd471e2c6-0282-4314-98bc-49836809eb57',
    tourManagerId: '484c3155-78d2-4d0c-ab09-dab3768803e4',
  },
  {
    id: '125d1ce0-3c00-4944-90d2-6e704e2e2ae0',
    date: '2022-01-06',
    place: 'London',
    bandId: 'c45757a0-7fd4-40e4-9483-e34a01bc1ccc',
    tourManagerId: '8074596c-3a5d-40d1-823b-ad595bb39be8',
  },
  {
    id: 'fde309ae-2f7c-4473-8f0f-f99f6166a98a',
    date: '2020-01-06',
    place: 'Paris',
    bandId: '557ac722-fca4-47b0-b004-5bfabb145a22',
    tourManagerId: 'c55f9488-8e4b-48c9-a75f-99faf2e77f1b',
  },
  {
    id: '451765f4-ef5d-4edb-ba78-dd741a2418dd',
    date: '2020-05-06',
    place: 'Berlin',
    bandId: '3e3d8eee-dc3a-422f-9658-b08f61b84d1d',
    tourManagerId: '5b23ace0-b302-4df4-91da-1c9d56c1332c',
  },
]

export const salaries = [
  {
    id: '7815498a-171b-4a65-8b70-966f5c9e3f7c',
    amount: '239756',
    comment: 'Test comment',
    concertId: '2e756ddc-191a-4728-97a4-e90a6ffe4955',
    bandId: 'd471e2c6-0282-4314-98bc-49836809eb57',
    tourManagerId: '484c3155-78d2-4d0c-ab09-dab3768803e4',
  },
  {
    id: '774e9a5f-da01-4201-9d51-3bbed4aa7016',
    amount: '398567',
    comment: 'Test comment',
    concertId: '125d1ce0-3c00-4944-90d2-6e704e2e2ae0',
    bandId: 'c45757a0-7fd4-40e4-9483-e34a01bc1ccc',
    tourManagerId: '8074596c-3a5d-40d1-823b-ad595bb39be8',
  },
  {
    id: '3c55e505-f65a-4df7-9c2d-d82a19fbc9e8',
    amount: '235735',
    comment: 'Test comment',
    concertId: 'fde309ae-2f7c-4473-8f0f-f99f6166a98a',
    bandId: '557ac722-fca4-47b0-b004-5bfabb145a22',
    tourManagerId: 'c55f9488-8e4b-48c9-a75f-99faf2e77f1b',
  },
]
