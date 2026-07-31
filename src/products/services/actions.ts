import { type Product, productsApi } from '..';

interface GetProductsOptions {
	filterKey?: string;
}

export const sleep = (seconds: number): Promise<boolean> => {
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
	// Decisión: Se omite la espera simulada en el flujo normal para no retrasar las consultas.
	// Alternativa: Descomentarla para probar estados de carga durante el desarrollo.
	// await sleep(2);

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
	// Decisión: Se omite la espera simulada en el flujo normal para responder sin retrasos artificiales.
	// Alternativa: restaurar la espera simulada si se necesita emular latencia en esta consulta.
	// await sleep(2);

	const { data } = await productsApi.get<Product>(`/products/${id}`);

	return data;
};

export const createProduct = async (product: ProductLike) => {
	// Decisión: Se omite la espera simulada en el flujo normal para no retrasar la creación.
	// Alternativa: Descomentarla para probar el estado pendiente de la mutation durante el desarrollo.
	// await sleep(2);

	const { data } = await productsApi.post<Product>(`/products`, product);
	return data;
};
