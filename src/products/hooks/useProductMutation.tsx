import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productActions } from '..';

/** Coordina la mutation de creación de productos y expone sus estados al formulario. */
export const useProductMutation = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: productActions.createProduct,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['products', { filterKey: data.category }],
			});
		},
	});

	return mutation;
};
