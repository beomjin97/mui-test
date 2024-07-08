import { LocationEnum } from "../data/location";
import { ManufacturerEnum } from "../data/manufacturer";
import { partEnum } from "../data/part";

export interface Part {
    id: number;
    number: string;
    name: string;
    type: partEnum;
    detailedType?: string;
    manufacturer: ManufacturerEnum;
    storageLocation: LocationEnum;
    detailedStorageLocation?: string;
    histories: Array<History>    
}

export interface History {
    id: number;
    isImport: boolean;
    date: Date;
    quantity: number;
}