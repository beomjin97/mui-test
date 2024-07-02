export enum partEnum {
    ALL = "ALL",
    CPU = "CPU",
    MEMORY = "Memory",
    DISK = "Disk",
    POWER_SUPPLY = "Power Supply",
    BOARD = "Board",
    CACHE_MODULE = "Cache Module",
    SFP = "SFP",
    PCI_CARD = "PCI Card",
    FAN = "Fan",
    ETC = "ETC"   
}

export const partArray = [
    partEnum.ALL, 
    partEnum.CPU, 
    partEnum.MEMORY, 
    partEnum.DISK, 
    partEnum.POWER_SUPPLY,
    partEnum.BOARD,
    partEnum.CACHE_MODULE,
    partEnum.SFP,
    partEnum.PCI_CARD,
    partEnum.FAN,
    partEnum.ETC
]

export enum BoardEnum {
    POWER = "Power",
    CHASSIS = "Chassis",
    DISK = "Disk",
    INSIGHT_DISPLAY = "Insight Display",
    MB = "MB",
    SPI = "SPI"
}

export enum CacheModuleEnum {
    BATTERY = "Battery",
    MEMORY = "Memory"
}

export enum DiskEnum {
    TWO = "2.5\"",
    THREE = "3.5\"",
    SSD = "SSD",
    M2 = "M.2"
}

export enum MemoryEnum {
    DDR2 = "DDR2",
    DDR3 = "DDR3",
    DDR4 = "DDR4" 
}

export enum PCICardEnum {
    FC = "FC",
    FLEXFABRIC = "Flex Fabric",
    HBA = "HBA",
    IB = "IB",
    NIC = "NIC",
    RC = "RC"
}

export enum PowerSupplyEnum {
    SPS = "SPS",
    UNIT = "Unit",
    VRM = "VRm"
}

export const detailedTypeArray = [
    BoardEnum.POWER,
    BoardEnum.CHASSIS,
    BoardEnum.DISK,
    BoardEnum.INSIGHT_DISPLAY,
    BoardEnum.MB,
    BoardEnum.SPI,
    CacheModuleEnum.BATTERY,
    CacheModuleEnum.MEMORY,
    DiskEnum.M2,
    DiskEnum.SSD,
    DiskEnum.THREE,
    DiskEnum.TWO,
    MemoryEnum.DDR2,
    MemoryEnum.DDR3,
    MemoryEnum.DDR4,
    PCICardEnum.FC,
    PCICardEnum.FLEXFABRIC,
    PCICardEnum.HBA,
    PCICardEnum.IB,
    PCICardEnum.NIC,
    PCICardEnum.RC,
    PowerSupplyEnum.SPS,
    PowerSupplyEnum.UNIT,
    PowerSupplyEnum.VRM
]
