import React from 'react';

const PlusIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const MinusIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>;

function CartItem({ item, onQuantityChange, onRemove }) {
    const product = item.product;

    return (
        <div className="w-full my-3 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-zinc-300">
            <div className="flex items-start gap-4 sm:gap-6">
                <div style={{ flexShrink: 0 }} className="w-20 h-20 sm:w-28 sm:h-28  overflow-hidden rounded-lg">
                    <img
                        className="w-full h-full object-cover object-top"
                        src={product?.imageUrl}
                        alt={product?.title}
                    />
                </div>

                <div style={{ flexGrow: 1 }} className="flex flex-col gap-1  ">
                    <h1 className="text-gray-900 font-bold text-base sm:text-lg">{product?.brand}</h1>
                    <p className="text-gray-600 text-sm">{product?.title}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                        Size: <span className="font-semibold text-gray-700">{item.size}</span> , Color: <span className="font-semibold text-gray-700">{product?.color}</span>
                    </p>

                    <div className="flex items-center gap-3 mt-1 sm:mt-2 flex-wrap">
                        <p className="text-lg font-bold text-gray-900">${item.discountedPrice}</p>
                        <p className="line-through text-gray-400 text-sm">${item.price}</p>
                        <p className="text-xs font-semibold text-green-600">{product?.discountPercent}% off</p>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between py-3 mt-4 border-t border-zinc-200'>
                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => onQuantityChange(item._id, item.quantity, -1)}
                        disabled={item.quantity <= 1}
                        className="p-1 border rounded-full border-gray-300 disabled:opacity-30"
                    >
                        <MinusIcon className="w-4 h-4" />
                    </button>

                    <span className='px-3 text-base font-medium text-gray-800'>{item.quantity}</span>

                    <button
                        onClick={() => onQuantityChange(item._id, item.quantity, 1)}
                        className="p-1 border border-gray-300 rounded-full hover:text-purple-700 hover:border-purple-700"
                    >
                        <PlusIcon className="w-4 h-4" />
                    </button>
                </div>

                <div className='cursor-pointer' onClick={() => onRemove(item._id)}>
                    <p className='text-sm font-semibold text-red-500 hover:text-red-700'>
                        REMOVE
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CartItem;