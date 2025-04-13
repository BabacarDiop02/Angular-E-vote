export enum ElectionType {
  PRESIDENTIAL = "Présidentielle",
  LEGISLATIVE = "Législative",
  MUNICIPAL = "Municipale",
  REFERENDUM = "Référendum",
  OTHER = "Autre"

}

export enum ElectionStatus {
  PENDING = "En attente",
  IN_PROGRESS = "En Cours",
  COMPLETED = "Terminée",
  CANCELED = "Annulé"
}

export interface Election {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  type: ElectionType;
  status: ElectionStatus;
  candidates: string[];
  allVotes: number;
}
