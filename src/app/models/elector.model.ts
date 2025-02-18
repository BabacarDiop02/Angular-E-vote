export class Elector {
  id: number = 0;
  nationalIdentificationNumber: string = "";

  // État civil
  firstName: string = "";
  lastName: string = "";
  dateOfBirth: Date = new Date();
  placeOfBirth: string = "";

  // Données éléctoral
  voterNumber: string = "";
  region: string = "";
  department: string = "";
  borough: string = "";
  town: string = "";
  votingPlace: string = "";
  pollingStation: number = 0;
}
