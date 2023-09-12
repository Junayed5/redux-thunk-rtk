import axios from '../../utils/axios.config'


export const fetchProducts = async () => {
    const data = await axios.get('/products')
    return data.data;
};
export const fetchProductById = async (id) => {
    const data = await axios.get(`product/${id}`)
    return data.data;
};

export const postProduct = async (data) => {
    await axios.post('/product', data)
}

export const deleteProduct = async (id) => {
    await axios.delete(`product/${id}`)
}
export const updateProduct = async (id, data) => {
    await axios.put(`product/${id}`, data)
}