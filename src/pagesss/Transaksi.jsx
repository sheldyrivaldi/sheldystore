import { useState, useEffect } from 'react';
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import TransactionDetail from "../Components/TransactionDetail"
import Swal from 'sweetalert2';

const Transaksi = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [previousTransactions, setPreviousTransactions] = useState([
        {
            id: 1,
            date: '2025-01-04',
            items: [
                { name: 'Apel Hijau', quantity: 2, price: 10000 },
                { name: 'Jambu', quantity: 1, price: 12000 }
            ],
            total: 32000
        },
        {
            id: 2,
            date: '2025-01-04',
            items: [
                { name: 'Jeruk Import', quantity: 3, price: 15000 },
                { name: 'Pisang', quantity: 2, price: 20000 }
            ],
            total: 90000
        }
    ]);

    useEffect(() => {
        // Fetch cart items and previous transactions from local storage or API
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
        calculateTotal(storedCartItems);
    }, []);

    const calculateTotal = (items) => {
        const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalAmount);
    };

    const viewTransactionDetails = (transaction) => {
        setSelectedTransaction(transaction);
        setShowModal(true);
    };

    const closeTransactionDetails = () => {
        setShowModal(false);
        setSelectedTransaction(null);
    };

    const handleBayar = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            Swal.fire({
                title: 'Harus Login',
                text: 'Anda harus login terlebih dahulu untuk melakukan pembayaran.',
                icon: 'warning',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = '/login';
            });
            return;
        }

        if (cartItems.length === 0) {
            Swal.fire({
                title: 'Tidak Ada Item',
                text: 'Tidak ada item dalam daftar belanja untuk dibayar.',
                icon: 'info',
                confirmButtonText: 'OK'
            });
            return;
        }

        Swal.fire({
            title: 'Konfirmasi Pembayaran',
            text: "Apakah Anda yakin ingin membayar?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Bayar'
        }).then((result) => {
            if (result.isConfirmed) {
                const newTransaction = {
                    id: previousTransactions.length + 1,
                    date: new Date().toISOString().split('T')[0],
                    items: cartItems,
                    total: total
                };
                const updatedTransactions = [...previousTransactions, newTransaction];
                setPreviousTransactions(updatedTransactions);
                localStorage.setItem('previousTransactions', JSON.stringify(updatedTransactions));
                setCartItems([]);
                setTotal(0);
                localStorage.removeItem('cartItems');
                window.dispatchEvent(new Event('storage')); // Trigger storage event to update Navbar
                Swal.fire(
                    'Berhasil!',
                    'Pembayaran Anda telah berhasil.',
                    'success'
                );
            }
        });
    };

    return (
        <>
            <Navbar />
            <div className="p-4 md:px-16">
                <h3 className="text-xl mb-4 font-bold">Daftar Belanja</h3>
                <ul className="mb-4">
                    {cartItems.map((item, index) => (
                        <li key={index} className="flex justify-between mb-2">
                            <span>{item.name} ({item.quantity} x Rp {item.price})</span>
                            <span>Rp {item.price * item.quantity}</span>
                        </li>
                    ))}
                </ul>
                <div className="text-right mb-8">
                    <strong>Total: Rp {total}</strong>
                </div>
                <div className="text-right mb-8">
                    <button onClick={handleBayar} className="bg-green-700 text-white text-sm py-2 px-4 rounded hover:bg-green-800">Bayar</button>
                </div>

                <h3 className="text-xl mb-4 font-bold">Transaksi Sebelumnya</h3>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">ID Transaksi</th>
                            <th className="py-2 px-4 border-b text-left">Tanggal</th>
                            <th className="py-2 px-4 border-b text-left">Jumlah Unit</th>
                            <th className="py-2 px-4 border-b text-left">Total Harga</th>
                            <th className="py-2 px-4 border-b text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {previousTransactions.map((transaction, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b">{transaction.id}</td>
                                <td className="py-2 px-4 border-b">{transaction.date}</td>
                                <td className="py-2 px-4 border-b">{transaction.items.reduce((acc, item) => acc + item.quantity, 0)}</td>
                                <td className="py-2 px-4 border-b">Rp {transaction.total}</td>
                                <td className="py-2 px-4 border-b">
                                    <button onClick={() => viewTransactionDetails(transaction)} className="bg-green-700 text-white text-sm p-2 rounded hover:bg-green-800">Lihat Detail</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeTransactionDetails}>
                    <div className="bg-white rounded-lg shadow-lg w-1/3 relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={closeTransactionDetails}
                        >
                            &times;
                        </button>
                        <TransactionDetail transaction={selectedTransaction} onClose={closeTransactionDetails} />
                    </div>
                </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Transaksi
