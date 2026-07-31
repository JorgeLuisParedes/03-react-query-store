import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type Product, productActions } from '..';

/** Coordina la mutation de creación de productos y expone sus estados al formulario. */
export const useProductMutation = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: productActions.createProduct,
		onSuccess: (product) => {
			queryClient.setQueryData<Product[]>(
				['products', { filterKey: product.category }],
				(old) => {
					if (!old) return [product];
					return [...old, product];
				},
			);

			// Decisión: Actualizar la cache local refleja inmediatamente el producto creado en la lista filtrada.
			// Alternativa: Invalidar la consulta para recuperar el catálogo desde el servidor cuando la respuesta pueda diferir.
			// queryClient.invalidateQueries({
			// 	queryKey: ['products', { filterKey: product.category }],
			// });
		},
	});

	return mutation;
};
