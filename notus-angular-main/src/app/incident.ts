import { TypeIncident } from "./type-incident";
export class Incident {
    idIncident: number;
    localisation: string;
    description: string;
    incidentDate: Date;
    status: string;
    user: string;
    typeIncident: TypeIncident;
}
