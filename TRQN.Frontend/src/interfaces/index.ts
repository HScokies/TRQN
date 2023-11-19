export interface ICardProps{
    sku: string,
    name: string,
    descriptionShort: string, //short descr
    price: number, //starting price
    image: string,
    isBig: boolean //card size
}
export interface ICardsProps{
    sku: string
    name: string,
    descriptionShort: string, //short descr
    price: number, //starting price
    image: string   
}

export interface IProductProps{
    name: string,
    sku: string,
    colorway: string,
    releaseDate: string,
    description: string,
    image: string,
    sizes: ISizeToPrice[]
}
export interface ISizeToPrice{
    id: number,
    size: number,
    price: number
}

export interface IResponse{
    code: number,
    message: string
}
