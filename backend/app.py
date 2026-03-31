from datetime import datetime, timedelta

from flask import Flask, request, jsonify, send_from_directory
from config import Config
from models import db, bcrypt, User, Product, Order, OrderItem, CartItem
from flask_jwt_extended import JWTManager, create_access_token, get_jwt, jwt_required,get_jwt_identity
from flask_cors import CORS
from werkzeug.utils import secure_filename
from routes.cart import cart_bp
import os
import json
import cloudinary
import cloudinary.uploader

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
    r"/*": {
        "origins": ["http://localhost:5173","https://pramayagro.vercel.app"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
}, supports_credentials=True)


db.init_app(app)

with app.app_context():
    db.create_all()

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
@app.route("/api/register", methods=["POST"])
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
@app.route("/api/products", methods=["GET"])
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

    name = request.form.get("name")
    description = request.form.get("description")
    price = request.form.get("price")
    stock = request.form.get("stock")
    category = request.form.get("category")

    file = request.files.get("image")
    image_location = "default.jpg"

    if file:
        upload_result = cloudinary.uploader.upload(file, folder="pramay_products")
        image_location = upload_result['secure_url']

    product = Product(
        name=name,
        description=description,
        price=float(price) if price else 0,
        stock=int(stock) if stock else 0,
        category=category,
        image=image_location
    )

    db.session.add(product)
    db.session.commit()

    return jsonify({"msg": "Product added successfully"}), 201


# ---------------- DELETE PRODUCT ----------------
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
    else:
        product.name = request.form.get("name", product.name)
        product.description = request.form.get("description", product.description)
        price = request.form.get("price")
        stock = request.form.get("stock")
        if price: product.price = float(price)
        if stock: product.stock = int(stock)

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

if __name__ == "__main__":
    app.run(debug=True)