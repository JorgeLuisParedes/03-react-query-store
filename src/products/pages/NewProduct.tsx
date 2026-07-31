import { type SubmitHandler, Controller, useForm } from 'react-hook-form';

import { Button, Image, Input, Textarea } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';

import { productActions } from '..';

interface FormInputs {
	category: string;
	description: string;
	image: string;
	price: number;
	title: string;
}

export const NewProduct = () => {
	const productMutation = useMutation({
		mutationFn: productActions.createProduct,
		onSuccess: () => {
			console.log('Producto creado');
		},
	});

	const { control, handleSubmit, watch } = useForm<FormInputs>({
		defaultValues: {
			category: "men's clothing",
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptates sequi quas culpa aliquid aspernatur nesciunt dolorum doloremque pariatur voluptatum magnam corrupti dolores, tenetur ullam impedit, iusto consectetur et accusamus!',
			image: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_85301431?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402',
			price: 150.2,
			title: 'Teclado',
		},
	});

	const newImage = watch('image');

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		console.log(data);
		productMutation.mutate(data);
	};

	return (
		<div className='w-full flex-col'>
			<h1 className='text-2xl font-bold'>Nuevo producto</h1>

			<form className='w-full' onSubmit={handleSubmit(onSubmit)}>
				<div className='flex justify-around items-center'>
					<div className='flex-col w-[500px]'>
						<Controller
							control={control}
							name='title'
							rules={{ required: true }}
							render={({ field }) => (
								<Input
									className='mt-2'
									type='text'
									label='Titulo del producto'
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<Controller
							control={control}
							name='price'
							rules={{ required: true }}
							render={({ field }) => (
								<Input
									className='mt-2'
									type='number'
									label='Precio del producto'
									value={field.value?.toString()}
									onChange={(ev) =>
										field.onChange(+ev.target.value)
									}
								/>
							)}
						/>

						<Controller
							control={control}
							name='image'
							rules={{ required: true }}
							render={({ field }) => (
								<Input
									className='mt-2'
									type='url'
									label='Url del producto'
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<Controller
							control={control}
							name='description'
							rules={{ required: true }}
							render={({ field }) => (
								<Textarea
									className='mt-2'
									label='Descripcion del producto'
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<Controller
							control={control}
							name='category'
							rules={{ required: true }}
							render={({ field }) => (
								<select
									className='rounded-md p-3 mt-2 bg-gray-800 w-full'
									value={field.value}
									onChange={field.onChange}>
									<option value="men's clothing">
										Men's clothing
									</option>
									<option value="women's clothing">
										Women's clothing
									</option>
									<option value='jewelery'>Jewelery</option>
									<option value='electronics'>
										Electronics
									</option>
								</select>
							)}
						/>

						<br />
						<Button
							className='mt-2'
							color='primary'
							type='submit'
							isDisabled={productMutation.isPending}>
							{productMutation.isPending
								? 'Cargando...'
								: 'Crear producto'}
						</Button>
					</div>

					<div
						className='bg-white rounded-2xl p-10 flex items-center'
						style={{
							width: '500px',
							height: '600px',
						}}>
						<Image src={newImage} />
					</div>
				</div>
			</form>
		</div>
	);
};
