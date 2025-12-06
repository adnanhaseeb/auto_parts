import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-header text-header-foreground">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded font-bold text-lg inline-block mb-4">
              SEHGALMOTORS<span className="text-xs">.PK</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pakistan's largest online car accessories store. We provide genuine auto spare parts
              and accessories for all car models at the best prices.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Return Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">LED & Lightening</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Exterior Accessories</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Interior Accessories</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Car Care Products</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Auto Spare Parts</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Gadgets & Electronics</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Main Boulevard, Gulberg III, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>0311-1222357</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@sehgalmotors.pk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sehgal Motors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;