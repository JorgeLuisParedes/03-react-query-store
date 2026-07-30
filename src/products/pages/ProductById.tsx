import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ProductCard } from '..';
import { useProduct } from '../hooks/useProduct';

export const ProductById = () => {
	const { id } = useParams();
	const { product, isLoading } = useProduct({ id: +id! });

	// Restablece la posición al entrar al detalle para no conservar el scroll de la lista.
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className='flex-col'>
			<h1 className='text-2xl font-bold'>Producto</h1>

			{isLoading && <p>Cargando...</p>}

			{product && <ProductCard product={product} fullDescription />}
		</div>
	);
};
