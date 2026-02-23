export const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', id: 'women_top' },
            { name: 'Dresses', id: 'women_dress' },
            { name: 'Women Jeans', id: 'women_jeans' },
            { name: 'Lengha Choli', id: 'women_lengha_choli' },
            { name: 'Sweaters', id: 'women_sweater' },
            { name: 'T-Shirts', id: 'women_t-shirt' },
            { name: 'Jackets', id: 'women_jacket' },
            { name: 'Gowns', id: 'women_gouns' },
            { name: 'Sarees', id: 'women_saree' },
            { name: 'Kurtas', id: 'women_kurtas' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'women_watch' },
            { name: 'Wallets', id: 'women_wallet' },
            { name: 'Bags', id: 'women_bag' },
            { name: 'Sunglasses', id: 'women_sunglasses' },
            { name: 'Hats', id: 'women_hat' },
            { name: 'Belts', id: 'women_belt' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            // 👇 IDs Change Kar Di Hain (Unique)
            { name: 'Full Nelson', id: 'women_full_nelson' },
            { name: 'My Way', id: 'women_my_way' },
            { name: 'Re-Arranged', id: 'women_re_arranged' },
            { name: 'Counterfeit', id: 'women_counterfeit' },
            { name: 'Significant Other', id: 'women_significant_other' }
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          id: '#',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          id: '#',
          imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt: 'Three shirts in gray, white, and blue.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Mens Kurtas', id: 'men_kurtas' },
            { name: 'Shirt', id: 'men_shirt' },
            { name: 'Men Jeans', id: 'men_jeans' },
            { name: 'Sweaters', id: 'men_sweater' },
            { name: 'T-Shirts', id: 'men_t-shirt' },
            { name: 'Jackets', id: 'men_jacket' },
            { name: 'Activewear', id: 'men_activewear' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'men_watches' },
            { name: 'Wallets', id: 'men_wallets' },
            { name: 'Bags', id: 'men_bags' },
            { name: 'Sunglasses', id: 'men_sunglasses' },
            { name: 'Hats', id: 'men_hats' },
            { name: 'Belts', id: 'men_belts' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            // 👇 Men ke liye 'men_' laga diya
            { name: 'Re-Arranged', id: 'men_re_arranged' },
            { name: 'Counterfeit', id: 'men_counterfeit' },
            { name: 'Full Nelson', id: 'men_full_nelson' },
            { name: 'My Way', id: 'men_my_way' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', id: '/' },
    { name: 'Stores', id: '/' },
  ],
};