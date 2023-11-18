import './style.scss'
import { useEffect, useState } from 'react';
import { ICardProps } from 'src/interfaces';
import { Card } from 'src/components';
import { useParams } from 'react-router-dom';
import api from 'src/api/axiosConfig';

const CatalogPage = () => {
    let { category } = useParams()
    const [products, setProducts] = useState<ICardProps[]>([])
    const categoryId = {
        sneakers: 1,
        highTops: 2,
        retro: 3,
        skate: 4
    }
    useEffect(() => {
        let url = categoryId[category] != undefined? `/products/category=${categoryId[category]}` : `/products/search/${category}`
        api.get(url)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((e) => {

            })
    }, [category])

    return (
        <div className="products">
            {
                products.map((e: ICardProps, i: number) => (
                    <Card
                        key={i}
                        sku={e.sku}
                        isBig={i % 3 == 0}
                        name={e.name}
                        descriptionShort={e.descriptionShort}
                        price={e.price}
                        image={e.image}
                    />
                ))
            }
        </div>
    );
}

export default CatalogPage;