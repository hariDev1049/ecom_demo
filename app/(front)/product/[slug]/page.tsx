import data from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import AddToCart from '@/components/Products/AddToCart';
import productServices from '@/lib/services/ProductServices';
import { convertDocToObj } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: { slug: String };
}) {
  const product = await productServices.getProductBySlug(params.slug);
  if (!product) {
    return <h2>OOps...No Product found..!</h2>;
  }
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productServices.getProductBySlug(params.slug);
  if (!product) {
    return <h2>OOps...No Product found..!</h2>;
  }

  return (
    <>
      <div className="my-2">
        <Link href="\">Back to All products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div>
          <ul className="space-y-4 m-4">
            <li>
              <h1 className="text-xl">{product.name}</h1>
            </li>
            <li>
              <h2 className="text-l">
                {product.rating} of {product.numReviews} reviews.
              </h2>
            </li>
            <li>
              <h3>{product.brand}</h3>
            </li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              <h3>Description: {product.description}</h3>
            </li>
          </ul>
        </div>
        <div className="card bg-base-300 shadow-xl mt-3 md:mt-0 mb-5">
          <div className="card-body">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</div>
            </div>
            {product.countInStock !== 0 && (
              <div className="card-actions justify-center">
                <AddToCart
                  item={{
                    ...convertDocToObj(product),
                    qty: 0,
                    color: '',
                    size: '',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
