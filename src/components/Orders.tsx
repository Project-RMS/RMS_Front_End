



import React, { useState } from 'react';
import { MenuItem, Order , menu} from './staff/TypeStaff';
import jsPDF from 'jspdf';



const Orders: React.FC = () => {
    const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [activeTab, setActiveTab] = useState('veg');

    const addToCart = (item: MenuItem) => {
        const existingItem = cart.find(cartItem => cartItem.item.id === item.id);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ));
        } else {
            setCart([...cart, { item, quantity: 1 }]);
        }
    };

    const updateQuantity = (itemId: number, delta: number) => {
        setCart(cart.map(cartItem =>
            cartItem.item.id === itemId
                ? { ...cartItem, quantity: Math.max(0, cartItem.quantity + delta) }
                : cartItem
        ).filter(cartItem => cartItem.quantity > 0));
    };

    const placeOrder = () => {
        if (cart.length === 0) return;
        const items = cart.map(cartItem => ({ ...cartItem.item, quantity: cartItem.quantity }));
        const total = cart.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.quantity, 0);
        const newOrder: Order = {
            id: Date.now(),
            items,
            status: 'pending',
            total,
            timestamp: new Date().toLocaleString(),
        };
        setOrders([newOrder, ...orders]);
        setCart([]);
    };

    const updateOrderStatus = (orderId: number, status: Order['status']) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status } : order
        ));
    };

    const generateBillPDF = (order: Order) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Restaurant Header
        doc.setFontSize(20);
        doc.setTextColor(255, 69, 0); // Orange-red color
        doc.text('Flavor Fiesta Restaurant', pageWidth / 2, 20, { align: 'center' });
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('123 Taste Street, Foodie Town', pageWidth / 2, 28, { align: 'center' });
        doc.text('Phone: (123) 456-7890', pageWidth / 2, 34, { align: 'center' });

        // Bill Title
        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text(`Bill - Order #${order.id}`, 20, 50);

        // Order Details
        doc.setFontSize(12);
        doc.text(`Date: ${order.timestamp}`, 20, 60);
        doc.text(`Status: ${order.status}`, 20, 68);

        // Table Header
        doc.setFontSize(10);
        doc.setFillColor(255, 69, 0);
        doc.rect(20, 80, 170, 8, 'F');
        doc.setTextColor(255);
        doc.text('Item', 22, 86);
        doc.text('Qty', 120, 86);
        doc.text('Price', 150, 86);
        doc.text('Total', 170, 86);

        // Itemized List
        let y = 94;
        order.items.forEach(item => {
            const itemName = item.name.replace(item.icon, '').trim();
            const itemTotal = item.price * (item.quantity || 1);
            doc.setTextColor(0);
            doc.text(itemName, 22, y);
            doc.text(`${item.quantity || 1}`, 120, y);
            doc.text(`$${item.price.toFixed(2)}`, 150, y);
            doc.text(`$${itemTotal.toFixed(2)}`, 170, y);
            y += 8;
        });

        // Grand Total
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Grand Total', 130, y + 10);
        doc.text(`$${order.total.toFixed(2)}`, 170, y + 10);

        // Footer
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100);
        doc.text('Thank you for dining with us! 🍽️', pageWidth / 2, y + 30, { align: 'center' });
        doc.text('Visit again soon! 🌟', pageWidth / 2, y + 36, { align: 'center' });

        // Download the PDF
        doc.save(`Bill_Order_${order.id}.pdf`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 p-6 font-sans">
            <h1 className="text-4xl font-extrabold text-center mb-6 text-red-600 tracking-tight animate-pulse">
                🔥 Flavor Fiesta Ordering! 🔥
            </h1>

            {/* Tabbed Menu Section */}
            <div className="max-w-5xl mx-auto mb-6">
                <div className="flex justify-center space-x-3 mb-4">
                    {['veg', 'non-veg', 'soft-drink'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-full text-base font-bold transition-all duration-300 flex items-center space-x-2 ${activeTab === tab
                                    ? 'bg-red-500 text-white shadow-lg scale-105'
                                    : 'bg-white text-red-600 hover:bg-red-100'
                                }`}
                        >
                            <span>{tab === 'veg' ? '🌿 Veggie Bliss' : tab === 'non-veg' ? '🍗 Meat Feast' : '🥤 Cool Sips'}</span>
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {menu.filter(item => item.category === activeTab).map(item => (
                        <MenuCard key={item.id} item={item} onAdd={addToCart} />
                    ))}
                </div>
            </div>

            {/* Cart Section */}
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-red-600 mb-4">🎯 Your Tasty Picks ({cart.length})</h2>
                {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">🍽️ Hungry? Grab some goodies now!</p>
                ) : (
                    <>
                        <div className="max-h-60 overflow-y-auto space-y-3">
                            {cart.map((cartItem, index) => (
                                <CartItem
                                    key={index}
                                    cartItem={cartItem}
                                    updateQuantity={updateQuantity}
                                />
                            ))}
                        </div>
                        <div className="mt-4 border-t pt-4">
                            <p className="text-lg font-semibold text-gray-800">
                                Total: ${cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0).toFixed(2)}
                            </p>
                            <button
                                onClick={placeOrder}
                                className="w-full mt-3 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <span>🔥 Cook My Feast!</span>
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Orders Section */}
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-red-600 mb-4">🌟 Flavor Quest Tracker</h2>
                {orders.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">🍴 No quests yet—start your flavor adventure!</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                updateStatus={updateOrderStatus}
                                generateBill={generateBillPDF}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const MenuCard: React.FC<{ item: MenuItem; onAdd: (item: MenuItem) => void }> = ({ item, onAdd }) => (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
        <div className="flex items-center space-x-2">
            <span className="text-2xl">{item.icon}</span>
            <h3 className="font-bold text-lg text-gray-800 animate-pulse">{item.name.replace(item.icon, '').trim()}</h3>
        </div>
        <p className="text-red-500 font-semibold text-lg mt-1">${item.price.toFixed(2)}</p>
        <button
            onClick={() => onAdd(item)}
            className="mt-2 w-full bg-gradient-to-r from-yellow-400 to-red-500 text-white py-2 rounded-lg hover:from-yellow-500 hover:to-red-600 transition-all duration-300 flex items-center justify-center space-x-2"
        >
            <span>🌟 Snag It!</span>
        </button>
    </div>
);

const CartItem: React.FC<{ cartItem: { item: MenuItem; quantity: number }; updateQuantity: (id: number, delta: number) => void }> = ({ cartItem, updateQuantity }) => (
    <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg">
        <div className="flex items-center space-x-2">
            <span className="text-xl">{cartItem.item.icon}</span>
            <div>
                <p className="text-gray-800 font-medium">{cartItem.item.name.replace(cartItem.item.icon, '').trim()}</p>
                <p className="text-red-600">${cartItem.item.price.toFixed(2)} x {cartItem.quantity}</p>
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <button
                onClick={() => updateQuantity(cartItem.item.id, -1)}
                className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600"
            >
                -
            </button>
            <span className="text-gray-800 font-bold">{cartItem.quantity}</span>
            <button
                onClick={() => updateQuantity(cartItem.item.id, 1)}
                className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-green-600"
            >
                +
            </button>
        </div>
    </div>
);

const OrderCard: React.FC<{
    order: Order;
    updateStatus: (id: number, status: Order['status']) => void;
    generateBill: (order: Order) => void;
}> = ({ order, updateStatus, generateBill }) => {
    const statusStyles: Record<Order['status'], string> = {
        pending: 'bg-yellow-200 text-yellow-800',
        preparing: 'bg-orange-200 text-orange-800',
        ready: 'bg-blue-200 text-blue-800',
        collected: 'bg-green-200 text-green-800'
    };

    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-800">Order #{order.id}</p>
                <p className="text-xs text-gray-500">{order.timestamp}</p>
            </div>
            <p className="text-gray-700 text-sm mb-2">
                Items: {order.items.map(item => `${item.name} (x${item.quantity || 1})`).join(', ')}
            </p>
            <p className="text-gray-800 font-medium mb-2">Total: ${order.total.toFixed(2)}</p>
            <p className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status]}`}>
                {order.status}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
                {order.status !== 'collected' && (
                    ['pending', 'preparing', 'ready', 'collected'].map(status => (
                        <button
                            key={status}
                            onClick={() => updateStatus(order.id, status as Order['status'])}
                            className={`px-3 py-1 rounded-lg text-xs font-medium ${status === order.status
                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    : 'bg-red-500 text-white hover:bg-red-600'
                                }`}
                            disabled={status === order.status}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))
                )}
                <button
                    onClick={() => generateBill(order)}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-green-500 text-white hover:bg-green-600"
                >
                    📄 Generate Bill
                </button>
            </div>
        </div>
    );
};

export default Orders;