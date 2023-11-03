export interface DataResult {
  EmpID: number;
  ProjectID: number;
  DateFrom: Date;
  DateTo: Date;
}

export interface DataByProjects {
  ProjectID: number;
  employees: {
    EmpID: number;
    DateFrom: Date;
    DateTo: Date | "NULL";
  }[];
}

export interface FinalResult {
  empId1: number;
  empId2: number;
  projectId: number;
  days: string;
}
