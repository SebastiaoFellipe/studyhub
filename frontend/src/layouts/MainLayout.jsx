import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import backgroundImage from '../assets/images/background-books.png';

const MainLayout = ({ children }) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      >
        <div className="w-full h-full bg-white/80" />
      </div>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;