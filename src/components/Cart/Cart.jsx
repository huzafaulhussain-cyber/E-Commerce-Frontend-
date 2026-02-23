import React, { useEffect } from 'react';
import CartTotal from './CartTotal';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removeCartItem, updateCartItem } from '../../State/Cart/Action';

const Cart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((store) => store.cart);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);
    const handleQuantityChange = (cartItemId, currentQuantity, step) => {
        const newQuantity = currentQuantity + step;
        if (newQuantity < 1) return;

        const reqData = {
            cartItemId,
            data: { quantity: newQuantity }
        };
        dispatch(updateCartItem(reqData));
    };

    const handleRemoveItem = (cartItemId) => {
        dispatch(removeCartItem({ cartItemId }));

    };

    return (
        <div className='flex flex-col lg:flex-row justify-center lg:gap-8 p-4 sm:p-6 lg:px-10 xl:px-20'>
            <div className='lg:w-3/5 xl:w-2/3 mb-4 lg:mb-0'>
                {cart?.cartItems?.length > 0 ? (
                    cart.cartItems.map((item) => (
                        <CartItem
                            key={item._id}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemoveItem}
                        />
                    ))
                ) : (
                    <div className="text-center mt-30 p-10 bg-white rounded-xl shadow">
                        <h2 className="text-xl ">Your Cart is Empty</h2>
                    </div>
                )}
            </div>

            <div className='lg:w-2/5 xl:w-1/3'>
                <CartTotal cart={cart} />
            </div>
        </div>
    );
};

export default Cart;