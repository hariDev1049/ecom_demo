import ProductItem from "@/components/Products/ProductItem";
import data from "@/lib/data";

export default function Home() {
  return (
    <>
      <h2 className="texr-2xl py-2">Latest featured products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          data.products.map((product)=>{
            return <ProductItem key={product.slug}
            product={product}/>
          })
        }
      </div>
    </>
  );
}
