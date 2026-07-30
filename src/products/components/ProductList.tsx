import { type Product, ProductCard, usePrefetchProduct } from '..';

interface Props {
	products: Product[];
}

export const ProductList = ({ products }: Props) => {
	const prefetchProduct = usePrefetchProduct();

	return (
		<div className='mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
			{products.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					prefetchProduct={prefetchProduct}
				/>
			))}
		</div>
	);
};
