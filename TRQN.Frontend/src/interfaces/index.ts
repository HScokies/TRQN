export interface ICardProps{
    title: string,
    descr: string, //short descr
    price: number, //starting price
    image: string,
    isBig: boolean //card size
}
export interface ICardsProps{
    title: string,
    descr: string, //short descr
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