import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "./components/Section";
import ProductsSection from "./components/ProductsSection";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductHook from "./components/ProductHook";
import ProductIntroduction from "./components/ProductIntroduction";
import ProductInfoOne from "./components/ProductInfoOne";
import ProductInfoTwo from "./components/ProductInfoTwo";
import Contest from "./components/Contest";
import Footer from "./components/Footer";
import ContactForm from './components/ContactForm';
import SocialFloat from './components/SocialFloat';
import ChatWidget from './components/ChatWidget';
import HighLights from "./components/HighLights";
import ProductPolicy from "./components/ProductPolicy";
import AdminPage from "./components/AdminPage";


import pr1 from "./assets/img/pr1.jpg"
import pr2 from "./assets/img/pr2.jpg";
import pr3 from "./assets/img/pr3.jpg";
import pr4 from "./assets/img/pr4.jpg";
import pr5 from "./assets/img/pr5.jpg";
import pr6 from "./assets/img/pr6.jpg";


const FreshSaladWebsite = () => {
  const { t } = useTranslation();

  const [route, setRoute] = useState(() => window.location.hash || "#/");

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route.startsWith("#/admin")) {
    return <AdminPage />;
  }

  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 5,
    minutes: 35
  });

  const [currentProductHook, setCurrentProductHook] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'policy', 'products', 'order', 'highlights', 'contact'];

      setIsHeaderFixed(window.scrollY > 100);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      icon: "📸",
      title: "Check-in",
      subtitle: "Chụp ảnh lưu niệm",
      description: "Ghi lại khoảnh khắc đẹp khi đến với chúng tôi"
    },
    {
      icon: "🍽️",
      title: "Ăn uống",
      subtitle: "Thưởng thức món ngon",
      description: "Tận hưởng hương vị tươi ngon, dinh dưỡng, chuẩn vị"
    },
    {
      icon: "🗺️",
      title: "Tham quan",
      subtitle: "Khám phá cảnh quan",
      description: "Dạo quanh và trải nghiệm cảnh quan ấn tượng"
    }
  ];


  const products = [
    {
      name: "Mediterranean Delight",
      description: "Fresh tomatoes, olives, feta cheese with herbs",
      image: pr1,
      price: "$12.99"
    },
    {
      name: "Mediterranean Delight",
      description: "Fresh tomatoes, olives, feta cheese with herbs",
      image: pr2,
      price: "$12.99"
    },
    {
      name: "Mediterranean Delight",
      description: "Fresh tomatoes, olives, feta cheese with herbs",
      image: pr3,
      price: "$12.99"
    },
    {
      name: "Mediterranean Delight",
      description: "Fresh tomatoes, olives, feta cheese with herbs",
      image: pr4,
      price: "$12.99"
    },
    {
      name: "Mediterranean Delight",
      description: "Fresh tomatoes, olives, feta cheese with herbs",
      image: pr5,
      price: "$12.99"
    },
    {
      name: "Mediterranean Delight",
      description: "Fresh tomatoes, olives, feta cheese with herbs",
      image: pr6,
      price: "$12.99"
    },
  ];

  return (
    <>
      <div className="website-container">
        {/* Decorative Elements */}
        <div className="decorative-element decorative-leaf-1">🌿</div>
        <div className="decorative-element decorative-sparkle-1">✨</div>
        <div className="decorative-element decorative-apple">🍎</div>
        <div className="decorative-element decorative-chef">👨‍🍳</div>

        {/* Header */}
        <Header t={t} activeSection={activeSection} isHeaderFixed={isHeaderFixed} />

        {/* Hero Section */}
        <Hero />

        {/* ProductHooks Section */}
        <ProductHook steps={steps} currentProductHook={currentProductHook} />

        {/* Product Introduction Section */}
        <ProductIntroduction />

        {/* Product Information Section 1 */}
        <ProductInfoOne />

        {/* Product Information Section 2 */}
        <ProductInfoTwo />

        {/* Product Policy Section */}
        <ProductPolicy />

        {/* New Eatery Guide sections */}
        {/* Contest Section */}
        <Contest timeLeft={timeLeft} />

        <HighLights />
        {/* Products Section (existing) */}
        <ProductsSection products={products} />

        {/* Contact (last section) */}
        <ContactForm />

        {/* Footer */}
        <Footer />
        <SocialFloat />
        <ChatWidget />
      </div>
    </>
  );
};

export default FreshSaladWebsite;