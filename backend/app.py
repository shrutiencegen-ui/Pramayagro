from datetime import datetime, timedelta

from flask import Flask, request, jsonify, send_from_directory
from config import Config
from models import db, bcrypt, User, Product, Order, OrderItem, CartItem, Career
from flask_jwt_extended import JWTManager, create_access_token, get_jwt, jwt_required,get_jwt_identity
from flask_cors import CORS
from werkzeug.utils import secure_filename
from routes.cart import cart_bp
import os
import json
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv


load_dotenv()


app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(cart_bp, url_prefix='/api/cart')

bcrypt.init_app(app)
jwt = JWTManager(app)

# cloudinary
cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
    secure=True
)


BASE_URL = os.environ.get("BASE_URL", "http://localhost:5000")
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173","https://pramayagro.vercel.app"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Origin"]
    }
}, supports_credentials=True)


db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/api/<path:path>', methods=["OPTIONS"])
def handle_options(path):
    response = app.make_response("")
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response

@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    return response
# ✅ HELPER FUNCTION FOR IMAGE URL (Cloudinary vs Local)
def get_image_url(image_name):
    if not image_name:
        return f"{BASE_URL}/static/uploads/default.jpg"
    if image_name.startswith('http'):
        return image_name
    return f"{BASE_URL}/static/uploads/{image_name}"

# ---------------- UPLOAD FOLDER ----------------
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# ✅ serve uploaded images
@app.route('/static/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# ---------------- REGISTER ----------------
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "Email already exists"}), 400

    user = User(
        name=data["name"],
        email=data["email"]
    )
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201


# ---------------- LOGIN ----------------
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"msg": "Email not found"}), 404

    if not user.check_password(password):
        return jsonify({"msg": "Incorrect password"}), 401

    access_token = create_access_token(
        identity=str(user.id), 
        additional_claims={"role": user.role}
    )
    
    expires = datetime.utcnow() + timedelta(seconds=3600)
    

    return jsonify({
        "token": access_token,
        "expires_at": expires.isoformat(),
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    })


