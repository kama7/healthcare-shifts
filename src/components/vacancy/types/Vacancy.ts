export enum ShiftType {
  CONSULTATION = 'Consultation',
  TELEPHONE = 'Telephone',
  AMBULANCE = 'Ambulance',
}

export type Shift = {
  startTime: string;
  endTime: string;
  price: number;
  type: `${ShiftType}`;
  date: string;
}

export type Vacancy = {
  title: string;
  description?: string;
  dates: string[];
  shifts: Shift[];
}
