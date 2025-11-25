import { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    const [cartItems, setCartItems] = useState(
        localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : []
    );
    const [coupon, setCoupon] = useState(
        localStorage.getItem("coupon")
            ? JSON.parse(localStorage.getItem("coupon"))
            : null
    );

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem("coupon", JSON.stringify(coupon));
    }, [cartItems, coupon]);

    // Clear coupon on logout
    useEffect(() => {
        if (!user && coupon) {
            setCoupon(null);
        }
    }, [user]);

    // Re-validate coupon when cart changes
    useEffect(() => {
        if (coupon && cartItems.length > 0) {
            const subtotal = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);

            // If cart total is below minimum purchase amount, remove coupon
            if (coupon.minPurchaseAmount && subtotal < coupon.minPurchaseAmount) {
                setCoupon(null);
            }
        }

        // If cart is empty, remove coupon
        if (cartItems.length === 0 && coupon) {
            setCoupon(null);
        }
    }, [cartItems]);

    const addToCart = (product, qty) => {
        const existItem = cartItems.find((x) => x.product === product._id);

        if (existItem) {
            setCartItems(
                cartItems.map((x) =>
                    x.product === existItem.product ? { ...x, qty: x.qty + qty } : x
                )
            );
        } else {
            setCartItems([
                ...cartItems,
                {
                    product: product._id,
                    name: product.name,
                    image: product.images[0]?.url,
                    price: product.price,
                    qty,
                },
            ]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((x) => x.product !== id));
    };

    const updateQuantity = (id, qty) => {
        setCartItems(
            cartItems.map((x) =>
                x.product === id ? { ...x, qty: Math.max(1, qty) } : x
            )
        );
    };

    const applyCoupon = (couponData) => {
        setCoupon(couponData);
    };

    const removeCoupon = () => {
        setCoupon(null);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, coupon, applyCoupon, removeCoupon }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
