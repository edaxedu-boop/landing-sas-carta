import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Smartphone, 
  QrCode, 
  MessageSquare, 
  Settings, 
  Utensils, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Clock, 
  ArrowRight, 
  ShoppingBag, 
  CheckCircle2, 
  ChefHat, 
  AlertCircle,
  Download,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// Replace this URL with your actual creation link when ready
const ENLACE_CREACION = "https://cartadigital.site";

// Array for Carousel Screenshots in the Hero Section
// If you have your own screenshot images, put the paths in the 'imagen' fields (e.g. "/menu.png").
// If left empty (""), the carousel will render a beautiful HTML/CSS mockup fallback automatically!
const SLIDES_CAPTURAS = [
  {
    id: 1,
    titulo: "1. Categorías y Banner",
    subtitulo: "Categorías dinámicas y banners promocionales atractivos.",
    imagen: "https://res.cloudinary.com/dl1pgzshh/image/upload/v1781461625/1.png", 
    emoji: "🏷️",
    bg: "#061c0f"
  },
  {
    id: 2,
    titulo: "2. El Menú",
    subtitulo: "Tus clientes pueden añadir tamaños variables y extras a tus productos.",
    imagen: "https://res.cloudinary.com/dl1pgzshh/image/upload/v1781461625/2.png", 
    emoji: "🍕",
    bg: "#052210"
  },
  {
    id: 3,
    titulo: "3. Añadir al Carrito",
    subtitulo: "Menú interactivo con opción directa para añadir al carrito.",
    imagen: "https://res.cloudinary.com/dl1pgzshh/image/upload/v1781461625/3.png", 
    emoji: "🛒",
    bg: "#04190b"
  },
  {
    id: 4,
    titulo: "4. Carrito de Pedidos",
    subtitulo: "Tus clientes seleccionan método de entrega: Delivery o Llevar.",
    imagen: "https://res.cloudinary.com/dl1pgzshh/image/upload/v1781461625/4.png", 
    emoji: "🛵",
    bg: "#082d16"
  },
  {
    id: 5,
    titulo: "5. Cupones y Pedido a WhatsApp",
    subtitulo: "Aplica cupones de descuento y envía el pedido listo al WhatsApp.",
    imagen: "https://res.cloudinary.com/dl1pgzshh/image/upload/v1781461625/5.png", 
    emoji: "💬",
    bg: "#0b3c1f"
  }
];

