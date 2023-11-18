export interface ICardProps{
    SKU: string,
    name: string,
    descriptionShort: string, //short descr
    price: number, //starting price
    image: string,
    isBig: boolean //card size
}
export interface ICardsProps{
    name: string,
    descriptionShort: string, //short descr
    price: number, //starting price
    image: string   
}

export interface IProductProps{
    title: string,
    descr: string,
    image: string,
    sizes: ISizeToPrice[]
}
interface ISizeToPrice{
    size: number,
    price: number | null
}