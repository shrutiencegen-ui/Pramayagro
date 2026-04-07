import { useEffect, useState } from "react";
import API from "../../services/api";
import { 
  Trash2, 
  Edit3, 
  Search, 
  AlertCircle,
  X
} from "lucide-react";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  const [editImageFile, setEditImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    API.get("/admin/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
      console.log("BASE URL:", API.defaults.baseURL);
  };

  // ✅ DELETE
  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      await API.delete(`/admin/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ✅ START EDIT
  const startEditing = (product) => {
    setEditingProduct(product);

    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    });

    // cache fix
    setPreviewImage(`${product.image}?t=${Date.now()}`);
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setEditImageFile(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setEditImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ✅ SAVE EDIT (FINAL FIXED)
  const saveEdit = async () => {
    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("description", editForm.description);
      formData.append("price", editForm.price);
      formData.append("stock", editForm.stock);
      formData.append("category", editForm.category);

      if (editImageFile) {
        formData.append("image", editImageFile);
      }

      // ❌ DO NOT SET HEADERS
      await API.put(`/admin/products/${editingProduct.id}`, formData);

      await fetchProducts();
      setEditingProduct(null);

    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Inventory</h1>

        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 text-white px-4 py-2 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl">
        <table className="w-full">
          <thead className="bg-gray-800 text-gray-400 text-sm">
            <tr>
              <th className="p-5">Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th className="text-right pr-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-10 text-center text-gray-500">
                  <AlertCircle className="mx-auto mb-2 opacity-20" size={40}/>
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
               // Inside the table row <tr>
<tr key={p.id} className="border-t border-white/5 hover:bg-white/5">

  <td className="p-5 flex items-center gap-4">
    <img
      src={`${p.image}?t=${Date.now()}`}
      className="w-14 h-14 object-contain rounded-xl"
    />
    <div>
      <p className="text-white font-bold">{p.name}</p>
      <p className="text-xs text-gray-400">
        {/* Show category and short description */}
        <span className="mr-2">Category: {p.category}</span>
        {p.description.length > 50
          ? p.description.slice(0, 50) + "..."
          : p.description
        }
      </p>
    </div>
  </td>

  {/* Price: always required */}
  <td className="text-white font-semibold">₹{p.price}</td>

  {/* Stock: optional, show 0 if not set */}
  <td className={`${!p.stock || p.stock < 10 ? "text-red-400" : "text-green-400"}`}>
    {p.stock || 0}
  </td>

  <td className="text-right pr-6 space-x-2">
    <button onClick={() => startEditing(p)}>
      <Edit3 className="inline text-gray-400 hover:text-white"/>
    </button>
    <button onClick={() => deleteProduct(p.id)}>
      <Trash2 className="inline text-gray-400 hover:text-red-400"/>
    </button>
  </td>

</tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center backdrop-blur z-50">

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl w-[420px] shadow-2xl border border-white/10 relative">

            <button 
              onClick={cancelEditing}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X />
            </button>

            <h2 className="text-white text-2xl font-bold mb-5">
              Edit Product
            </h2>

            {/* IMAGE */}
            <div className="flex flex-col items-center mb-5">
              <img
                src={previewImage}
                className="w-28 h-28 rounded-xl object-cover"
              />

              <label className="text-emerald-400 mt-2 cursor-pointer">
                Change Image
                <input type="file" hidden onChange={handleImageChange}/>
              </label>
            </div>

            {/* FORM */}
            <div className="space-y-3">

  {/* NAME */}
  <input
    name="name"
    value={editForm.name || ""}
    onChange={handleEditChange}
    placeholder="Enter product name"
    className="w-full p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400"
  />

  {/* DESCRIPTION */}
  <textarea
    name="description"
    value={editForm.description || ""}
    onChange={handleEditChange}
    placeholder="Enter product description"
    className="w-full p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400"
  />

  {/* CATEGORY */}
  <select
    name="category"
    value={editForm.category || ""}
    onChange={handleEditChange}
    className="w-full p-3 rounded-xl bg-gray-800 text-white"
  >
    <option value="">Select Category</option>
    <option value="Adjuvant">Adjuvant</option>
    <option value="Micronutrient">Micronutrient</option>
    <option value="Fertilizer">Fertilizer</option>
    <option value="Bio Stimulant">Bio Stimulant</option>
  </select>

  {/* PRICE + STOCK */}
  <div className="flex gap-3">
    <input
      name="price"
      value={editForm.price || ""}
      onChange={handleEditChange}
      placeholder="Price"
      className="w-1/2 p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400"
    />

    <input
      name="stock"
      value={editForm.stock || ""}
      onChange={handleEditChange}
      placeholder="Stock"
      className="w-1/2 p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400"
    />
  </div>

  {/* BUTTON */}
  <button
    onClick={saveEdit}
    disabled={saving}
    className="w-full mt-4 bg-emerald-500 p-3 rounded-xl text-white font-semibold hover:bg-emerald-600 disabled:opacity-50"
  >
    {saving ? "Saving..." : "Save Changes"}
  </button>

</div>

          </div>
        </div>
      )}

    </div>
  );
}