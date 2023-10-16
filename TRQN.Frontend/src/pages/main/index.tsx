import './styles.scss'

import { Header, Hero, Card, Footer } from "src/components";
import { CardProps } from 'src/components/card';



const MainPage = ({cards}: Props) => (
    <>
        <Header isAdmin={true}/>
        <Hero/>
        <div className="products">
            {
                cards.map((e: CardProps, i : number) => (
                    <Card
                        isBig={i%3 == 0}
                        title={e.title}
                        descr={e.descr}
                        price={e.price}
                        image={e.image}
                    />
                ))
            }
        </div>
        <Footer/>
    </>

)

interface Props{
    cards: CardProps[]
}


export default MainPage