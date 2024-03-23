import ProductItem from '@/components/Products/ProductItem';
import { convertDocToObj } from '@/lib/utils';
import productServices from '@/lib/services/ProductServices';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: process.env.NEXT_APP_TITLE || 'Ecom App using Next Js',
  description:
    process.env.NEXT_APP_DESCRIPTION ||
    'Next EComm APP built using Next js MongoDB Zustand Daisy UI and Others stuffs',
};

export default async function Home() {
  const featuredProducts = await productServices.getFeatured();
  const latestProducts = await productServices.getLatest();

  return (
    <>
      <div className="w-full carousel rounded-box mt-4">
        {featuredProducts.map((prod, index) => (
          <div
            key={prod.slug}
            id={`slide-${index}`}
            className="carousel-item relative w-full"
          >
            <Link href={`/product/${prod.slug}`}>
              <img src={prod.image} className="w-full" alt={prod.name} />
            </Link>
            <div className="absolute flex justify-between transform-translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide-${
                  index === 0 ? featuredProducts.length - 1 : index - 1
                }`}
                className="btn btn-circle"
              >
                &lt;
              </a>
              <a
                href={`#slide-${
                  index === featuredProducts.length - 1 ? 0 : index + 1
                }`}
                className="btn btn-circle"
              >
                &gt;
              </a>
            </div>
          </div>
        ))}
      </div>

      <h2 className="texr-2xl py-2">Latest featured products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts.map((product) => {
          return (
            <ProductItem
              key={product.slug}
              product={convertDocToObj(product)}
            />
          );
        })}
      </div>
    </>
  );
}