# ---------------- GET PRODUCTS ----------------
@app.route("/api/admin/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    data = []

    for p in products:
        image_path = get_image_url(p.image)
        data.append({
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "stock": p.stock,
            "category": p.category,
            "description_sections": p.description_sections or {},
            "image": image_path
        })

    return jsonify(data)
# ---------------- ADD PRODUCT ----------------
@app.route("/api/admin/products", methods=["POST"])
@jwt_required()
def add_product():
    claims = get_jwt()
    if claims["role"] != "admin":
        return jsonify({"msg": "Admin only"}), 403

    # ------------------ Get Form Data ------------------
    name = request.form.get("name")
    price = request.form.get("price")
    stock = request.form.get("stock")
    category = request.form.get("category")
    description_sections_str = request.form.get("description_sections")  # JSON string from frontend

    # ------------------ Parse Description Sections ------------------
    description_sections = None
    description = ""  # Optional: concatenate for single string representation
    if description_sections_str:
        try:
            description_sections = json.loads(description_sections_str)
            # Concatenate all sections into a single description string
            description = " | ".join([f"{sec.get('title', '')}: {sec.get('content', '')}" for sec in description_sections])
        except json.JSONDecodeError:
            return jsonify({"msg": "Invalid JSON for description sections"}), 400

    # ------------------ Handle Image ------------------
    file = request.files.get("image")
    image_location = "default.jpg"
    if file:
        upload_result = cloudinary.uploader.upload(file, folder="pramay_products")
        image_location = upload_result['secure_url']

    # ------------------ Create Product ------------------
    product = Product(
        name=name,
        description=description,
        price=float(price) if price else 0,
        stock=int(stock) if stock else 0,
        category=category,
        image=image_location,
        description_sections=description_sections
    )

    db.session.add(product)
    db.session.commit()

    # ------------------ Return Response ------------------
    return jsonify({
        "msg": "Product added successfully",
        "product": {
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "stock": product.stock,
            "category": product.category,
            "description_sections": product.description_sections,
            "image": product.image
        }
    }), 201
# ------------- DELETE PRODUCT ----------------
@app.route("/api/admin/products/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_product(id):
    claims = get_jwt()

    if claims["role"] != "admin":
        return jsonify({"msg": "Admin only"}), 403

    product = Product.query.get_or_404(id)

    db.session.delete(product)
    db.session.commit()

    return jsonify({"msg": "Product deleted"})

# ---------------- UPDATE PRODUCT ----------------
@app.route("/api/admin/products/<int:id>", methods=["PUT"])
@jwt_required()
def update_product(id):
    claims = get_jwt()
    if claims["role"] != "admin":
        return jsonify({"msg": "Admin only"}), 403

    product = Product.query.get_or_404(id)

    if request.content_type.startswith("application/json"):
        data = request.json
        product.name = data.get("name", product.name)
        product.description = data.get("description", product.description)
        product.price = float(data.get("price", product.price))
        product.stock = int(data.get("stock", product.stock))
        product.category = data.get("category", product.category)
        if "description_sections" in data:
            try:
                product.description_sections = data["description_sections"]
            except Exception:
                pass

    else:
        product.name = request.form.get("name", product.name)
        product.description = request.form.get("description", product.description)
        price = request.form.get("price")
        stock = request.form.get("stock")
        category = request.form.get("category")
        if price: product.price = float(price)
        if stock: product.stock = int(stock)
        if category is not None:
            product.category = category

        file = request.files.get("image")
        if file:
            upload_result = cloudinary.uploader.upload(file, folder="pramay_products")
            product.image = upload_result['secure_url']

    db.session.commit()
    return jsonify({"msg": "Product updated successfully"})


@app.route("/api/admin/dashboard", methods=["GET"])
@jwt_required()
def admin_dashboard():

    claims = get_jwt()

    if claims.get("role") != "admin":
        return jsonify({"msg": "Admin only"}), 403

    total_users = User.query.filter_by(role="user").count()
    total_orders = Order.query.count()

    total_revenue = db.session.query(
        db.func.coalesce(db.func.sum(Order.total_price), 0)
    ).scalar()

    return jsonify({
        "total_users": total_users,
        "total_orders": total_orders,
        "total_revenue": float(total_revenue)
    })

@app.route("/api/admin/users", methods=["GET"])
@jwt_required()
def get_users():

    claims = get_jwt()

    if claims["role"] != "admin":
        return jsonify({"msg": "Admin access only"}), 403

    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 10, type=int)

    users_pagination = User.query.paginate(
        page=page,
        per_page=limit,
        error_out=False
    )

    result = []
    for u in users_pagination.items:
        result.append({
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role
        })

    return jsonify({
        "users": result,
        "pages": users_pagination.pages,
        "total": users_pagination.total
    })

#get orders 
@app.route("/api/admin/orders", methods=["GET"])
@jwt_required()
def admin_get_orders():
    claims = get_jwt()

    if claims["role"] != "admin":
        return jsonify({"msg": "Admin access only"}), 403

    orders = Order.query.order_by(Order.created_at.desc()).all()

    data = []

    for o in orders:
        data.append({
            "id": o.id,
            "user": o.user.email,
            "status": o.status,
            "total_price": o.total_price,
            "createdAt": o.created_at.strftime("%Y-%m-%d"),
            "products": [
                {
                    "product_id": item.product.id,
                    "name": item.product.name,
                    "price": item.price,
                    "quantity": item.quantity,
                    "image": get_image_url(item.product.image)
                }
                for item in o.items
            ]
        })

    return jsonify(data)

#Update orders
@app.route("/api/admin/orders/<int:id>", methods=["PUT"])
@jwt_required()
def admin_update_order(id):
    claims = get_jwt()
    if claims["role"] != "admin":
        return jsonify({"msg": "Admin only"}), 403

    order = Order.query.get_or_404(id)
    data = request.json
    status = data.get("status")
    if status:
        order.status = status
        db.session.commit()
        return jsonify({"msg": "Order status updated"})
    return jsonify({"msg": "No status provided"}), 400

#delete Order
@app.route("/api/admin/orders/<int:id>", methods=["DELETE"])
@jwt_required()
def admin_delete_order(id):
    claims = get_jwt()
    if claims["role"] != "admin":
        return jsonify({"msg": "Admin only"}), 403

    order = Order.query.get_or_404(id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({"msg": "Order deleted successfully"})


@app.route("/api/products", methods=["GET"])
def getall_products():
    products = Product.query.all()
    data = []

    for p in products:
        image_path = get_image_url(p.image)
        data.append({
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "description_sections": p.description_sections or {},
            "price": p.price,
            "stock": p.stock,
            "category": p.category,
            "image": image_path
        })

    return jsonify(data)

# ---------------- SEARCH PRODUCTS ----------------
@app.route("/api/products/search", methods=["GET"])
def search_products():
    q = request.args.get("q", "").strip().lower()
    if not q:
        return jsonify([])

    products = Product.query.filter(Product.name.ilike(f"%{q}%")).all()

    data = []
    for p in products:
        data.append({
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "stock": p.stock,
            "category": p.category,
            "image": get_image_url(p.image)
        })

    return jsonify(data)

@app.route("/api/orders", methods=["POST"])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    data = request.json

    try:
        new_order = Order(
            user_id=user_id,
            payment_method=data.get("payment"), 
            address=json.dumps(data.get("address")),
            total_price=float(data.get("total")) 
        )
        db.session.add(new_order)
        db.session.flush() 

        for p in data.get("products", []):
            item_price = p.get("price")
            if not item_price:
                product_record = Product.query.get(p["productId"])
                item_price = product_record.price

            order_item = OrderItem(
                order_id=new_order.id,
                product_id=p["productId"],
                quantity=p["quantity"],
                price=item_price
            )
            db.session.add(order_item)

        CartItem.query.filter_by(user_id=user_id).delete()
        
        db.session.commit()
        return jsonify({"msg": "Order placed successfully", "order_id": new_order.id}), 201

    except Exception as e:
        db.session.rollback()
        print(f"Error creating order: {str(e)}") 
        return jsonify({"msg": "Server error while placing order"}), 500

#product detail 
# ---------------- GET SINGLE PRODUCT ----------------
@app.route("/api/products/<int:product_id>", methods=["GET"])
def get_single_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"msg": "Product not found"}), 404

    # Cloudinary / Local image URL
    image_url = get_image_url(product.image)

    # Example: Specifications dictionary (if stored as JSON in DB)
    # You can store product.specifications as JSON in DB if needed
    specifications = {}
    if hasattr(product, "specifications") and product.specifications:
        try:
            # If stored as JSON string
            specifications = json.loads(product.specifications)
        except Exception:
            # Or if it's already a dict
            specifications = product.specifications if isinstance(product.specifications, dict) else {}

    data = {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "description_sections": product.description_sections or {},
        "price": product.price,
        "stock": product.stock,
        "category": product.category,
        "image": image_url,
        "specifications": specifications
    }

    return jsonify(data)
    
