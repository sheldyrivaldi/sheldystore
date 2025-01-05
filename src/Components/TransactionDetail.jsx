import React from 'react';

const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default function TransactionDetail({ transaction, onClose }) {
    const { items, date, total } = transaction;

    return (
        <div className="relative p-4 border rounded-lg shadow-lg bg-white">
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 mr-2"
                onClick={onClose}
            >
                <span className='text-md font-bold'>&times;</span>
            </button>
            <h2 className="text-xl font-bold mb-4">Transaction Detail</h2>
            <p className="mb-2 text-sm"><strong>Date:</strong> {formatDate(date)}</p>
            <table className="w-full mb-4 text-sm">
                <thead>
                    <tr>
                        <th className="text-left">Item</th>
                        <th className="text-left">Units</th>
                        <th className="text-left">Price</th>
                        <th className="text-left">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>Rp {item.price}</td>
                            <td>Rp {item.quantity * item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="text-lg font-bold">Total Amount : <span className='ml-2'>Rp {total}</span></p>
        </div>
    );
}