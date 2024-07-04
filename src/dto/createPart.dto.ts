export interface CreatePartDto {
    number: string;
    type: string;
    detailedType?: string;
    name: string;
    manufacturer: string;
    storageLocation: string;
    detailedStorageLocation?: string;
    quantity: string;
}