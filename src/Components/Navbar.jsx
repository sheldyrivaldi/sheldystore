import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedInStatus === 'true');

        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItemCount(storedCartItems.length);
    }, []);

    useEffect(() => {
        const updateCartItemCount = () => {
            const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            setCartItemCount(storedCartItems.length);
        };

        updateCartItemCount();

        window.addEventListener('storage', updateCartItemCount);

        return () => {
            window.removeEventListener('storage', updateCartItemCount);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <header className="sticky top-0 z-50 flex justify-between items-center p-4 bg-green-700 text-white font-poppins md:px-16">
            <div className="text-2xl font-bold">Sheldy`s Store</div>
            <div className={`flex gap-4 ${isOpen ? 'flex-col absolute top-16 right-0 bg-green-700 w-full text-center pb-4' : 'hidden md:flex'}`}>
                <NavLink to="/" className={({ isActive }) => isActive ? "font-bold border-b-2 border-white" : "hover:text-orange-500"}>Beranda</NavLink>
                <NavLink to="/transaksi" className={({ isActive }) => isActive ? "font-bold border-b-2 border-white relative" : "hover:text-orange-500 relative"}>
                    Transaksi
                    {cartItemCount > 0 && (
                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                            {cartItemCount}
                        </span>
                    )}
                </NavLink>
                <NavLink to="/profil" className={({ isActive }) => isActive ? "font-bold border-b-2 border-white" : "hover:text-orange-500"}>Profil</NavLink>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="hover:text-orange-500">Logout</button>
                ) : (
                    <NavLink to="/login" className={({ isActive }) => isActive ? "font-bold border-b-2 border-white" : "hover:text-orange-500"}>Login</NavLink>
                )}
            </div>
            <div className="md:hidden flex flex-col cursor-pointer" onClick={toggleMenu}>
                <div className="w-6 h-1 bg-white mb-1"></div>
                <div className="w-6 h-1 bg-white mb-1"></div>
                <div className="w-6 h-1 bg-white"></div>
            </div>
        </header>
    );
};

export default Navbar;