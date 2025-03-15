export interface RawMaterial {
    id: string;
    name: string;
    description: string;
    barcode?: string;
    category: Category;
    purchaseUnit: string;
    consumptionUnit: string;
    purchasePrice: number;
    internalPrice: number;
    reconciliationPrice: number;
    normalLoss: number;
    taxType: 'GST' | 'VAT';
    taxPercentage: number;
    minStockLevel: number;
    minStockUnit: string;
    atParStockLevel: number;
    atParStockUnit: string;
    closingStockFrequency: 'daily' | 'weekly';
    hsnCode: string;
    isPrivate: boolean;
    hasExpiry: boolean;
    useMaterials: boolean;
    quantity: number;
    quantityUnit: string;
    gtin: string;
    brand: string;
    isFavorite: boolean;
    isAvailable: boolean;
    createdAt: Date;
    modifiedAt: Date;
    createdBy: string;
    modifiedBy: string;
}

export type Category = 'Vegetable' | 'Oils' | 'Spices' | 'Dairy' | 'Meat' | 'Grains';