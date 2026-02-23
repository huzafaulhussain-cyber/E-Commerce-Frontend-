'use client'

import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../State/product/Action';
import Pagination from '@mui/material/Pagination';


const sortOptions = [
    { name: 'Price: Low to High', value: 'price_low', current: false },
    { name: 'Price: High to Low', value: 'price_high', current: false },
]


const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: false },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
            { value: 'yellow', label: 'Yellow', checked: false },
            { value: 'black', label: 'Black', checked: false },
        ],
    },

    {
        id: 'size',
        name: 'Size',
        options: [
            { value: 'S', label: 'S', checked: false },
            { value: 'M', label: 'M', checked: false },
            { value: 'L', label: 'L', checked: false },

        ],
    },

    {
        id: 'price',
        name: 'Price Range',
        options: [
            { value: '159-399', label: '$159 to $399' },
            { value: '399-999', label: '$399 to $999' },
            { value: '999-1999', label: '$999 to $1999' },
            { value: '1999-2999', label: '$1999 to $2999' },
            { value: '3999-4999', label: '$3999 to $4999' },
        ],
    },

    {
        id: 'discount',
        name: 'Discount Range',
        options: [
            { value: '10-20', label: '10% - 20% Off', checked: false },
            { value: '20-30', label: '20% - 30% Off', checked: false },
            { value: '30-50', label: '30% - 50% Off', checked: false },
            { value: '50+', label: '50% Above', checked: false },
        ],
    },

    {
        id: 'availability',
        name: 'Availability',
        options: [
            { value: 'in-stock', label: 'In Stock', checked: false },
            { value: 'out-of-stock', label: 'Out of Stock', checked: false },
        ],
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Product = () => {

    const handlePaginationChange = (event, value) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("pageNumber", value); // Backend pageNumber mang raha hai
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const param = useParams();
    const dispatch = useDispatch();

    const product = useSelector((store) => store.products || {});

    console.log("Product from store:", product);
    console.log("Products array:", product?.products);

    const searchParams = new URLSearchParams(location.search);
    const colorValue = searchParams.get('color');
    const sizeValue = searchParams.get('size');
    const priceValue = searchParams.get('price');
    const discount = searchParams.get('discount');
    const sortValue = searchParams.get('sort');
    const stock = searchParams.get('availability');

    useEffect(() => {
        const [minPrice, maxPrice] = priceValue === null ? [0, 1000000] : priceValue.split('-').map(Number);

        // Page number ko URL se lein, agar nahi hai to 1 use karein.
        const pageNumber = searchParams.get("pageNumber") || 1;

        const data = {
            category: param.levelThree || "",
            color: colorValue || "",
            sizes: sizeValue || "",
            minPrice,
            maxPrice,
            minDiscount: discount || 0,
            sort: sortValue || "price_low",
            pageNumber: pageNumber, // Backend 1-based page number mangta hai, isliye -1 nahi karna.
            pageSize: 6, // Aapki requirement ke mutabiq 6 products per page.
            stock: stock || ""
        };

        dispatch(findProducts(data));

    }, [param.levelThree, colorValue, sizeValue, priceValue, discount, sortValue, stock, dispatch, location.search]);
    const handleFilter = (value, sectionId) => {
        const searchParams = new URLSearchParams(location.search);
        let filterValue = searchParams.get(sectionId)?.split(",") || [];

        if (filterValue.includes(value)) {
            filterValue = filterValue.filter((item) => item !== value);
            if (filterValue.length === 0) searchParams.delete(sectionId);
            else searchParams.set(sectionId, filterValue.join(","));
        } else {
            if (sectionId === 'price') searchParams.set(sectionId, value);
            else {
                filterValue.push(value);
                searchParams.set(sectionId, filterValue.join(","));
            }
        }
        navigate({ search: `?${searchParams.toString()}` });
    };

    const handleSort = (value) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('sort', value);
        navigate({ search: `?${searchParams.toString()}` });
    };

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Categories</h3>


                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                    <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex gap-3">
                                                        <div className="flex h-5 shrink-0 items-center">
                                                            <div className="group grid size-4 grid-cols-1">
                                                                <input
                                                                    defaultValue={option.value}
                                                                    checked={searchParams.get(section.id)?.split(',')?.includes(option.value) || false}
                                                                    onChange={() => handleFilter(option.value, section.id)}
                                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    type="checkbox"
                                                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                />
                                                                <svg
                                                                    fill="none"
                                                                    viewBox="0 0 14 14"
                                                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                                >
                                                                    <path
                                                                        d="M3 8L6 11L11 3.5"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-checked:opacity-100"
                                                                    />
                                                                    <path
                                                                        d="M3 7H11"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-indeterminate:opacity-100"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <label
                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                            className="min-w-0 flex-1 text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto  px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200  pb-6">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>


                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                    />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >


                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <button
                                                    onClick={() => handleSort(option.value)}
                                                    className={classNames(
                                                        searchParams.get('sort') === option.value ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block w-full text-left px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                                                    )}
                                                >
                                                    {option.name}
                                                </button>
                                            </MenuItem>
                                        ))}
                                    </div>


                                </MenuItems>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon aria-hidden="true" className="size-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="size-5" />
                            </button>
                        </div>

                    </div>

                    <div className="flex items-baseline justify-between border-b border-gray-200  py-5">
                        <h3 className="text-xl opacity-50 font-semibold text-gray-900  ">Filters</h3>

                    </div>

                    <section aria-labelledby="products-heading" className=" pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block  ">
                                <h3 className="sr-only">Categories</h3>

                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6  ">
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                    <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6 ">
                                            <div className="space-y-4">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex gap-3">
                                                        <div className="flex h-5 shrink-0 items-center">
                                                            <div className="group grid size-4 grid-cols-1">


                                                                <input
                                                                    onChange={() => handleFilter(option.value, section.id)}
                                                                    defaultValue={option.value}
                                                                    checked={searchParams.get(section.id)?.split(',')?.includes(option.value) || false}
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`} // Array format for multiple selections
                                                                    type="checkbox" // ✅ Changed to checkbox
                                                                    className="col-start-1 row-start-1 appearance-none rounded-full border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                />

                                                                <svg
                                                                    fill="none"
                                                                    viewBox="0 0 14 14"
                                                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                                >
                                                                    <path
                                                                        d="M3 8L6 11L11 3.5"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-checked:opacity-100"
                                                                    />
                                                                    <path
                                                                        d="M3 7H11"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-indeterminate:opacity-100"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3 ">
                                <div className="flex flex-wrap justify-center py-5">
                                    {product.products?.content?.length > 0 ? (
                                        [...product.products.content]
                                            // .reverse()
                                            .map((item) => (
                                                <ProductCard key={item._id} product={item} />
                                            ))
                                    ) : (
                                        <div className="py-10 text-center">
                                            <p className="text-gray-500">
                                                No products found. Total: {product.products?.content?.length || 0}
                                            </p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='w-full px=[3.6rem]'>
                        <div className='flex justify-center p-5 '>
                            <div className="flex justify-center mt-10">
                                <Pagination
                                    count={product.products?.totalPages}  // <-- YEH SABSE ZAROORI HAI
                                    sx={{
                                        '& .Mui-selected': {
                                            backgroundColor: '#248035 !important',
                                            color: '#fff',
                                        },
                                    }} onChange={handlePaginationChange}
                                    page={parseInt(searchParams.get("pageNumber")) || 1} // Taake pagination hamesha sahi page par active rahe
                                />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Product;
