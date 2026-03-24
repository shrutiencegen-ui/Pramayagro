# routes/cart.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, CartItem, Product

cart_bp = Blueprint("cart", __name__, url_prefix="/api/cart")


# ---------------- Add to Cart ----------------
@cart_bp.route("/add", methods=["POST"])
@jwt_required()
def add_to_cart():
    user_id = get_jwt_identity()
    data = request.json
    product_id = data.get("productId")
    quantity = data.get("quantity", 1)

    if not product_id:
        return jsonify({"msg": "Product ID required"}), 400

    # Check if already in cart
    item = CartItem.query.filter_by(user_id=user_id, product_id=product_id).first()
    if item:
        item.quantity += quantity
    else:
        item = CartItem(user_id=user_id, product_id=product_id, quantity=quantity)
        db.session.add(item)

    db.session.commit()
    return jsonify({"msg": f"{quantity}kg added to cart"}), 200


# ---------------- Get Cart ----------------
@cart_bp.route("", methods=["GET"])
@jwt_required()
def get_cart():
    user_id = get_jwt_identity()
    items = CartItem.query.filter_by(user_id=user_id).all()
    cart_data = [{
        "id": item.id,
        "productId": item.product.id,
        "name": item.product.name,
        "price": item.product.price,
        "image": f"http://localhost:5000/static/uploads/{item.product.image}" if item.product.image else "http://localhost:5000/static/uploads/default.jpg",
        "quantity": item.quantity
    } for item in items]
    return jsonify(cart_data)


# ---------------- Update Quantity ----------------
@cart_bp.route('/update/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_cart(item_id):
    data = request.get_json()
    new_qty = data.get("quantity", 1)
    item = CartItem.query.get(item_id)
    if not item:
        return jsonify({"msg": "Item not found"}), 404

    item.quantity = new_qty
    db.session.commit()
    return jsonify({"msg": "Quantity updated"})


# ---------------- Remove from Cart ----------------
@cart_bp.route('/remove/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_cart(item_id):
    item = CartItem.query.get(item_id)
    if not item:
        return jsonify({"msg": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({"msg": "Item removed"})