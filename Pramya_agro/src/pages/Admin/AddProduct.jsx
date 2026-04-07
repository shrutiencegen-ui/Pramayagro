import { useState } from "react";
import API from "../../services/api";
import {
  PackagePlus, Tag, AlignLeft, IndianRupee,
  Layers, Image as ImageIcon, Loader2,
  CheckCircle2, AlertCircle, Upload, Trash2
} from "lucide-react";

export default function AddProduct({ onProductAdded }) {
  const [form, setForm] = useState({
    name: "",
    description_sections: [
      { title: "Composition", content: "" },
      { title: "Benefits", content: "" },
      { title: "Dosage", content: "" },
    ],
    price: "",
    stock: "",
    category: "Adjuvant",
    image: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.price || form.price <= 0) newErrors.price = "Enter valid price";

    form.description_sections.forEach((sec, idx) => {
      if (!sec.content.trim()) newErrors[`desc_${idx}`] = `${sec.title} required`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSectionChange = (i, value) => {
    const updated = [...form.description_sections];
    updated[i].content = value;
    setForm({ ...form, description_sections: updated });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("category", form.category);
    formData.append("description_sections", JSON.stringify(form.description_sections));
    if (form.image) formData.append("image", form.image);

    try {
      const token = localStorage.getItem("token");
      const res = await API.post("/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      setStatus("success");
      setForm({
        name: "",
        description_sections: [
          { title: "Composition", content: "" },
          { title: "Benefits", content: "" },
          { title: "Dosage", content: "" },
        ],
        price: "",
        stock: "",
        category: "Adjuvant",
        image: null
      });
      setImagePreview(null);

      if (onProductAdded) onProductAdded(res.data);
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400">
          <PackagePlus size={30} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Add Product</h1>
          <p className="text-gray-400 text-sm">Create and manage agro products</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {status === "success" && <StatusMsg type="success" text="Product added!" />}
        {status === "error" && <StatusMsg type="error" text="Something went wrong!" />}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-6">

            {/* BASIC INFO */}
            <Card title="Basic Info">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Product Name" name="name" value={form.name} onChange={handleChange} error={errors.name} className="sm:col-span-2" />
                <Input label="Price (₹)" name="price" type="number" value={form.price} onChange={handleChange} error={errors.price} />
                <Input label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} />
                
              </div>
            </Card>

            {/* DESCRIPTION */}
            <Card title="Description Sections">
              <div className="grid sm:grid-cols-3 gap-4">
                {form.description_sections.map((sec, i) => (
                  <div key={i}>
                    <p className="text-sm text-gray-400 mb-1">{sec.title}</p>
                    <textarea
                      rows={3}
                      value={sec.content}
                      onChange={(e) => handleSectionChange(i, e.target.value)}
                      className="w-full p-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* CATEGORY */}
            <Card title="Category">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 bg-white/[0.03] border border-white/10 rounded-xl text-white"
              >
                <option>Adjuvant</option>
                <option>Micronutrient</option>
                <option>Fertilizer</option>
                <option>Bio Stimulant</option>
                <option>Plant Growth</option>
              </select>
            </Card>

          </div>

          {/* RIGHT SIDE IMAGE */}
          <div>
            <Card title="Product Image">
              <div className="border-2 border-dashed border-white/10 rounded-2xl h-[260px] flex items-center justify-center relative group">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} className="h-full object-contain" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setForm({ ...form, image: null });
                      }}
                      className="absolute top-2 right-2 bg-red-500 p-2 rounded-full"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer text-center">
                    <Upload className="mx-auto mb-2 text-emerald-400" />
                    <p className="text-gray-400 text-sm">Upload Image</p>
                    <input type="file" hidden onChange={handleImageChange} />
                  </label>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* SUBMIT */}
        <button className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-black flex justify-center items-center gap-2">
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Publish Product"}
        </button>
      </form>
    </div>
  );
}

/* COMPONENTS */

function Card({ title, children }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl backdrop-blur-xl">
      <h2 className="text-white font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Input({ label, error, className = "", ...props }) {
  return (
    <div className={className}>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <input
        {...props}
        className={`w-full p-3 bg-white/[0.03] border ${error ? "border-red-500" : "border-white/10"} rounded-xl text-white`}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

function StatusMsg({ type, text }) {
  return (
    <div className={`p-3 rounded-xl text-sm ${type === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
      {text}
    </div>
  );
}