import { useQuery } from '@tanstack/react-query';

import { productActions } from '..';

interface Options {
	filterKey?: string;
}

/**
 * Coordina la consulta cacheada de productos y permite filtrarla por categoría.
 */
export const useProducts = ({ filterKey }: Options) => {
	const {
		isLoading,
		isError,
		error,
		data: products = [],
		isFetching,
	} = useQuery({
		queryKey: ['products', { filterKey }],
		queryFn: () => productActions.getProducts({ filterKey }),
		staleTime: 1000 * 60 * 60,
	});

	return { error, isError, isFetching, isLoading, products };
};
