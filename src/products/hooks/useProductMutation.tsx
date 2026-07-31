import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type Product, productActions } from '..';

/** Coordina la mutation de creación de productos y expone sus estados al formulario. */
export const useProductMutation = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: productActions.createProduct,
		onMutate: (product) => {
			// Decisión: Insertar una representación provisional mantiene la lista fluida mientras responde el servidor.
			const optimisticProduct = {
				id: Math.random(),
				...product,
			};

			// La misma clave de categoría permite reemplazar después el producto provisional por la respuesta real.
			queryClient.setQueryData<Product[]>(
				['products', { filterKey: product.category }],
				(old) => {
					if (!old) return [optimisticProduct];
					return [...old, optimisticProduct];
				},
			);

			return { optimisticProduct };
		},
		onSuccess: (product, _variables, context) => {
			queryClient.removeQueries({
				queryKey: ['product', context?.optimisticProduct.id],
			});

			queryClient.setQueryData<Product[]>(
				['products', { filterKey: product.category }],
				(old) => {
					if (!old) return [product];

					return old.map((cacheProduct) =>
						cacheProduct.id === context?.optimisticProduct.id
							? product
							: cacheProduct,
					);
				},
			);

			// Decisión: Actualizar la cache local refleja inmediatamente el producto creado en la lista filtrada.
			// Alternativa: Invalidar la consulta para recuperar el catálogo desde el servidor cuando la respuesta pueda diferir.
			// queryClient.invalidateQueries({
			// 	queryKey: ['products', { filterKey: product.category }],
			// });
		},

		onError: (error, variables, context) => {
			console.error('Error creando el producto:', error);

			// Decisión: retirar el producto provisional evita mostrar un registro que el servidor rechazó.
			queryClient.removeQueries({
				queryKey: ['product', context?.optimisticProduct.id],
			});

			queryClient.setQueryData<Product[]>(
				['products', { filterKey: variables.category }],
				(old) => {
					if (!old) return [];

					return old.filter(
						(cacheProduct) =>
							cacheProduct.id !== context?.optimisticProduct.id,
					);
				},
			);
		},
	});

	return mutation;
};
