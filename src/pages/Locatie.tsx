import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import ModalPageLayout from '../components/layout/ModalPageLayout';

const Locatie = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ModalPageLayout 
      title="Locația Noastră" 
      isOpen={isOpen} 
      onClose={handleClose}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Informații de contact */}
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-primary">
              San Marco Sector 5, București
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Adresa:</p>
                  <p className="text-gray-600">Calea Ferentari, nr 23<br />Sector 5, București, România</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Telefon:</p>
                  <a href="tel:+40775319975" className="text-primary hover:underline">
                    +40775 319 975
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Email:</p>
                  <a href="mailto:sanmarcosector5@yahoo.com" className="text-primary hover:underline">
                    sanmarcosector5@yahoo.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium">Program:</p>
                  <p className="text-gray-600">Luni - Vineri: 09:00 - 17:00</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <a 
                href="tel:+40775319975"
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-block text-center"
              >
                Contactează Vânzătorul
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.123456789!2d26.0123456!3d44.4123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCalea%20Ferentari%2023%2C%20Bucure%C8%99ti!5e0!3m2!1sen!2sro!4v1234567890"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="San Marco Sector 5 - Locație"
              />
            </div>
          </div>
        </div>
      </div>
    </ModalPageLayout>
  );
};

export default Locatie;