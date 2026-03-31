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

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(cart_bp, url_prefix='/api/cart')

bcrypt.init_app(app)
jwt = JWTManager(app)
BASE_URL = os.environ.get("BASE_URL", "http://localhost:5000")
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173","https://pramayagro.vercel.app/"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
}, supports_credentials=True)


db.init_app(app)

with app.app_context():
    db.create_all()

# ---------------- UPLOAD FOLDER ----------------
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])



# ✅ IMPORTANT: serve uploaded images
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
        data.append({
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "stock": p.stock,
            "category": p.category,
            # ✅ FIXED IMAGE PATH
            "image": f"{BASE_URL}/static/uploads/{p.image}" if p.image else f"{BASE_URL}/static/uploads/default.jpg"
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
    image_filename = "default.jpg"

    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        image_filename = filename

    product = Product(
        name=name,
        description=description,
        price=float(price) if price else 0,
        stock=int(stock) if stock else 0,
        category=category,
        image=image_filename
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

    # Detect if data is JSON or form-data
    if request.content_type.startswith("application/json"):
        data = request.json
        product.name = data.get("name", product.name)
        product.description = data.get("description", product.description)
        product.price = float(data.get("price", product.price))
        product.stock = int(data.get("stock", product.stock))
    else:  # form-data
        product.name = request.form.get("name", product.name)
        product.description = request.form.get("description", product.description)
        price = request.form.get("price")
        stock = request.form.get("stock")
        if price: product.price = float(price)
        if stock: product.stock = int(stock)

        file = request.files.get("image")
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            product.image = filename

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
                    "price": item.product.price,
                    "quantity": item.quantity,
                    "image": f"http://localhost:5000/static/uploads/{item.product.image}" if item.product.image else "http://localhost:5000/static/uploads/default.jpg"
                }
                for item in o.items
            ]
        })

    return jsonify(data)

#Update orders
# app.py
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

    # Case-insensitive search on product name
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
            "image": f"http://localhost:5000/static/uploads/{p.image}" if p.image else "http://localhost:5000/static/uploads/default.jpg"
        })

    return jsonify(data)

@app.route("/api/orders", methods=["POST"])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    data = request.json

    try:
        # 1. Create the Order
        new_order = Order(
            user_id=user_id,
            payment_method=data.get("payment"), 
            address=json.dumps(data.get("address")),
            total_price=float(data.get("total")) # Ensure this matches the key from frontend
        )
        db.session.add(new_order)
        db.session.flush() # This generates the ID for new_order

        # 2. Create Order Items
        for p in data.get("products", []):
            # Check if price exists in product data, else fetch from DB
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

        # 3. Clear the Cart
        CartItem.query.filter_by(user_id=user_id).delete()
        
        db.session.commit()
        return jsonify({"msg": "Order placed successfully", "order_id": new_order.id}), 201

    except Exception as e:
        db.session.rollback()
        print(f"Error creating order: {str(e)}") # This will show in your terminal
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
                    "price": item.product.price,
                    "quantity": item.quantity,
                    "image": f"http://localhost:5000/static/uploads/{item.product.image}" if item.product.image else "http://localhost:5000/static/uploads/default.jpg"
                } for item in o.items
            ]
        })
    return jsonify(data)

from collections import Counter

@app.route('/api/admin/stats', methods=['GET'])
def get_stats():
    # 1. Total Users, Orders, Revenue calculate kar (Tuzya kade aselch)
    total_users = User.query.count()
    orders = Order.query.all()
    total_revenue = sum(order.total_price for order in orders)
    
    # 2. Product Demand Logic (User ne kiti orders kelya tithun)
    product_counts = Counter()
    product_revenue = Counter()
    
    for order in orders:
        # Order madhle products extract kar (assuming order.items or similar)
        for item in order.items: 
            product_counts[item.product_name] += item.quantity
            product_revenue[item.product_name] += (item.price * item.quantity)

    # 3. Data format kar Charts sathi
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
        "total_revenue": total_revenue,
        "product_stats": product_stats 
    })
if __name__ == "__main__":
    app.run(debug=True)