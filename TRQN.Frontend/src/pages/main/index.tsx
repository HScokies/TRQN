import './styles.scss'
import { ICardsProps } from 'src/interfaces';
import { Hero, Card } from "src/components";


const MainPage = ({cards}: IProps) => (
    <>
        <Hero/>
        <div className="products">
            {
                cards.map((e: ICardsProps, i : number) => (
                    <Card
                        key={i}
                        sku={e.sku}
                        isBig={i%3 == 0}
                        name={e.name}
                        descriptionShort={e.descriptionShort}
                        price={e.price}
                        image={e.image}
                    />
                ))
            }
        </div>
    </>

)


interface IProps{
    cards: ICardsProps[]
}


export default MainPage