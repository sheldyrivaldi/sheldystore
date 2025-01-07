import { useState, useEffect } from 'react';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import homepageImage from "../assets/homepage.jpg"

const Home = () => {
    const [products, setProducts] = useState([
        {
            "id": 1,
            "name": "Apel Hijau",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO216/1733989219661_TS7Si.webp",
            "weight": "200g",
            "price": 10000
        }, 
        {
            "id": 2,
            "name": "Jambu",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO271/1705554961200_cVToy.webp",
            "weight": "250g",
            "price": 12000
        },
        {
            "id": 3,
            "name": "Jeruk Import",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO167/30-10-2023/4169e3f7-b235-443b-8e99-21856be3f65a.webp",
            "weight": "300g",
            "price": 15000
        },
        {
            "id": 4,
            "name": "Pisang",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO002/1709285819648_db4Mc.webp",
            "weight": "500g",
            "price": 20000
        },
        {
            "id": 5,
            "name": "Kiwi",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO021/1709066354592_FzaLN.png",
            "weight": "150g",
            "price": 18000
        },
        {
            "id": 6,
            "name": "Anggur Hijau",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO019/22-11-2023/0177d60c-da5e-4dc7-bd5a-369ad023ccfd.jpg",
            "weight": "400g",
            "price": 25000
        },
        {
            "id": 7,
            "name": "Tomat",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO082/1702983074618_XPrQB.webp",
            "weight": "300g",
            "price": 8000
        },
        {
            "id": 8,
            "name": "Nanas",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO168/30-10-2023/66031174-9acb-4a55-bfdb-fea5f76be9e2.webp",
            "weight": "100g",
            "price": 5000
        },
        {
            "id": 9,
            "name": "Kelapa",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO005/30-10-2023/fa7d4154-d255-4004-b4b3-973ca7aaea8c.webp",
            "weight": "200g",
            "price": 12000
        },
        {
            "id": 10,
            "name": "Pepaya",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO477/30-10-2023/5a9e1c19-6a6d-4a3e-bc6f-94c6799546ef.webp",
            "weight": "500g",
            "price": 10000
        },
        {
            "id": 11,
            "name": "Sawo Premium",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO013/30-10-2023/b12c2fa4-6e1f-43fa-b6f1-b5e3a67dde9d.webp",
            "weight": "300g",
            "price": 17000
        },
        {
            "id": 12,
            "name": "Apel Merah",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO079/1702982775614_73IJ9.webp",
            "weight": "600g",
            "price": 30000
        },
        {
            "id": 13,
            "name": "Pomegranate",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO012/1718260581709_0YdTS.png",
            "weight": "400g",
            "price": 35000
        },
        {
            "id": 14,
            "name": "Jamur",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO179/1727694964692_lAJ04.png",
            "weight": "300g",
            "price": 9000
        },
        {
            "id": 15,
            "name": "Buncis",
            "image": "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO030/30-10-2023/af9da6e4-eafe-4dfd-92c0-830b0fd40eac.webp",
            "weight": "400g",
            "price": 11000
        }
    ]);

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

    const addToCart = (item, quantity) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
        let updatedCartItems;

        if (existingItemIndex >= 0) {
            updatedCartItems = cartItems.map((cartItem, index) =>
                index === existingItemIndex
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
            );
        } else {
            updatedCartItems = [...cartItems, { ...item, quantity }];
        }

        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        window.dispatchEvent(new Event('storage')); // Trigger storage event to update Navbar
    };

    return (
        <>
            <Navbar />
            <div className="p-0 md:px-0">
                {/* Section 1: Welcoming */}
                <section className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${homepageImage})` }}>
                    <div className="text-center text-white mb-16">
                        <h1 className="text-5xl font-bold mb-4 text-gray-800">Welcome to Sheldy's Store</h1>
                        <p className="text-2xl text-gray-700">Your one-stop shop for fresh groceries</p>
                    </div>
                </section>

                {/* Section 2: Vegetables */}
                <section className="min-h-screen p-8 mb-4 md:px-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">Produk</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {products.map((product, index) => (
                            <div key={index} className="border rounded-lg p-2 shadow-lg">
                                <img src={product.image} alt={product.name} className="w-full h-32 object-contain rounded mb-2" />
                                <h3 className="text-lg font-bold mb-1">{product.name}</h3>
                                <p className="text-md mb-1">{product.weight}</p>
                                <p className="text-md mb-2">Rp {product.price}</p>
                                <div className="flex items-center justify-between">
                                    <input type="number" min="1" className="border p-1 w-12 text-center" defaultValue="1" id={`quantity-${index}`} />
                                    <button 
                                        onClick={() => addToCart(product, parseInt(document.getElementById(`quantity-${index}`).value))}
                                        className="bg-green-700 text-white py-1 px-3 rounded hover:bg-green-800"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
} 

export default Home