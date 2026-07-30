import { useQueryClient } from '@tanstack/react-query';

import { productActions } from '..';

/**
 * Prepara en la caché el detalle de un producto para que la navegación pueda reutilizarlo.
 */
export const usePrefetchProduct = () => {
	const queryClient = useQueryClient();

	const prefetchProduct = (id: number) => {
		queryClient.prefetchQuery({
			queryKey: ['product', id],
			queryFn: () => productActions.getProductById(id),
		});
	};

	return prefetchProduct;
};
