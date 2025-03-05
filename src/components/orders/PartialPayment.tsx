import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCreditCard, FaWallet, FaMoneyBillWave, FaFileInvoice, FaArrowLeft, FaPrint, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";

const PartialPayment: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderItems, subtotal, tax, discount, total, tableNumber, orderType } = location.state || {};

    const [capturedAmount, setCapturedAmount] = useState<number>(0);
    const [paymentHistory, setPaymentHistory] = useState<{ type: string; amount: number; timestamp: string }[]>([]);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);

    const remainingAmount = total - paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);

    const handleCardPayment = () => {
        if (capturedAmount <= 0 || capturedAmount > remainingAmount) {
            alert("Please enter a valid amount within the remaining balance.");
            return;
        }
        const newPayment = {
            type: "Card",
            amount: capturedAmount,
            timestamp: new Date().toLocaleString(),
        };
        setPaymentHistory((prev) => [...prev, newPayment]);
        setCapturedAmount(0);
        setIsCardModalOpen(false);
    };

    const handleWalletPayment = () => {
        // Logic for wallet payment (e.g., open a modal or integrate with a wallet API)
        alert("Wallet payment functionality to be implemented.");
    };

    const handleOtherPayment = () => {
        // Logic for other payment (e.g., open a modal for custom payment type)
        alert("Other payment functionality to be implemented.");
    };

    const handleDuePayment = () => {
        // Mark remaining amount as due
        const dueAmount = remainingAmount;
        if (dueAmount > 0) {
            const newPayment = {
                type: "Due",
                amount: dueAmount,
                timestamp: new Date().toLocaleString(),
            };
            setPaymentHistory((prev) => [...prev, newPayment]);
            alert(`Remaining amount $${dueAmount.toFixed(2)} marked as due.`);
        }
    };

    const generatePDF = (type: "print" | "ebill") => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: [200, 400 + orderItems.length * 14],
        });
        const width = 200;
        const margin = 12;
        let yPos = margin;

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Partial Payment Receipt", width / 2, yPos, { align: "center" });
        yPos += 20;

        doc.setFontSize(10);
        doc.text("Tasty Bites Restaurant", width / 2, yPos, { align: "center" });
        yPos += 10;
        doc.text(`Bill #: ${Date.now().toString().slice(-6)}`, margin, yPos);
        yPos += 10;
        doc.text(`Date: ${new Date().toLocaleString()}`, margin, yPos);
        yPos += 10;
        doc.text(`Type: ${orderType.toUpperCase()}`, margin, yPos);
        if (orderType === "dine-in") {
            doc.text(`Table: ${tableNumber || "N/A"}`, width - margin, yPos, { align: "right" });
        }
        yPos += 14;

        doc.line(margin, yPos, width - margin, yPos);
        yPos += 10;

        doc.setFont("helvetica", "bold");
        doc.text("Qty", margin, yPos);
        doc.text("Description", margin + 25, yPos);
        doc.text("Price", width - margin, yPos, { align: "right" });
        yPos += 6;
        doc.line(margin, yPos, width - margin, yPos);
        yPos += 10;

        doc.setFont("helvetica", "normal");
        orderItems.forEach((item: any) => {
            const itemName = `${item.name}`.substring(0, 14);
            doc.text(`${item.quantity || 1}`, margin, yPos);
            doc.text(itemName, margin + 25, yPos);
            doc.text(`$${(item.price || 0).toFixed(2)}`, width - margin, yPos, { align: "right" });
            yPos += 14;
        });

        yPos += 6;
        doc.line(margin, yPos, width - margin, yPos);
        yPos += 10;

        doc.text("Subtotal", margin, yPos);
        doc.text(`$${subtotal.toFixed(2)}`, width - margin, yPos, { align: "right" });
        yPos += 10;
        if (discount > 0) {
            doc.text(`Discount`, margin, yPos);
            doc.text(`-$${discount.toFixed(2)}`, width - margin, yPos, { align: "right" });
            yPos += 10;
        }
        doc.text(`Tax`, margin, yPos);
        doc.text(`$${tax.toFixed(2)}`, width - margin, yPos, { align: "right" });
        yPos += 14;

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Total", margin, yPos);
        doc.text(`$${total.toFixed(2)}`, width - margin, yPos, { align: "right" });
        yPos += 20;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text("Payment Summary:", margin, yPos);
        yPos += 10;
        paymentHistory.forEach((payment) => {
            doc.text(`${payment.type}: $${payment.amount.toFixed(2)} (${payment.timestamp})`, margin, yPos);
            yPos += 10;
        });
        doc.text(`Remaining: $${remainingAmount.toFixed(2)}`, margin, yPos);
        yPos += 20;

        doc.text("Thank You!", width / 2, yPos, { align: "center" });

        const filename = `Receipt-${tableNumber || "NoTable"}-${Date.now()}.pdf`;
        if (type === "print") {
            doc.save(filename);
            console.log("Printing PDF:", filename);
        } else if (type === "ebill") {
            doc.save(filename);
            alert("E-Bill generated and downloaded.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-[#194a7a] mb-4">
                    Partial Payment - Bill #{Date.now().toString().slice(-6)}
                </h1>
                <p className="text-gray-600 mb-6">
                    Table: {tableNumber || "N/A"} | Type: {orderType.toUpperCase()} | Total: ${total.toFixed(2)}
                </p>

                {/* Payment Options */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#194a7a]/10 p-4 rounded-lg flex flex-col items-center cursor-pointer"
                        onClick={() => setIsCardModalOpen(true)}
                    >
                        <FaCreditCard size={30} className="text-[#194a7a] mb-2" />
                        <span className="text-[#194a7a] font-semibold">Card</span>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#194a7a]/10 p-4 rounded-lg flex flex-col items-center cursor-pointer"
                        onClick={handleWalletPayment}
                    >
                        <FaWallet size={30} className="text-[#194a7a] mb-2" />
                        <span className="text-[#194a7a] font-semibold">Wallet</span>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#194a7a]/10 p-4 rounded-lg flex flex-col items-center cursor-pointer"
                        onClick={handleOtherPayment}
                    >
                        <FaMoneyBillWave size={30} className="text-[#194a7a] mb-2" />
                        <span className="text-[#194a7a] font-semibold">Other</span>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[#194a7a]/10 p-4 rounded-lg flex flex-col items-center cursor-pointer"
                        onClick={handleDuePayment}
                    >
                        <FaFileInvoice size={30} className="text-[#194a7a] mb-2" />
                        <span className="text-[#194a7a] font-semibold">Due</span>
                    </motion.div>
                </div>

                {/* Payment Summary */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-[#194a7a] mb-2">Payment Summary</h2>
                    {paymentHistory.length === 0 ? (
                        <p className="text-gray-500">No payments recorded yet.</p>
                    ) : (
                        <div className="space-y-2">
                            {paymentHistory.map((payment, index) => (
                                <div key={index} className="flex justify-between text-gray-700">
                                    <span>{payment.type} ({payment.timestamp})</span>
                                    <span>${payment.amount.toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="flex justify-between font-bold text-[#194a7a]">
                                <span>Remaining Amount:</span>
                                <span>${remainingAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(-1)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <FaArrowLeft /> Back to Order
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/order")}
                        className="bg-[#f4a261] text-white px-4 py-2 rounded-lg"
                    >
                        New Order
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => generatePDF("print")}
                        className="bg-[#194a7a] text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <FaPrint /> Print
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => generatePDF("ebill")}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <FaFilePdf /> E-Bill
                    </motion.button>
                </div>
            </div>

            {/* Card Payment Modal */}
            {isCardModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="bg-white p-6 rounded-lg shadow-xl w-96"
                    >
                        <h2 className="text-xl font-semibold text-[#194a7a] mb-4">Card Payment</h2>
                        <input
                            type="number"
                            value={capturedAmount}
                            onChange={(e) => setCapturedAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                            className="w-full p-2 border border-[#194a7a]/30 rounded-lg mb-4"
                            placeholder="Enter Amount"
                            step="0.01"
                        />
                        <p className="text-sm text-gray-600 mb-4">Remaining: ${remainingAmount.toFixed(2)}</p>
                        <div className="flex gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleCardPayment}
                                className="flex-1 bg-[#194a7a] text-white py-2 rounded-lg"
                            >
                                Save
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsCardModalOpen(false)}
                                className="flex-1 bg-gray-300 py-2 rounded-lg"
                            >
                                Cancel
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default PartialPayment;