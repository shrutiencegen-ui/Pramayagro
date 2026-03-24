export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded-md"
      />

      <h3 className="mt-3 font-semibold text-lg">
        {product.name}
      </h3>

      <p className="text-green-700 font-bold mt-1">
        ₹{product.price}
      </p>

      <button className="mt-3 w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800">
        Add to Cart
      </button>

    </div>
  )
}