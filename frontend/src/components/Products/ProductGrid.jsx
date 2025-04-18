import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    // Можно добавить более детальный вывод ошибки, если нужно
    return <p>Error loading products. Please try again later.</p>;
  }

  // Добавим проверку на случай, если products вообще не массив или пустой
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Используем product._id как ключ, предполагая его уникальность */}
      {products.map((product) => (
        // Добавим проверку на случай, если сам product вдруг null или undefined
        product && product._id ? (
          <Link key={product._id} to={`/product/${product._id}`} className="block">
            <div className="bg-white p-4 rounded-lg">
              <div className="w-full h-96 mb-4">
                <img
                  // Безопасный доступ к URL через optional chaining
                  // Если product.images нет, или images[0] нет, или url нет - вернется undefined
                  src={product.images?.[0]?.url}
                  // Безопасный доступ к alt тексту + fallback на имя продукта
                  alt={product.images?.[0]?.alText || product.name || 'Product image'} // Добавил еще один fallback для alt
                  className="w-full h-full object-cover rounded-lg"
                  // Можно добавить onError для обработки случая, если картинка не загрузится
                  onError={(e) => {
                    // Например, установить картинку-заглушку
                    // e.target.onerror = null; // Предотвратить бесконечный цикл, если заглушка тоже недоступна
                    // e.target.src = "/path/to/placeholder.jpg";
                    console.error(`Failed to load image: ${product.images?.[0]?.url}`);
                  }}
                />
              </div>
              {/* Добавим проверку для name и price на всякий случай */}
              <h3 className="text-sm mb-2">{product.name || 'Unnamed Product'}</h3>
              <p className="text-gray-500 font-medium text-sm tracking-tighter">
                {typeof product.price === 'number' ? `$ ${product.price}` : 'Price unavailable'}
              </p>
            </div>
          </Link>
        ) : null // Пропускаем рендер, если product или product._id отсутствуют
      ))}
    </div>
  );
};

export default ProductGrid;
