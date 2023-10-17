import './style.scss'
import { useEffect, useState } from 'react';
import { ICardProps } from 'src/interfaces';
import { Card } from 'src/components';
import { useParams } from 'react-router-dom';

const CatalogPage = () => {
    let  {category} = useParams()
    const [products, setProducts] = useState<ICardProps[]>([])
    useEffect(() => {
    }, [category])

    return (
        <div className="products">
            <h1>%{category}%</h1>
            {
                products.map((e: ICardProps, i: number) => (
                    <Card
                        isBig={i % 3 == 0}
                        title={e.title}
                        descr={e.descr}
                        price={e.price}
                        image={e.image}
                    />
                ))
            }
        </div>
    );
}

export default CatalogPage;