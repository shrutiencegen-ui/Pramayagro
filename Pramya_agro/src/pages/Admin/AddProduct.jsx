import { useState } from "react";
import API from "../../services/api";
import { 
  PackagePlus, Tag, AlignLeft, IndianRupee, 
  Layers, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, Upload
} from "lucide-react";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",       // optional now
    category: "Adjuvant", // Default to agro category
    image: null      // optional now
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.price || form.price <= 0) newErrors.price = "Enter a valid price";
    // Stock optional: no validation
    // Image optional: no validation
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
      if (errors.image) setErrors({ ...errors, image: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    if (form.stock) formData.append("stock", form.stock);  // optional
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image); // optional

    try {
      const token = localStorage.getItem("token"); 

      await API.post("/api/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });
      
      setStatus('success');
      setForm({ name: "", description: "", price: "", stock: "", category: "Adjuvant", image: null });
      setImagePreview(null);
    } catch (err) {
      console.error("Error details:", err.response?.data);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
          <PackagePlus size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Add New Product</h1>
          <p className="text-gray-400 text-sm">Add agro products with price and category.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl space-y-8">
        
        {status === 'success' && <StatusMsg type="success" text="Product added successfully!" />}
        {status === 'error' && <StatusMsg type="error" text="Failed to add product. Check server." />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: Basic Info */}
          <div className="space-y-6">
            <InputGroup 
              label="Product Name" name="name" icon={<Tag size={18} />} 
              value={form.name} onChange={handleChange} error={errors.name}
              placeholder="e.g. बंधन / व्हिक्टरी झिंक EDTA"
            />

            <InputGroup 
              label="Price (₹)" name="price" type="number" icon={<IndianRupee size={18} />} 
              value={form.price} onChange={handleChange} error={errors.price}
              placeholder="250"
            />

            <InputGroup 
              label="Stock (optional)" name="stock" type="number" icon={<Layers size={18} />} 
              value={form.stock} onChange={handleChange} error={errors.stock}
              placeholder="e.g. 500"
            />

            <div className="space-y-2 text-white">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                <AlignLeft size={14} /> Description
              </label>
              <textarea
                name="description" rows="4" value={form.description} onChange={handleChange}
                placeholder="Describe product composition, benefits, dosage..."
                className={`w-full p-4 bg-white/[0.03] border ${errors.description ? 'border-red-500/50' : 'border-white/10'} rounded-2xl focus:outline-none focus:border-emerald-500/50 transition-all resize-none`}
              />
              {errors.description && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
                <Tag size={14} /> Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full appearance-none p-4 pr-12 bg-white/[0.03] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer hover:bg-white/[0.05]"
                >
                  <option value="Adjuvant" className="bg-[#0b0f0f]">Adjuvant</option>
                  <option value="Micronutrient" className="bg-[#0b0f0f]">Micronutrient</option>
                  <option value="Fertilizer" className="bg-[#0b0f0f]">Fertilizer</option>
                  <option value="Bio Stimulant" className="bg-[#0b0f0f]">Bio Stimulant</option>
                  <option value="Plant Growth" className="bg-[#0b0f0f]">Plant Growth</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
              </div>
            </div>
          </div>

          {/* Right Side: Image Upload (optional) */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
              <ImageIcon size={14} /> Product Image (optional)
            </label>
            <div className={`relative group border-2 border-dashed ${errors.image ? 'border-red-500/30' : 'border-white/10'} rounded-[2rem] overflow-hidden h-[300px] flex items-center justify-center bg-white/[0.02] hover:bg-white/[0.04] transition-all`}>
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <button type="button" onClick={() => setImagePreview(null)} className="bg-red-500 p-2 rounded-full text-white">
                       <Trash2 size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-3">
                  <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-400 group-hover:scale-110 transition-all">
                    <Upload size={24} />
                  </div>
                  <span className="text-gray-400 text-sm font-medium text-center px-6">Click to upload product photo (optional)</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>
        </div>

        <button 
          disabled={isSubmitting}
          className={`w-full py-4 rounded-2xl font-bold text-black transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20
            ${isSubmitting ? 'bg-emerald-700' : 'bg-emerald-500 hover:bg-emerald-400 hover:scale-[1.01]'}`}
        >
          {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Saving Product...</> : "Publish Product"}
        </button>
      </form>
    </div>
  );
}

// Sub-components
function InputGroup({ label, icon, error, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1 flex items-center gap-2">
        {icon} {label}
      </label>
      <input
        {...props}
        className={`w-full p-4 bg-white/[0.03] border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all`}
      />
      {error && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">{error}</p>}
    </div>
  );
}

function StatusMsg({ type, text }) {
  return (
    <div className={`flex items-center gap-3 p-4 ${type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'} border rounded-2xl animate-in fade-in slide-in-from-top-2`}>
      {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <span className="font-medium text-sm">{text}</span>
    </div>
  );
}

const Trash2 = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/>
  </svg>
);