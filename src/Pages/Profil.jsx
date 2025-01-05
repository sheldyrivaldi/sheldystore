import Navbar from "../Components/Navbar";
import groceriesImage from "../assets/groceries.jpg";
import Footer from "../Components/Footer";

const Profil = () => {
    return (
        <>
            <Navbar />
            <div className="p-4 md:px-16 flex flex-col md:flex-row items-center md:items-start">
                <div className="md:w-1/3 p-4">
                    <img src={groceriesImage} alt="Supermarket" className="w-full h-auto rounded" />
                </div>
                <div className="md:w-2/3 p-4 md:ml-8">
                    <h3 className="text-2xl font-bold mb-4">Tentang Aplikasi Pembelian Sayur</h3>
                    <p>
                        Aplikasi pembelian sayur ini dirancang untuk memudahkan Anda dalam membeli sayur-sayuran segar secara online. 
                        Dengan aplikasi ini, Anda dapat memilih berbagai jenis sayur yang tersedia di supermarket kami, 
                        melakukan pemesanan, dan mendapatkan sayur-sayuran segar langsung diantar ke rumah Anda.
                    </p>
                    <p className="mt-4">
                        Kami berkomitmen untuk menyediakan sayur-sayuran berkualitas tinggi dengan harga yang terjangkau. 
                        Aplikasi ini juga dilengkapi dengan fitur pelacakan pesanan, sehingga Anda dapat memantau status pesanan Anda secara real-time.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profil;
