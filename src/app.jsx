import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Section } from "./components/Section";
import ProductsSection from "./components/ProductsSection";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductHook from "./components/ProductHook";
import ProductInfoOne from "./components/ProductInfoOne";
import ProductInfoTwo from "./components/ProductInfoTwo";
import Contest from "./components/Contest";
import Footer from "./components/Footer";
import ContactForm from './components/ContactForm';
import SocialFloat from './components/SocialFloat';

const FreshSaladWebsite = () => {
  const { t } = useTranslation();

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
      const sections = ['home', 'about', 'products', 'order', 'highlights', 'contact'];
      const scrollPosition = window.scrollY + 200;

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

  const ProductHooks = [
    {
      name: "Anna Koroleva",
      role: "Nutritionist",
      avatar: "https://placeholder-image-service.onrender.com/image/80x80?prompt=Professional woman with short brown hair smiling warmly&id=8554007a-abd8-4d7f-b548-c85bed7e3b5b&customer_id=cus_T2SRLsJfPHKhQt",
      content: "These salads have transformed my clients' approach to healthy eating. Fresh, delicious, and perfectly balanced nutrition.",
      rating: 5
    },
    {
      name: "Alex Petrov",
      role: "Fitness Coach",
      avatar: "https://placeholder-image-service.onrender.com/image/80x80?prompt=Athletic man with blonde hair in fitness attire&id=8554007a-abd8-4d7f-b548-c85bed7e3b5b&customer_id=cus_T2SRLsJfPHKhQt",
      content: "I recommend Fresh Del Cabo to all my clients. The quality is unmatched and the variety keeps meals exciting.",
      rating: 5
    },
    {
      name: "Maria Ivanova",
      role: "Chef",
      avatar: "https://placeholder-image-service.onrender.com/image/80x80?prompt=Professional female chef with dark hair in white chef coat&id=8554007a-abd8-4d7f-b548-c85bed7e3b5b&customer_id=cus_T2SRLsJfPHKhQt",
      content: "As a professional chef, I'm impressed by the freshness and quality. These ingredients inspire creativity.",
      rating: 5
    }
  ];

  const products = [
    {
      name: "Mediterranean Delight",
      description: "Fresh tomatoes, olives, feta cheese with herbs",
      image: "https://placeholder-image-service.onrender.com/image/300x300?prompt=Mediterranean salad with tomatoes olives feta cheese and fresh herbs on white plate&id=8554007a-abd8-4d7f-b548-c85bed7e3b5b&customer_id=cus_T2SRLsJfPHKhQt",
      price: "$12.99"
    },
    {
      name: "Protein Power Bowl",
      description: "Grilled chicken, quinoa, avocado with lime dressing",
      image: "https://placeholder-image-service.onrender.com/image/300x300?prompt=Protein rich salad bowl with grilled chicken quinoa avocado and lime dressing&id=8554007a-abd8-4d7f-b548-c85bed7e3b5b&customer_id=cus_T2SRLsJfPHKhQt",
      price: "$14.99"
    },
    {
      name: "Garden Fresh Mix",
      description: "Seasonal vegetables with house vinaigrette",
      image: "https://placeholder-image-service.onrender.com/image/300x300?prompt=Fresh garden salad with mixed seasonal vegetables and vinaigrette dressing&id=8554007a-abd8-4d7f-b548-c85bed7e3b5b&customer_id=cus_T2SRLsJfPHKhQt",
      price: "$10.99"
    },
    {
      name: "Garden Fresh Mix",
      description: "Seasonal vegetables with house vinaigrette",
      image: "https://placeholder-image-service.onrender.com/image/300x300?prompt=Fresh garden salad with mixed seasonal vegetables and vinaigrette dressing&id=8554007a-abd8-4d7f-b548-c85bed7e3b5b&customer_id=cus_T2SRLsJfPHKhQt",
      price: "$10.99"
    },
    {
      name: "Garden Fresh Mix",
      description: "Seasonal vegetables with house vinaigrette",
      image: "https://placeholder-image-service.onrender.com/image/300x300?prompt=Fresh garden salad with mixed seasonal vegetables and vinaigrette dressing&id=8554007a-abd8-4d7f-b548-c85bed7e3b5b&customer_id=cus_T2SRLsJfPHKhQt",
      price: "$10.99"
    },
    {
      name: "Garden Fresh Mix",
      description: "Seasonal vegetables with house vinaigrette",
      image: "https://placeholder-image-service.onrender.com/image/300x300?prompt=Fresh garden salad with mixed seasonal vegetables and vinaigrette dressing&id=8554007a-abd8-4d7f-b548-c85bed7e3b5b&customer_id=cus_T2SRLsJfPHKhQt",
      price: "$10.99"
    }
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

        {/* Product Information Section 1 */}
        <ProductInfoOne />

        {/* Product Information Section 2 */}
        <ProductInfoTwo />

        {/* New Eatery Guide sections */}
        {/* Contest Section */}
        <Contest timeLeft={timeLeft} />

        {/* Products Section (existing) */}
        <ProductsSection products={products} />

        {/* Contact (last section) */}
        <ContactForm />

        {/* Footer */}
        <Footer />
        <SocialFloat />
      </div>
    </>
  );
};

export default FreshSaladWebsite;