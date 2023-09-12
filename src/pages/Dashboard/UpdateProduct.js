import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById, toggleUpdateProduct, updateProductById } from '../../features/products/productSlice';
import toast from 'react-hot-toast';

const UpdateProduct = () => {

    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const { id } = useParams();
    const product = useSelector(state => state.products.singleProduct);
    const { isLoading, isUpdated } = useSelector(state => state.products.isLoading);
    // console.log(product);

    useEffect(() => {
        dispatch(getProductById(id))
    }, []);

    useEffect(() => {
        if (isLoading) {
            toast.loading("Loading...", { id: "load" })
        } else {
            toast.success('Successfully Data load', { id: "load" })
        }
    }, [isLoading])

    useEffect(() => {
        if (isLoading && !isUpdated) {
            toast.loading("Updating...", { id: "update" })
        }
        if (!isLoading && isUpdated) {
            toast.success('Update Successfully', { id: "update" })
            reset();
            dispatch(toggleUpdateProduct())
        }
    }, [isLoading])

    const submit = (data) => {
        const product = {
            model: data.model,
            brand: data.brand,
            status: data.status === "true" ? true : false,
            price: data.price,
            keyFeature: [
                data.keyFeature1,
                data.keyFeature2,
                data.keyFeature3,
                data.keyFeature4,
            ],
            spec: [],
        };
        console.log(product);
        dispatch(updateProductById(id, product));
    };

    return (
        <div className='flex justify-center items-center h-full '>
            <form
                className='shadow-lg p-10 rounded-md flex flex-wrap gap-3 max-w-3xl justify-between bg-white'
                onSubmit={handleSubmit(submit)}
            >
                <div className='flex flex-col w-full max-w-xs'>
                    <label className='mb-2' htmlFor='model'>
                        Model
                    </label>
                    <input type='text' name='model' id='model'
                        value={product ? product?.model : null}
                        {...register("model")} />
                </div>
                <div className='flex flex-col w-full max-w-xs'>
                    <label className='mb-2' htmlFor='image'>
                        Image
                    </label>
                    <input type='text' name='image' id='image'
                        value={product ? product?.image : null}
                        {...register("image")} />
                </div>

                <div className='flex flex-col w-full max-w-xs'>
                    <label className='mb-3' htmlFor='brand'>
                        Brand
                    </label>
                    <select name='brand' id='brand'
                        value={product ? product?.brand : null}
                        {...register("brand")}>
                        <option value='amd'>AMD</option>
                        <option value='intel'>Intel</option>
                    </select>
                </div>
                <div className='flex flex-col w-full max-w-xs'>
                    <label className='mb-2' htmlFor='price'>
                        Price
                    </label>
                    <input type='text' name='price' id='price'
                        value={product ? product?.price : null}
                        {...register("price")} />
                </div>

                <div className='flex flex-col w-full max-w-xs'>
                    <h1 className='mb-3'>Availability</h1>
                    <div className='flex gap-3'>
                        <div>
                            <input
                                type='radio'
                                id='available'
                                value={true}
                                {...register("status")}
                            />
                            <label className='ml-2 text-lg' htmlFor='available'>
                                Available
                            </label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                id='stockOut'
                                name='status'
                                value={false}
                                {...register("status")}
                            />
                            <label className='ml-2 text-lg' htmlFor='stockOut'>
                                Stock out
                            </label>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full max-w-xs'></div>
                <div className='flex flex-col w-full max-w-xs'>
                    <label className='mb-2' htmlFor='keyFeature1'>
                        Key Feature 1
                    </label>
                    <input
                        type='text'
                        name='keyFeature1'
                        id='keyFeature1'
                        // value={product ? product?.keyFeature[0] : ''}
                        {...register("keyFeature1")}
                    />
                </div>
                <div className='flex flex-col w-full max-w-xs'>
                    <label className='mb-2' htmlFor='keyFeature2'>
                        Key Feature 2
                    </label>
                    <input
                        type='text'
                        name='keyFeature2'
                        id='keyFeature2'
                        // value={product ? product?.keyFeature[1] : null}
                        {...register("keyFeature2")}
                    />
                </div>
                <div className='flex flex-col w-full max-w-xs'>
                    <label className='mb-2' htmlFor='keyFeature3'>
                        Key Feature 3
                    </label>
                    <input
                        type='text'
                        name='keyFeature3'
                        id='keyFeature3'
                        // value={product ? product?.keyFeature[2] :null}
                        {...register("keyFeature3")}
                    />
                </div>
                <div className='flex flex-col w-full max-w-xs'>
                    <label className='mb-2' htmlFor='keyFeature4'>
                        Key Feature 4
                    </label>
                    <input
                        type='text'
                        name='keyFeature4'
                        id='keyFeature4'
                        // value={product ? product?.keyFeature[0] :null}
                        {...register("keyFeature4")}
                    />
                </div>
                <div className='flex justify-between items-center w-full'>
                    <button
                        className=' px-4 py-3 bg-indigo-500 rounded-md font-semibold text-white text-lg disabled:bg-gray-500'
                        type='submit'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;