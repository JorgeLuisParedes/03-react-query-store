import { useMutation } from '@tanstack/react-query';

import { productActions } from '..';

/** Coordina la mutation de creación de productos y expone sus estados al formulario. */
export const useProductMutation = () => {
	const mutation = useMutation({
		mutationFn: productActions.createProduct,
		onSuccess: () => {
			console.log('Producto creado');
		},
		onSettled: () => {
			console.log('on Settled');
		},
	});

	return mutation;
};