@app.route("/api/orders", methods=["GET"])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.created_at.desc()).all()
    data = []
    for o in orders:
        data.append({
            "id": o.id,
            "status": o.status,
            "payment": o.payment_method,
            "total": o.total_price,
            "createdAt": o.created_at.strftime("%Y-%m-%d"),
            "products": [
                {
                    "product_id": item.product.id,
                    "name": item.product.name,
                    "price": item.price,
                    "quantity": item.quantity,
                    "image": get_image_url(item.product.image)
                } for item in o.items
            ]
        })
    return jsonify(data)

from collections import Counter

@app.route('/api/admin/stats', methods=['GET'])
def get_stats():
    total_users = User.query.filter_by(role="user").count()
    orders = Order.query.all()
    total_revenue = sum(order.total_price for order in orders)
    
    product_counts = Counter()
    product_revenue = Counter()
    
    for order in orders:
        for item in order.items: 
            p_name = item.product.name 
            product_counts[p_name] += item.quantity
            product_revenue[p_name] += (item.price * item.quantity)

    product_stats = []
    for name, sales in product_counts.items():
        product_stats.append({
            "name": name,
            "sales": sales,
            "revenue": product_revenue[name]
        })

    return jsonify({
        "total_users": total_users,
        "total_orders": len(orders),
        "total_revenue": float(total_revenue),
        "product_stats": product_stats 
    })
@app.route("/api/create-first-admin")
def create_first_admin():
     
    admin_exists = User.query.filter_by(email="admin@gmail.com").first()
    if not admin_exists:
        new_admin = User(
            name="Admin",
            email="admin@gmail.com",
            role="admin"  
        )
        new_admin.set_password("admin123") 
        db.session.add(new_admin)
        db.session.commit()
        return "Admin created successfully!"
    return "Admin already exists."

# Add a job - Admin
@app.route("/api/admin/careers", methods=["POST"])
@jwt_required()
def add_career():
    claims = get_jwt()
    if claims["role"] != "admin":
        return jsonify({"msg": "Admin only"}), 403

    data = request.json
    job = Career(
        title=data.get("title"),
        role=data.get("role"),
        description=data.get("description"),
        requirements=data.get("requirements"),
        location=data.get("location")
    )
    db.session.add(job)
    db.session.commit()
    return jsonify({"msg": "Job added successfully"}), 201
# ----------------------------
# UPDATE A JOB
# ----------------------------
@app.route("/api/admin/careers/<int:job_id>", methods=["PUT"])
@jwt_required()
def update_career(job_id):
    claims = get_jwt()
    if claims.get("role") != "admin":
        return jsonify({"msg": "Admin only"}), 403

    job = Career.query.get(job_id)
    if not job:
        return jsonify({"msg": "Job not found"}), 404

    data = request.json
    job.title = data.get("title", job.title)
    job.role = data.get("role", job.role)
    job.description = data.get("description", job.description)
    job.requirements = data.get("requirements", job.requirements)
    job.location = data.get("location", job.location)

    db.session.commit()
    return jsonify({"msg": "Job updated successfully"}), 200

# ----------------------------
# DELETE A JOB
# ----------------------------
@app.route("/api/admin/careers/<int:job_id>", methods=["DELETE"])
@jwt_required()
def delete_career(job_id):
    claims = get_jwt()
    if claims.get("role") != "admin":
        return jsonify({"msg": "Admin only"}), 403

    job = Career.query.get(job_id)
    if not job:
        return jsonify({"msg": "Job not found"}), 404

    db.session.delete(job)
    db.session.commit()
    return jsonify({"msg": "Job deleted successfully"}), 200
# Get all jobs - User
@app.route("/api/careers", methods=["GET"])
def get_careers():
    jobs = Career.query.order_by(Career.created_at.desc()).all()
    data = []
    for job in jobs:
        data.append({
            "id": job.id,
            "title": job.title,
            "role": job.role,
            "description": job.description,
            "requirements": job.requirements,
            "location": job.location
        })
    return jsonify(data)
if __name__ == "__main__":
    app.run(debug=True)