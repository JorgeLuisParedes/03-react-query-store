import { Link } from 'react-router-dom';

import { Card, Image } from '@nextui-org/react';

import type { Product } from '../interfaces/product';

interface Props {
	product: Product;
	/** Activa el formato de detalle con descripción completa y ancho limitado. */
	fullDescription?: boolean;
	/** Precarga el detalle asociado antes de navegar a la vista del producto. */
	prefetchProduct?: (id: number) => void;
}

export const ProductCard = ({
	product,
	fullDescription = false,
	prefetchProduct,
}: Props) => {
	return (
		<Link
			onMouseEnter={() => prefetchProduct && prefetchProduct(product.id)}
			className={`mx-auto block w-full ${
				fullDescription ? 'max-w-5xl' : 'h-64'
			}`}
			to={`/product/${product.id}`}>
			<Card
				className={`relative flex rounded-xl border border-white bg-white p-3 shadow-lg ${
					fullDescription
						? 'min-h-80 flex-col md:flex-row'
						: 'h-full flex-col md:flex-row'
				}`}>
				<div
					className={`grid w-full place-items-center bg-white md:w-2/5 ${
						fullDescription ? 'min-h-64' : 'h-full'
					}`}>
					<Image
						src={product.image}
						alt={product.title}
						width={300}
						height={400}
						className='h-full max-h-56 w-full rounded-xl bg-white object-contain p-3'
					/>
				</div>
				<div className='flex w-full flex-col justify-center space-y-2 bg-white p-3 md:w-3/5'>
					<p className='truncate font-medium text-gray-500'>
						{product.category}
					</p>
					<h3
						className={`${
							fullDescription ? '' : 'line-clamp-2'
						} text-xl font-black text-gray-800 md:text-2xl`}>
						{product.title}
					</h3>

					<p
						className={`${
							fullDescription ? '' : 'line-clamp-2'
						} text-base text-gray-500 md:text-lg`}>
						{fullDescription
							? product.description
							: `${product.description.slice(0, 100)}...`}
					</p>

					<p className='text-xl font-black text-gray-800'>
						${product.price}
						<span className='font-normal text-gray-600 text-base'>
							{' '}
							+impuesto
						</span>
					</p>
				</div>
			</Card>
		</Link>
	);
};
