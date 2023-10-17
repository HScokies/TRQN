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
                        isBig={i%3 == 0}
                        title={e.title}
                        descr={e.descr}
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