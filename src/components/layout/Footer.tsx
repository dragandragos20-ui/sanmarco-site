import { MapPin, Phone, Mail, Clock, Facebook } from 'lucide-react';
import { useState, useCallback } from 'react';

const Footer = () => {
  const [logoError, setLogoError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validateAndSendWhatsApp = useCallback(() => {
    const nume = (document.getElementById('footer-nume') as HTMLInputElement)?.value?.trim();
    const telefon = (document.getElementById('footer-telefon') as HTMLInputElement)?.value?.trim();
    const project = (document.getElementById('footer-project') as HTMLSelectElement)?.value;
    
    const errors: string[] = [];
    
    if (!nume || nume.length < 2) {
      errors.push('Numele trebuie să aibă cel puțin 2 caractere');
    }
    if (!telefon || telefon.length < 6) {
      errors.push('Telefonul trebuie să aibă cel puțin 6 cifre');
    }
    if (!project) {
      errors.push('Selectați tipul de proiect');
    }
    
    // Validare telefon simplă
    if (telefon && !/^[\d\s\-\+\(\)]{6,}$/.test(telefon)) {
      errors.push('Format telefon invalid');
    }
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      setTimeout(() => setValidationErrors([]), 5000);
      return;
    }
    
    setValidationErrors([]);
    
    const message = `Salut! Sunt interesat de produsele San Marco.
📝 Nume: ${nume}
📞 Telefon: ${telefon}  
🏗️ Tip proiect: ${project}
🌐 Sursa: Website Footer

Vă rog să mă contactați pentru o consultație gratuită!`;
    
    const whatsappUrl = `https://wa.me/40775319975?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    ['footer-nume', 'footer-telefon', 'footer-project'].forEach(id => {
      const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
      if (el) el.value = '';
    });
    
    alert('Formularul a fost trimis pe WhatsApp!');
  }, []);
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-start mb-6">
          <div className="p-3">
            {!logoError ? (
              <img 
                src="/assets/images/sanmarco-logo.png" 
                alt="San Marco - Vopsele și finisaje decorative premium"
                className="h-8 md:h-10 w-auto object-contain hover:opacity-90 transition-opacity duration-200 logo-transparent"
                style={{ background: 'transparent' }}
                onError={() => {
                  console.warn('Primary logo failed, trying fallback');
                  setLogoError(true);
                }}
              />
            ) : (
              <img 
                src="/assets/images/sanmarco-logo-footer.png" 
                alt="San Marco - Vopsele și finisaje decorative premium"
                className="h-8 md:h-10 w-auto object-contain hover:opacity-90 transition-opacity duration-200 logo-transparent"
                style={{ background: 'transparent' }}
                onError={() => console.error('All logo files failed to load')}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Compania */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#c51421]">San Marco Sector 5, București</h3>
            <p className="text-gray-700 mb-4">
              Vopsele și finisaje decorative premium. Calitate italiană, experiență locală în Sectorul 5, București.
            </p>
            
            {/* Social Media cu iconuri originale */}
            <div className="flex gap-4">
              <a 
                href="https://web.facebook.com/profile.php?id=61557976884648" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center hover:bg-[#166FE5] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.tiktok.com/@sanmarcosector5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              
              <a 
                href="https://wa.me/40775319975" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:bg-[#20BA5A] transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#c51421]">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c51421] mt-1 flex-shrink-0" />
                <span className="text-gray-700">Calea Ferentari, nr 23<br />Sector 5, București, România</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#c51421] flex-shrink-0" />
                <a href="tel:+40775319975" className="text-gray-700 hover:text-black transition-colors"
                   onClick={(e) => {
                     // Previne FaceTime pe iOS
                     if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                       e.preventDefault();
                       window.open('tel:+40775319975', '_self');
                     }
                   }}>
                  +40775 319 975
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#c51421] flex-shrink-0" />
                <a href="mailto:sanmarcosector5@yahoo.com" className="text-gray-700 hover:text-black transition-colors">
                  sanmarcosector5@yahoo.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#c51421] flex-shrink-0" />
                <span className="text-gray-700">Luni-Vineri: 09:00-17:00</span>
              </div>
            </div>
          </div>

          {/* Link-uri Utile */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#c51421]">Link-uri Utile</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://ro.san-marco.com/cine-este-san-marco" 
                   className="text-gray-700 hover:text-black transition-colors">
                  Cine este San Marco
                </a>
              </li>
              <li>
                <a href="https://ro.san-marco.com/noutati" 
                   className="text-gray-700 hover:text-black transition-colors">
                  Noutăți
                </a>
              </li>
              <li>
                <a href="https://sanmarcogroup.com/" 
                   className="text-gray-700 hover:text-black transition-colors">
                  San Marco Group
                </a>
              </li>
              <li>
                <a href="https://ro.san-marco.com/formare-profesionala" 
                   className="text-gray-700 hover:text-black transition-colors">
                  Cariere
                </a>
              </li>
              <li>
                <a href="https://sanmarcogroup.com/certifications-and-awards-san-marco-group" 
                   className="text-gray-700 hover:text-black transition-colors">
                  Certificări
                </a>
              </li>
            </ul>
          </div>

          {/* Consultanță Gratuită */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#c51421]">Consultanță Gratuită</h4>
            <p className="text-gray-700 mb-4">Primește sfaturi personalizate pentru proiectul tău.</p>
            
            <form className="space-y-3">
              <input 
                type="text" 
                placeholder="Numele tău" 
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-[#c51421]"
                id="footer-nume"
              />
              <input 
                type="tel" 
                placeholder="Telefon" 
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-[#c51421]"
                id="footer-telefon"
              />
              <select 
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:border-[#c51421]"
                id="footer-project"
              >
                <option value="">Tip proiect</option>
                <option value="interior">Interior</option>
                <option value="exterior">Exterior</option>
                <option value="decorative">Decorative</option>
                <option value="comercial">Comercial</option>
              </select>
              <button 
                type="button" 
                onClick={validateAndSendWhatsApp}
                className="w-full bg-[#c51421] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#c51421]/90 transition-colors"
              >
                Trimite pe WhatsApp
              </button>
              {validationErrors.length > 0 && (
                <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-xs">
                  <ul className="list-disc list-inside">
                    {validationErrors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; 2025 San Marco Sector 5, București. Toate drepturile rezervate.</p>
        </div>

        {/* GDPR Cookie Consent */}
        <div id="cookie-consent" className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 hidden">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">Folosim cookie-uri pentru a îmbunătăți experiența dumneavoastră. Continuând să navigați, acceptați utilizarea acestora.</p>
            <button 
              onClick={() => {
                document.getElementById('cookie-consent')?.classList.add('hidden');
                localStorage.setItem('cookieConsent', 'true');
              }}
              className="bg-[#c51421] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#c51421]/90"
            >
              Accept
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-gray-500 text-xs mt-4 pt-4 border-t border-gray-200">
          <p>Acest site este operat de Distribuitor Autorizat San Marco – Sector 5 București.<br />
             Produsele prezentate aparțin brandului San Marco.</p>
        </div>
      </div>

      {/* Cookie Consent Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Show cookie consent if not accepted
          if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
              const consent = document.getElementById('cookie-consent');
              if (consent) consent.classList.remove('hidden');
            }, 2000);
          }
        `
      }} />
    </footer>
  );
};

export default Footer;