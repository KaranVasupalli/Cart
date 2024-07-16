import React, { useState } from 'react';

const Product = () => {
    const initialProducts = [
        { id: 1, title: "Samsung galaxy s8", img: "https://www.course-api.com/images/cart/phone-1.png", price: 399, count: 1 },
        { id: 2, title: "Google Pixel", img: "https://www.course-api.com/images/cart/phone-2.png", price: 399, count: 1 },
        { id: 3, title: "Redmi Note 2", img: "https://www.course-api.com/images/cart/phone-3.png", price: 399, count: 1 },
        { id: 4, title: "Samsung Galaxy s7", img: "https://www.course-api.com/images/cart/phone-4.png", price: 399, count: 1 },
    ];

    const [products, setProducts] = useState(initialProducts);
    const [total, setTotal] = useState(0);

    const incrementCount = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, count: product.count + 1 } : product
        ));

        setTotal(prevTotal => prevTotal + products.find(product => product.id === id).price);
    };

    const decrementCount = (id) => {
        const product = products.find(product => product.id === id);
        if (product.count > 1) {
            setProducts(products.map(product =>
                product.id === id ? { ...product, count: product.count - 1 } : product
            ));

            setTotal(prevTotal => prevTotal - product.price);
        } else {
            removeProduct(id);
        }
    };

    const removeProduct = (id) => {
        const product = products.find(product => product.id === id);
        setProducts(products.filter(product => product.id !== id));
        setTotal(prevTotal => prevTotal - (product.price * product.count));
    };

    const clearCart = () => {
        setProducts([]);
        setTotal(0);
    };

    return (
        <>
            <h1 className='text-center text-7xl mb-8'>Your Bag</h1>
            <div className='flex flex-col items-center gap-6'>
                {
                    products.map((pro) => (
                        <div key={pro.id} className="flex justify-between gap-4 p-4 border rounded-lg shadow-md w-full max-w-lg">
                            <img src={pro.img} alt={pro.title} className='w-[100px] h-auto' />
                            <div className='flex flex-col'>
                                <h2 className='text-xl font-semibold'>{pro.title}</h2>
                                <span className='text-lg text-gray-700'>${pro.price}</span>
                                <button onClick={() => removeProduct(pro.id)} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Remove</button>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <button onClick={() => incrementCount(pro.id)} className='bg-gray-300 rounded'>➕</button>
                                <span>{pro.count}</span>
                                <button onClick={() => decrementCount(pro.id)} className='bg-gray-300 rounded'>➖</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-around text-4xl mt-4'>
                <span>Total</span>
                <span>${total}</span>
            </div>
            <div className='flex justify-center'>
                <button onClick={clearCart} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>Clear</button>
            </div>
        </>
    );
}

export default Product;
