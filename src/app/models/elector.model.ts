export interface Elector {
  id: number;
  nationalIdentificationNumber: string;

  // État civil
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  placeOfBirth: string;

  // Données éléctoral
  voterNumber: string;
  region: string;
  department: string;
  borough: string;
  town: string;
  votingPlace: string;
  pollingStation: number;
}
