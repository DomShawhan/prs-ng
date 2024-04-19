
export class VendorSummary{
    code: string;
    name: string;
    countOfProducts: number;

    constructor(
        code: string = '',
        name: string = '',
        countOfProducts: number = 0
    ){
        this.code = code;
        this.name = name;
        this.countOfProducts = countOfProducts;
    }
}