export default function App() {
  const [stickyVisible, setStickyVisible] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.origin.includes('vimeo.com')) return;
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data) {
          if (data.event === 'timeupdate') {
            const elapsedSeconds = data.data.seconds;
            let displayVal = 0;
            if (elapsedSeconds <= 300) {
              displayVal = (elapsedSeconds / 300) * 70;
            } else {
              const remainingTime = 1857 - 300;
              const currentOffset = Math.min(elapsedSeconds - 300, remainingTime);
              displayVal = 70 + (currentOffset / remainingTime) * 30;
            }
            setProgress(displayVal);
          }
          if (data.event === 'play') {
            setIsPlaying(true);
          }
          if (data.event === 'pause') {
            setIsPlaying(false);
          }
        }
      } catch (err) {
        // Ignore parsing errors
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handlePlayPause = () => {
    const iframe = document.getElementById('vimeo-iframe');
    if (iframe && iframe.contentWindow) {
      if (isPlaying) {
        iframe.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
        setIsPlaying(false);
      } else {
        iframe.contentWindow.postMessage(JSON.stringify({ method: 'play' }), '*');
        setIsPlaying(true);
      }
    }
  };

  const handleMuteUnmute = () => {
    const iframe = document.getElementById('vimeo-iframe');
    if (iframe && iframe.contentWindow) {
      const nextMuted = !isMuted;
      iframe.contentWindow.postMessage(JSON.stringify({
        method: 'setMuted',
        value: nextMuted
      }), '*');
      setIsMuted(nextMuted);

      if (!nextMuted && !isPlaying) {
        iframe.contentWindow.postMessage(JSON.stringify({ method: 'play' }), '*');
        setIsPlaying(true);
      }
    }
  };

  const handleFullscreen = () => {
    const container = document.getElementById('video-container-wrapper');
    if (container) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen().catch(err => {
          console.error("Fullscreen error: ", err);
        });
      }
    }
  };
  
  // Carousel State
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-play carousel slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES_CAPTURAS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SLIDES_CAPTURAS.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SLIDES_CAPTURAS.length) % SLIDES_CAPTURAS.length);
  };

  // Monitor scroll for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setStickyVisible(true);
      } else {
        setStickyVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      q: "¿Cómo funciona la instalación como Aplicación (PWA)?",
      a: "Tanto tú como tus clientes pueden instalar la Carta Digital directamente en la pantalla de inicio del celular con un solo click. No es necesario buscarla en Google Play ni App Store, no consume espacio de almacenamiento y carga de forma instantánea."
    },
    {
      q: "¿De verdad cuesta solo S/ 9 al mes?",
      a: "Sí, es una tarifa plana única de 9 Soles Peruanos al mes. No cobramos comisiones por tus ventas ni cargos adicionales, sin importar cuántos platos subas o cuántos pedidos recibas."
    },
    {
      q: "¿Cómo funciona el pedido al WhatsApp?",
      a: "Tus clientes escanean tu código QR o entran al enlace de tu menú digital. Seleccionan sus platos, eligen el método de entrega (Delivery, Recojo para Llevar o Consumo en Mesa, según lo que tú configures), y al confirmar, el sistema genera automáticamente un mensaje estructurado y listo para enviar a tu WhatsApp con todos los detalles."
    },
    {
      q: "¿Hay límites en la cantidad de platos o categorías?",
      a: "No. Puedes crear categorías ilimitadas (Pizzas, Bebidas, Entradas, Postres, etc.) y platos ilimitados con fotos, descripciones y precios."
    },
    {
      q: "¿Cómo recibo el dinero de las ventas?",
      a: "Los pagos se coordinan directamente entre tú y el cliente a través de WhatsApp. Puedes compartir tu código QR de Yape, Plin, cuenta bancaria o contra entrega. Nosotros no retenemos tu dinero ni cobramos comisiones."
    }
  ];

  return (
    <div className="landing-container">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-0.03em' }}>
            Tu Carta Digital al WhatsApp <br />
            <span style={{ color: '#4ade80' }}>como una App en tu Celular</span>
          </h1>

          <p style={{ color: '#a7f3d0', fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', maxWidth: '800px', margin: '0 auto 40px auto', fontWeight: '400', lineHeight: '1.6' }}>
            Digitaliza tu restaurante. Tus clientes escanean tu QR, eligen sus platos e instalan tu carta como una aplicación móvil. <strong style={{ color: '#ffffff' }}>Pedidos ilimitados directos a tu WhatsApp</strong> por solo S/ 9 al mes. Sin comisiones.
          </p>

          {/* SCREENSHOTS IMAGE CAROUSEL (BELOW DESCRIPTION) */}
          <div className="hero-carousel-container">
            <button type="button" className="carousel-arrow prev" onClick={prevSlide} aria-label="Anterior captura">
              <ChevronLeft size={24} />
            </button>
            <button type="button" className="carousel-arrow next" onClick={nextSlide} aria-label="Siguiente captura">
              <ChevronRight size={24} />
            </button>

            {SLIDES_CAPTURAS[activeSlide].imagen ? (
              <div style={{ width: '280px', height: '560px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img 
                  src={SLIDES_CAPTURAS[activeSlide].imagen} 
                  alt={SLIDES_CAPTURAS[activeSlide].titulo} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                />
              </div>
            ) : (
              <div className="hero-carousel-phone">
                <div className="phone-notch-small"></div>
                <div className="hero-carousel-screen">
                  {/* RENDERING FULL-FIDELITY CSS FALLBACKS */}
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {activeSlide === 0 && (
                      /* SLIDE 0: CLIENT VIEW MENU */
                      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #073a1e 100%)', color: '#fff', padding: '36px 12px 12px 12px', textAlign: 'left' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#a7f3d0', marginBottom: '4px' }}>
                            <span>🟢 Abierto</span>
                            <span>1:00 PM - 10:00 PM</span>
                          </div>
                          <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Punto Pizza 🍕</h4>
                          <p style={{ fontSize: '0.65rem', margin: 0, color: '#a7f3d0' }}>Menú de la Casa</p>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <span style={{ fontSize: '0.7rem', padding: '4px 8px', borderRadius: '6px', background: 'var(--primary)', color: '#fff' }}>Pizzas</span>
                          <span style={{ fontSize: '0.7rem', padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: '#a7f3d0' }}>Bebidas</span>
                        </div>
                        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, textAlign: 'left' }}>
                          <div style={{ display: 'flex', gap: '8px', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <span style={{ fontSize: '1.5rem' }}>🍕</span>
                            <div style={{ flex: 1 }}>
                              <h5 style={{ fontSize: '0.75rem', margin: 0 }}>Pizza Familiar Pepperoni</h5>
                              <p style={{ fontSize: '0.6rem', color: '#a7f3d0', margin: '2px 0' }}>Queso mozzarella y pepperoni.</p>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: '700' }}>S/ 35.00</span>
                                <span style={{ background: 'var(--primary)', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>+</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: '8px 12px', background: 'rgba(4, 25, 11, 0.9)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--primary)', padding: '8px 12px', borderRadius: '9999px', fontSize: '0.75rem' }}>
                            <span>🛒 Ver mi pedido (1 plato)</span>
                            <span style={{ fontWeight: '700' }}>S/ 35.00</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSlide === 1 && (
                      /* SLIDE 1: CART VIEW */
                      <div style={{ padding: '36px 12px 12px 12px', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>🛒 Mi Carrito</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', marginBottom: '12px', flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                            <span>1x Pizza Pepperoni</span>
                            <span style={{ color: '#4ade80' }}>S/ 35.00</span>
                          </div>
                          <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '0.8rem', marginTop: 'auto' }}>
                            <span>Total a pagar</span>
                            <span style={{ color: '#4ade80' }}>S/ 35.00</span>
                          </div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', fontSize: '0.65rem', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                          <div style={{ fontWeight: '700', color: '#a7f3d0' }}>🛵 Método de Entrega (Configurable)</div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <span style={{ flex: 1, padding: '4px 2px', background: 'var(--primary)', color: '#fff', textAlign: 'center', borderRadius: '4px', fontSize: '0.6rem' }}>Delivery</span>
                            <span style={{ flex: 1, padding: '4px 2px', background: 'rgba(255,255,255,0.05)', color: '#a7f3d0', textAlign: 'center', borderRadius: '4px', fontSize: '0.6rem' }}>Llevar</span>
                            <span style={{ flex: 1, padding: '4px 2px', background: 'rgba(255,255,255,0.05)', color: '#a7f3d0', textAlign: 'center', borderRadius: '4px', fontSize: '0.6rem' }}>Mesa</span>
                          </div>
                        </div>
                        <div style={{ background: '#22c55e', color: '#fff', padding: '10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '700', textAlign: 'center' }}>
                          Confirmar Pedido al WhatsApp
                        </div>
                      </div>
                    )}

                    {activeSlide === 2 && (
                      /* SLIDE 2: WHATSAPP MESSAGE */
                      <div style={{ padding: '36px 12px 12px 12px', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%', background: '#0b141a' }}>
                        <div style={{ color: '#fff', fontSize: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px', marginBottom: '16px', fontWeight: '700' }}>
                          🟢 WhatsApp Business Chat
                        </div>
                        <div style={{ 
                          background: '#056162', 
                          color: '#fff', 
                          padding: '12px', 
                          borderRadius: '12px', 
                          fontSize: '0.7rem', 
                          fontFamily: 'monospace', 
                          lineHeight: '1.4',
                          maxWidth: '90%',
                          alignSelf: 'flex-start',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}>
                          <strong>*¡Nuevo pedido para Punto Pizza!*</strong><br/><br/>
                          • 1x 🍕 Pizza Fam. Pepperoni (S/ 35.00)<br/>
                          -----------------------------<br/>
                          🛵 <strong>Método:</strong> Delivery<br/>
                          👤 <strong>Cliente:</strong> Carlos Mendoza<br/>
                          📍 <strong>Dirección:</strong> Av. Larco 120<br/>
                          💰 <strong>Total a pagar: S/ 35.00</strong>
                        </div>
                        <div style={{ marginTop: 'auto', background: '#202c33', borderRadius: '24px', padding: '8px 12px', fontSize: '0.65rem', color: '#8696a0', display: 'flex', justifyContent: 'space-between' }}>
                          <span>Mensaje de pedido...</span>
                          <span style={{ color: '#00a884' }}>🚀</span>
                        </div>
                      </div>
                    )}

                    {activeSlide === 3 && (
                      /* SLIDE 3: ADMIN PANEL */
                      <div style={{ padding: '36px 12px 12px 12px', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px', marginBottom: '12px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ChefHat size={12} color="#4ade80" />
                            Admin Panel
                          </span>
                          <span style={{ fontSize: '0.55rem', background: '#0c5e30', padding: '2px 4px', borderRadius: '4px' }}>Móvil</span>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)', marginBottom: '12px' }}>
                          <div style={{ fontSize: '0.55rem', color: '#a7f3d0' }}>Ventas del Día</div>
                          <div style={{ fontSize: '1rem', fontWeight: '800', color: '#4ade80' }}>S/ 582.00</div>
                        </div>
                        <div style={{ fontSize: '0.7rem', fontWeight: '700', marginBottom: '6px', color: '#a7f3d0' }}>Pedidos Pendientes</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.6rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                              <span>Carlos Mendoza</span>
                              <span style={{ color: '#fbbf24' }}>S/ 35.00</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ background: 'var(--primary)', color: '#fff', padding: '6px', borderRadius: '6px', fontSize: '0.65rem', textAlign: 'center', fontWeight: '700', marginTop: 'auto' }}>
                          + Agregar Nuevo Plato
                        </div>
                      </div>
                    )}

                    {activeSlide === 4 && (
                      /* SLIDE 4: PWA INSTALLATION */
                      <div style={{ padding: '36px 12px 12px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, #22c55e 0%, var(--primary) 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2.2rem',
                          boxShadow: '0 8px 20px rgba(12, 94, 48, 0.4)',
                          marginBottom: '16px'
                        }}>
                          🍕
                        </div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Punto Pizza App</h4>
                        <p style={{ fontSize: '0.65rem', color: '#a7f3d0', padding: '0 8px', marginBottom: '16px' }}>
                          Instala esta carta digital directamente en la pantalla de inicio de tu celular.
                        </p>
                        <div style={{
                          background: '#04190b',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          borderRadius: '12px',
                          padding: '10px',
                          width: '100%',
                          fontSize: '0.65rem',
                          textAlign: 'left',
                          marginTop: 'auto'
                        }}>
                          <div style={{ fontWeight: '700', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Download size={12} color="#4ade80" />
                            ¿Instalar en celular?
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', fontWeight: '700', marginTop: '6px' }}>
                            <span style={{ color: '#ef4444', fontSize: '0.6rem' }}>No</span>
                            <span style={{ color: '#4ade80', fontSize: '0.6rem' }}>Instalar</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Dots */}
            <div className="carousel-dots">
              {SLIDES_CAPTURAS.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`carousel-dot ${activeSlide === idx ? 'active' : ''}`}
                  aria-label={`Ir a la captura ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slide title description */}
            <div style={{ marginTop: '16px', textAlign: 'center', maxWidth: '300px' }}>
              <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '4px' }}>
                {SLIDES_CAPTURAS[activeSlide].titulo}
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#a7f3d0', margin: 0, lineHeight: '1.4' }}>
                {SLIDES_CAPTURAS[activeSlide].subtitulo}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginBottom: '60px' }}>
            <a href={ENLACE_CREACION} target="_blank" rel="noopener noreferrer" className="btn-primary animate-pulse-glow">
              <Sparkles size={20} />
              Crear mi Carta Digital Ahora
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="metrics-container">
            <div className="metric-item">
              <h3 style={{ color: '#4ade80', fontSize: '2rem', marginBottom: '4px' }}>S/ 9.00</h3>
              <p style={{ color: '#a7f3d0', fontSize: '0.9rem' }}>Precio fijo al mes</p>
            </div>
            <div className="metric-item">
              <h3 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '4px' }}>Instalable PWA</h3>
              <p style={{ color: '#a7f3d0', fontSize: '0.9rem' }}>Funciona como App Móvil</p>
            </div>
            <div className="metric-item">
              <h3 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '4px' }}>Comisiones 0%</h3>
              <p style={{ color: '#a7f3d0', fontSize: '0.9rem' }}>Venta directa a ti</p>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO DEMO SECTION */}
      <section id="video-demo" className="section-padding" style={{ background: '#020c06', borderTop: '1px solid rgba(74, 222, 128, 0.1)', borderBottom: '1px solid rgba(74, 222, 128, 0.1)' }}>
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <span style={{ 
            color: '#4ade80', 
            fontWeight: '700', 
            textTransform: 'uppercase', 
            fontSize: '0.875rem', 
            letterSpacing: '0.1em',
            display: 'inline-block',
            marginBottom: '12px'
          }}>
            Tutorial en Vivo
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: '1.2', color: '#ffffff', marginBottom: '16px' }}>
            Mira en vivo cómo creamos una Carta Digital
          </h2>
          <p style={{ color: '#a7f3d0', fontSize: '1.1rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Descubre lo fácil y rápido que es configurar tu menú, categorías y recibir pedidos directo a tu celular en tiempo real.
          </p>

          <div 
            id="video-container-wrapper"
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(74, 222, 128, 0.15)',
              border: '2px solid rgba(74, 222, 128, 0.2)'
            }}
            className="video-hover-container"
          >
            <iframe
              id="vimeo-iframe"
              src="https://player.vimeo.com/video/1201303109?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=0&loop=1&title=0&byline=0&portrait=0&controls=0&muted=1&api=1"
              title="Mira en vivo como creamos una carta digital"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Botón flotante central para activar el sonido y reproducir */}
            {isMuted && (
              <button
                onClick={handleMuteUnmute}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '9999px',
                  padding: '16px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  zIndex: 10,
                  animation: 'pulse-ring 2s infinite ease-in-out',
                  transition: 'transform 0.2s ease, background-color 0.2s ease',
                  pointerEvents: 'auto'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.95)'; e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.85)'; e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; }}
                title="Reproducir con Sonido"
              >
                <div style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '50%',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Play size={20} fill="#ffffff" />
                </div>
                Reproducir con Sonido
              </button>
            )}

            {/* Custom Overlay Controls */}
            <div 
              className="custom-video-controls"
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                borderRadius: '12px',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                zIndex: 10
              }}
            >
              {/* Play / Pause */}
              <button 
                onClick={handlePlayPause}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px'
                }}
                title={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              {/* Volume & Fullscreen */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button 
                  onClick={handleMuteUnmute}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}
                  title={isMuted ? "Activar audio" : "Silenciar"}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <button 
                  onClick={handleFullscreen}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px'
                  }}
                  title="Pantalla completa"
                >
                  <Maximize size={18} />
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
            <a 
              href={ENLACE_CREACION}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary animate-pulse-glow"
              style={{
                fontSize: '1.25rem',
                padding: '16px 40px',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '9999px'
              }}
            >
              <Sparkles size={20} />
              Crear Carta por 9 Soles
            </a>
          </div>
        </div>
      </section>

      {/* 2. SCREENSHOTS / PHONE SHOWCASE GALLERY */}
      <section id="capturas" className="section-padding section-light-green">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px auto' }}>
            <span style={{ 
              color: '#4ade80', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              fontSize: '0.875rem', 
              letterSpacing: '0.1em',
              display: 'inline-block',
              marginBottom: '12px'
            }}>
              Vista Previa del Sistema
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: '1.2' }}>
              Así se ve tu Carta Digital en acción
            </h2>
            <p style={{ color: '#a7f3d0', marginTop: '16px', fontSize: '1.1rem' }}>
              Una aplicación web moderna, rápida y optimizada para celulares. Mira las pantallas del cliente, el carrito y tu panel.
            </p>
          </div>

          <div className="phone-gallery-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center', marginTop: '60px' }}>
            {[
              {
                src: "https://res.cloudinary.com/dl1pgzshh/image/upload/v1781461625/1.png",
                label: "1. Categorías y Banner 🏷️"
              },
              {
                src: "https://res.cloudinary.com/dl1pgzshh/image/upload/v1781461625/2.png",
                label: "2. El Menú (Extras y Tamaños) 🍕"
              },
              {
                src: "https://res.cloudinary.com/dl1pgzshh/image/upload/v1781461625/3.png",
                label: "3. Añadir al Carrito 🛒"
              },
              {
                src: "https://res.cloudinary.com/dl1pgzshh/image/upload/v1781461625/4.png",
                label: "4. Carrito de Pedidos 🛵"
              },
              {
                src: "https://res.cloudinary.com/dl1pgzshh/image/upload/v1781461625/5.png",
                label: "5. Cupones y Pedidos al WhatsApp 💬"
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '16px',
                  width: '270px',
                  transition: 'transform 0.3s ease'
                }}
                className="showcase-item-hover"
              >
                <div style={{ width: '270px', height: '540px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={item.src} 
                    alt={item.label} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                </div>
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  padding: '8px 16px', 
                  borderRadius: '9999px', 
                  fontSize: '0.85rem', 
                  fontWeight: '700',
                  color: '#fff',
                  textAlign: 'center',
                  backdropFilter: 'blur(8px)'
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN DEMO INTERACTIVA / CÓDIGO QR */}
      <section id="demo-qr" className="section-padding" style={{ background: '#020c06', borderTop: '1px solid rgba(74, 222, 128, 0.1)', borderBottom: '1px solid rgba(74, 222, 128, 0.1)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '48px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
            padding: '48px',
            borderRadius: '24px',
            border: '1px solid rgba(74, 222, 128, 0.15)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }} className="demo-qr-card">
            
            {/* Columna QR */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              flex: '1 1 280px',
              maxWidth: '300px'
            }}>
              <div style={{
                background: '#ffffff',
                padding: '20px',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                border: '4px solid #4ade80',
                position: 'relative'
              }}>
                <img 
                  src="https://res.cloudinary.com/dl1pgzshh/image/upload/v1781499769/QR-Punto_Pizza_2.png" 
                  alt="Escanear menú digital" 
                  style={{ width: '200px', height: '200px', display: 'block', borderRadius: '8px' }}
                />
                {/* Micro animation scanning line */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  width: 'calc(100% - 40px)',
                  height: '2px',
                  background: '#4ade80',
                  boxShadow: '0 0 8px #4ade80',
                  animation: 'qr-scan 3s infinite ease-in-out'
                }}></div>
              </div>
              <span style={{ fontSize: '0.85rem', color: '#a7f3d0', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                📸 Escanea con tu cámara
              </span>
            </div>

            {/* Columna Textos */}
            <div style={{
              flex: '1 1 340px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              <span style={{ 
                color: '#4ade80', 
                fontWeight: '700', 
                textTransform: 'uppercase', 
                fontSize: '0.85rem', 
                letterSpacing: '0.1em'
              }}>
                Prueba en Vivo
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: '1.2', margin: 0, color: '#ffffff' }}>
                Escanea y ve cómo es un Menú Digital
              </h2>
              <p style={{ color: '#a7f3d0', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
                Experimenta en tiempo real cómo tu cliente ve los platos, añade adicionales, selecciona delivery y simula el envío del pedido directo a tu celular.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                <a 
                  href="https://cartadigital.site/punto-pizza" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary animate-pulse-glow"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                >
                  <Smartphone size={20} />
                  Ver Menú Digital Demo
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITION / PWA FEATURES SECTION */}
      <section id="features" className="section-padding section-dark-green">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
            <span style={{ 
              color: '#4ade80', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              fontSize: '0.875rem', 
              letterSpacing: '0.1em',
              display: 'inline-block',
              marginBottom: '12px'
            }}>
              Beneficios Exclusivos
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: '1.2' }}>
              Tu Carta Digital es una Aplicación Web Real
            </h2>
            <p style={{ color: '#a7f3d0', marginTop: '16px', fontSize: '1.1rem' }}>
              Sin descargas desde la tienda de Google Play, accesible para cualquier celular y con velocidad insuperable.
            </p>
          </div>

          <div className="features-grid">
            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Smartphone color="#4ade80" size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Instalable como Aplicación (PWA)</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                Tus clientes pueden añadir tu menú a la pantalla de inicio de su teléfono como cualquier app. Carga en milisegundos y está siempre a un toque de distancia.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <MessageSquare color="#4ade80" size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Pedidos Automatizados al WhatsApp</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                Tus clientes no tienen que escribir el pedido. El sistema genera un mensaje formateado con las cantidades, nombre del plato, precio y total a pagar listo para enviar.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <QrCode color="#4ade80" size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Código QR de Alta Resolución</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                Te entregamos tu QR personalizado para imprimir y colocar en las mesas o empaques de tu negocio. Tus comensales lo escanean e ingresan al menú al instante.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Settings color="#4ade80" size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Panel de Control Móvil Ilimitado</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                Gestiona tus platos, categorías y precios sin límites desde tu propio celular. Modifica el menú en tiempo real si te quedas sin stock de algún plato.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Clock color="#4ade80" size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Entregas 100% Configurables</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                Habilita solo lo que tu negocio necesite: envíos por Delivery, pedidos para llevar (takeaway) o pedidos directamente a las mesas de tu local.
              </p>
            </div>

            <div className="glass-card">
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <TrendingUp color="#4ade80" size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Cero Comisiones por Venta</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>
                No cobramos porcentaje de tus ganancias. El 100% de la venta es tuyo y cobras directo al cliente con Yape, Plin, transferencia o efectivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING & CONVERSION CTA */}
      <section id="pricing" className="section-padding section-mid-green">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
            <span style={{ 
              color: '#4ade80', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              fontSize: '0.875rem', 
              letterSpacing: '0.1em',
              display: 'inline-block',
              marginBottom: '12px'
            }}>
              Precios Claros e Ilimitados
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}>
              Único Plan Todo Incluido por S/ 9 al Mes
            </h2>
            <p style={{ color: '#a7f3d0', marginTop: '16px', fontSize: '1.1rem' }}>
              Olvídate de comisiones de apps o mensualidades costosas de miles de soles. Digitaliza tu local hoy.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
            {/* PRICING CARD */}
            <div className="pricing-card">
              
              <h3 style={{ color: '#ffffff', fontSize: '1.75rem', marginBottom: '8px' }}>Carta Digital App</h3>
              <p style={{ color: '#a7f3d0', fontSize: '0.95rem', marginBottom: '32px' }}>Pedidos y platos ilimitados para tu WhatsApp</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', marginBottom: '12px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ffffff' }}>S/</span>
                <span style={{ fontSize: '5.5rem', fontWeight: '900', color: '#4ade80', lineHeight: '1', fontFamily: 'var(--font-heading)' }}>9</span>
                <span style={{ fontSize: '1.25rem', color: '#a7f3d0', marginLeft: '8px' }}>/ mes</span>
              </div>
              
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '32px', fontStyle: 'italic' }}>
                * Cancela o activa cuando quieras, sin contratos de permanencia *
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', maxWidth: '360px', margin: '0 auto 40px auto', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={20} color="#4ade80" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: '#f3f4f6' }}>Platos y categorías <strong>ilimitados</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={20} color="#4ade80" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: '#f3f4f6' }}>Pedidos al WhatsApp <strong>ilimitados</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={20} color="#4ade80" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: '#f3f4f6' }}>Instalable como Aplicación (PWA)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={20} color="#4ade80" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: '#f3f4f6' }}>Código QR de regalo para tu local</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle2 size={20} color="#4ade80" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: '#f3f4f6' }}>Administración móvil en tiempo real</span>
                </div>
              </div>

              <a href={ENLACE_CREACION} target="_blank" rel="noopener noreferrer" className="btn-primary animate-pulse-glow" style={{ width: '100%', justifyContent: 'center', padding: '18px 24px' }}>
                <Sparkles size={20} />
                Crear Mi Carta Digital por S/ 9/mes
              </a>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginTop: '24px', color: '#a7f3d0', fontSize: '0.85rem' }}>
                <AlertCircle size={16} />
                <span>Activación express de tu cuenta en minutos.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQs ACCORDION SECTION */}
      <section className="section-padding section-light-green">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.25rem' }}>Preguntas Frecuentes</h2>
            <p style={{ color: '#a7f3d0', marginTop: '8px' }}>Todo lo que necesitas saber antes de empezar</p>
          </div>

          <div>
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="faq-item">
                  <div 
                    className="faq-header" 
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} color="#4ade80" /> : <ChevronDown size={20} color="#cbd5e1" />}
                  </div>
                  {isOpen && (
                    <div className="faq-content">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. STICKY FLOATING CTA BAR (NO HEADER / NO FOOTER NAVIGATION) */}
      <div className={`sticky-bar ${stickyVisible ? 'visible' : ''}`}>
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ color: '#ffffff', margin: 0, fontSize: '1rem', fontWeight: '700' }}>Carta Digital e Instalable PWA</h4>
          <p style={{ color: '#a7f3d0', margin: 0, fontSize: '0.8rem' }}>Platos ilimitados al WhatsApp por solo <strong>S/ 9 al mes</strong></p>
        </div>
        <a href={ENLACE_CREACION} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.95rem' }}>
          Crear Carta Ahora
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
