export type Unit =
    | "each"
    | "g"
    | "kg"
    | "ml"
    | "l";
    
export interface Ingredient {
    id: number;
    name: string;
    quantity: number;
    unit: Unit;
}