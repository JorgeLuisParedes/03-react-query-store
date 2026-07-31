import { type Product, productsApi } from '..';

interface GetProductsOptions {
	filterKey?: string;
}

const sleep = (seconds: number): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, seconds * 1000);
	});
};

/** Obtiene productos del API aplicando opcionalmente un filtro de categoría. */
export const getProducts = async ({
	filterKey,
}: GetProductsOptions): Promise<Product[]> => {
	await sleep(2);

	const filterUrl = filterKey ? `category=${filterKey}` : '';

	const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`);

	return data;
};

export interface ProductLike {
	category: string;
	description: string;
	id?: number;
	image: string;
	price: number;
	title: string;
}

export const getProductById = async (id: number): Promise<Product> => {
	// Alternativa: restaurar la espera simulada si se necesita emular latencia en esta consulta.
	// await sleep(2);

	const { data } = await productsApi.get<Product>(`/products/${id}`);

	return data;
};

export const createProduct = async (product: ProductLike) => {
	await sleep(2);

	const { data } = await productsApi.post<Product>(`/products`, product);
	return data;
};
