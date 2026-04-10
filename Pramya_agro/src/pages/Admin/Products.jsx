import { useEffect, useState } from "react";
import API from "../../services/api";
import { Trash2, Edit3, AlertCircle, X } from "lucide-react";

export default function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    description_sections: [
      { title: "Composition", content: "" },
      { title: "Benefits", content: "" },
      { title: "Dosage", content: "" },
    ],
    price: "",
    stock: "",
    category: ""
  });

  const [previewImage, setPreviewImage] = useState(null); // ✅ FIX
  const [editImageFile, setEditImageFile] = useState(null); // ✅ FIX
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    API.get("/admin/products")
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  // DELETE
  const deleteProduct = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      await API.delete(`/admin/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  // START EDIT
  const startEditing = (p) => {

    let sections = p.description_sections;

    // ✅ HANDLE STRING DATA
    if (typeof sections === "string") {
      try {
        sections = JSON.parse(sections);
      } catch {
        sections = [];
      }
    }

    setEditingProduct(p);

    setEditForm({
      name: p.name || "",
      description: p.description || "",
      description_sections: sections?.length ? sections : [
        { title: "Composition", content: "" },
        { title: "Benefits", content: "" },
        { title: "Dosage", content: "" },
      ],
      price: p.price || "",
      stock: p.stock || "",
      category: p.category || ""
    });

    // ✅ IMAGE FIX
    setPreviewImage(p.image ? `${p.image}?t=${Date.now()}` : null);
    setEditImageFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (i, value) => {
    const updated = [...editForm.description_sections];
    updated[i].content = value;
    setEditForm({ ...editForm, description_sections: updated });
  };

  // ✅ IMAGE CHANGE FIX
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // SAVE
  const saveEdit = async () => {
    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("description", editForm.description);
      formData.append("price", editForm.price);
      formData.append("stock", editForm.stock);
      formData.append("category", editForm.category);
      formData.append(
        "description_sections",
        JSON.stringify(editForm.description_sections)
      );

      // ✅ IMAGE SEND
      if (editImageFile) {
        formData.append("image", editImageFile);
      }

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

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-white font-bold">Products</h1>

        <input
          placeholder="Search..."
          className="bg-gray-800 text-white px-4 py-2 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-gray-900 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-400">
            <tr>
              <th className="p-4">Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Sections</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filteredProducts.map((p) => (
              <tr key={p.id} className="border-t border-white/5 hover:bg-white/5">

                {/* IMAGE */}
                <td className="p-4">
                  {p.image ? (
                    <img
                      src={`${p.image}?t=${Date.now()}`}
                      className="w-14 h-14 object-contain rounded-xl bg-white/5 p-1"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center">
                      <AlertCircle className="text-gray-500" />
                    </div>
                  )}
                </td>

                <td className="text-white font-semibold">{p.name}</td>

                <td className="text-gray-400 max-w-[200px]">
                  {p.description ? p.description.slice(0, 60) + "..." : "-"}
                </td>

                <td className="text-gray-400 text-xs">
                  {p.description_sections?.map((sec, i) => (
                    <div key={i}>
                      <span className="text-white">{sec.title}:</span>{" "}
                      {sec.content.slice(0, 25)}...
                    </div>
                  ))}
                </td>

                <td className="text-white">₹{p.price}</td>
                <td className="text-white">{p.stock}</td>

                <td className="text-right pr-4 space-x-2">
                  <button onClick={() => startEditing(p)}>
                    <Edit3 className="inline text-gray-400 hover:text-white"/>
                  </button>
                  <button onClick={() => deleteProduct(p.id)}>
                    <Trash2 className="inline text-gray-400 hover:text-red-400"/>
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editingProduct && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur flex justify-center items-center z-50">

    <div className="bg-gradient-to-br from-gray-900 to-gray-800 w-[1000px] max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-white/10 p-8 relative">

      {/* CLOSE */}
      <button
        onClick={() => setEditingProduct(null)}
        className="absolute top-5 right-5 text-gray-400 hover:text-white"
      >
        <X size={22} />
      </button>

      <h2 className="text-3xl font-bold text-white mb-6">
        Edit Product
      </h2>

      <div className="grid grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="col-span-2 space-y-6">

          {/* BASIC INFO */}
          <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10">
            <h3 className="text-white font-semibold mb-4">Basic Info</h3>

            <input
              name="name"
              value={editForm.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-3 mb-4 rounded-xl bg-gray-800 text-white"
            />

            <textarea
              name="description"
              value={editForm.description}
              onChange={handleChange}
              placeholder="Full Description"
              rows={4}
              className="w-full p-3 rounded-xl bg-gray-800 text-white"
            />
          </div>

          {/* DESCRIPTION SECTIONS */}
          <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10">
            <h3 className="text-white font-semibold mb-4">
              Description Sections
            </h3>

            <div className="space-y-4">
              {editForm.description_sections.map((sec, i) => (
                <div key={i} className="bg-black/30 p-4 rounded-xl">
                  <p className="text-sm text-gray-400 mb-2">
                    {sec.title}
                  </p>
                  <textarea
                    rows={4}
                    value={sec.content}
                    onChange={(e) =>
                      handleSectionChange(i, e.target.value)
                    }
                    className="w-full p-3 bg-gray-800 text-white rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* PRICING */}
          <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10">
            <h3 className="text-white font-semibold mb-4">Pricing & Stock</h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="price"
                value={editForm.price}
                onChange={handleChange}
                placeholder="Price"
                className="p-3 bg-gray-800 text-white rounded-xl"
              />

              <input
                name="stock"
                value={editForm.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="p-3 bg-gray-800 text-white rounded-xl"
              />
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* IMAGE */}
          <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10">
            <h3 className="text-white font-semibold mb-4">
              Product Image
            </h3>

            <div className="border-2 border-dashed border-white/10 rounded-2xl h-[220px] flex items-center justify-center relative group">

              {previewImage ? (
                <>
                  <img
                    src={previewImage}
                    className="h-full object-contain"
                  />

                  <label className="absolute bottom-2 bg-black/60 px-3 py-1 rounded-lg text-sm cursor-pointer">
                    Change
                    <input
                      type="file"
                      hidden
                      onChange={handleImageChange}
                    />
                  </label>
                </>
              ) : (
                <label className="cursor-pointer text-center">
                  <p className="text-gray-400 text-sm">
                    Upload Image
                  </p>
                  <input
                    type="file"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>
              )}

            </div>
          </div>

          {/* CATEGORY */}
          <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10">
            <h3 className="text-white font-semibold mb-4">Category</h3>

            <select
              name="category"
              value={editForm.category}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded-xl"
            >
              <option>Adjuvant</option>
              <option>Micronutrient</option>
              <option>Fertilizer</option>
              <option>Bio Stimulant</option>
              <option>Plant Growth</option>
            </select>
          </div>

        </div>
      </div>

      {/* SAVE */}
      <button
        onClick={saveEdit}
        disabled={saving}
        className="mt-8 w-full bg-emerald-500 hover:bg-emerald-600 p-4 rounded-xl text-white font-bold text-lg"
      >
        {saving ? "Saving Changes..." : "Save Changes"}
      </button>

    </div>
  </div>
)}

    </div>
  );
}