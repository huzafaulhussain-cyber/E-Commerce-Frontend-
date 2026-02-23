'use client'

import { StarIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import ProductdetailReviwe from './ProductdetailReviwe';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById } from '../../State/product/Action';
import { addItemToCart } from '../../State/Cart/Action';
import { getAllReviews } from '../../State/review/Action'; // 👈 YE IMPORT KARO

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192.00', // Updated for clarity
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    sizes: [
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }
// 1. Review Store bhi nikalo



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Productdetail() {
    const [selectedSize, setSelectedSize] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { productId } = useParams();

    const { products, review } = useSelector((store) => store);
    // ... existing states

    const [activeImage, setActiveImage] = useState(null); // Nayi state

    // Jab product data database se aaye, toh main image set karo
    useEffect(() => {
        if (products.product?.imageUrl) {
            setActiveImage(products.product.imageUrl);
        }
    }, [products.product]);

    // Image change karne ka function
    const handleImageClick = (imageSrc) => {
        setActiveImage(imageSrc);
    };


    useEffect(() => {
        const reqData = { productId: productId };

        if (productId) {
            dispatch(findProductsById(reqData));
            dispatch(getAllReviews(productId)); // 👈 Reviews fetch karo taake header update ho
        }
    }, [productId, dispatch]);

    // 2. Rating Calculations Logic
    const totalReviews = review.reviews?.length || 0;

    // Average nikalne ka tareeqa (Total Stars / Total People)
    const averageRating = totalReviews > 0
        ? review.reviews.reduce((acc, item) => acc + item.rating, 0) / totalReviews
        : 0;
    console.log("Current Product Data from Store:", products?.product);
    const handleAddToCart = (event) => {
        event.preventDefault();

        const data = { productId: productId, size: selectedSize };
        console.log('cart ka data ', data);

        console.log("Cart Data:", data);
        dispatch(addItemToCart(data));
        navigate('/cart');
    };



    return (
        <div className="bg-white">
            <div className="pt-6">

                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {product.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        fill="currentColor"
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav>

                <section className='mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:pt-16 lg:pb-24'>

                    {/* Image gallery (Left Column) */}
                    {/* Image gallery (Left Column) */}
                    {/* Image gallery (Left Column) */}
                    <div className="lg:order-1 lg:col-span-1">
                        <div className='w-full overflow-hidden rounded-lg'>
                            <img
                                alt="Main Product"
                                src={activeImage || products.product?.imageUrl}
                                className="size-full object-cover object-center"
                            />
                        </div>

                        {/* Dynamic Thumbnails (Total 4 Slots) */}
                        <div className="mt-6 grid grid-cols-4 gap-6">

                            {/* 1. Main Image Slot */}
                            <div
                                onClick={() => handleImageClick(products.product?.imageUrl)}
                                className={`cursor-pointer overflow-hidden rounded-lg border-2 ${activeImage === products.product?.imageUrl ? 'border-indigo-500' : 'border-transparent'}`}
                            >
                                <img src={products.product?.imageUrl} className="size-full object-cover" />
                            </div>

                            {/* 2, 3, 4. Additional Images from Database Array */}
                            {products.product?.images?.map((img, index) => (
                                img && ( // Agar image admin panel se upload hui hai tabhi dikhaye
                                    <div
                                        key={index}
                                        onClick={() => handleImageClick(img)}
                                        className={`cursor-pointer overflow-hidden rounded-lg border-2 ${activeImage === img ? 'border-indigo-500' : 'border-transparent'}`}
                                    >
                                        <img src={img} className="size-full object-cover" />
                                    </div>
                                )
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 lg:mt-0 lg:order-2 lg:col-span-1">

                        {/* Product Header */}
                        <div className="lg:pr-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{products.product?.brand}</h1>
                            <p className='text-zinc-600 text-xl mt-2 '>{products.product?.title}</p>

                            <div className="flex mt-4 items-center justify-start gap-3 ">
                                <p className=" text-3xl tracking-tight text-gray-900">${products.product?.discountedPrice}</p>
                                <p className="text-xl line-through  text-zinc-600">
                                    ${products.product?.price}
                                </p>
                                <p className="text-xl  text-green-600">
                                    {products.product?.discountPercent}%Off
                                </p>
                            </div>
                        </div>

                        {/* reviews */}

                        <div className="mt-5">
                            <div className='flex justify-start items-center gap-5'>

                                {/* Dynamic Rating Stars */}
                                <div className="flex items-center gap-2">
                                    <Rating
                                        name='read-only'
                                        value={Number(averageRating)} // Calculated Average
                                        precision={0.5}
                                        readOnly
                                    />
                                    <p className="font-bold text-gray-700">{averageRating.toFixed(1)}</p>
                                </div>

                                {/* Dynamic Counts */}
                                <p className='text-zinc-400 text-sm'>
                                    {totalReviews} Ratings
                                </p>
                                <p className='text-purple-800 text-sm font-medium cursor-pointer hover:text-purple-600'>
                                    {totalReviews} Reviews
                                </p>

                            </div>
                        </div>


                        <form className="mt-10">

                            {/* Sizes */}
                            <div className="mt-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Size guide
                                    </a>
                                </div>

                                <fieldset aria-label="Choose a size" className="mt-4">
                                    <div className="grid grid-cols-4 gap-3">
                                        {product.sizes.map((size) => (
                                            <label
                                                key={size.name}
                                                htmlFor={`size-${size.name}`}
                                                className={classNames(
                                                    size.inStock
                                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1',
                                                    selectedSize === size.name ? 'ring-2 ring-indigo-500 border-indigo-500' : 'border-gray-200'
                                                )}
                                            >
                                                <input
                                                    id={`size-${size.name}`}
                                                    defaultValue={size.name}
                                                    name="size"
                                                    type="radio"
                                                    disabled={!size.inStock}
                                                    checked={selectedSize === size.name}
                                                    onChange={() => setSelectedSize(size.name)}
                                                    className="sr-only" // Hidden radio button
                                                />
                                                <span className="text-sm font-medium uppercase">{size.name}</span>
                                                {!size.inStock ? (
                                                    <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                                        <svg
                                                            className="absolute inset-0 size-full stroke-2 text-gray-200"
                                                            viewBox="0 0 100 100"
                                                            preserveAspectRatio="none"
                                                            stroke="currentColor"
                                                        >
                                                            <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                        </svg>
                                                    </span>
                                                ) : null}
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>

                            <div className="mt-10">
                                <button
                                    type="submit"
                                    onClick={handleAddToCart}
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </form>

                        {/* Description and details */}
                        <div className="mt-10 border-t border-gray-200 pt-10">

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Product Description</h3>
                                <div className="mt-4 space-y-6">
                                    <p className="text-base text-gray-600">{products.product?.description}</p>
                                </div>
                            </div>

                            {/* Highlights */}
                            <div className="mt-10">
                                <h3 className="text-lg font-medium text-gray-900">Highlights</h3>
                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-base">
                                        {product.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="mt-10">
                                <h3 className="text-lg font-medium text-gray-900">Details</h3>
                                <div className="mt-4 space-y-6">
                                    <p className="text-base text-gray-600">{product.details}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                <section className='rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white'>
                    {/* Yahan productId pass karo */}
                    <ProductdetailReviwe productId={productId} />
                </section>

            </div>
        </div>
    )
}