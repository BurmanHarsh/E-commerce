import { Link } from 'react-router-dom';
import { Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'New Arrivals', href: '/shop?collection=new' },
  { label: 'Best Sellers', href: '/shop?collection=best' },
  { label: 'Designer', href: '/designer' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl md:text-3xl font-bold tracking-tight">
              WEEK<span className="text-primary">DAYZ</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
              <Link to="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <CartDrawer />

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  <Link to="/" className="font-display text-2xl font-bold" onClick={() => setMobileOpen(false)}>
                    DRIP<span className="text-primary">MINT</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="icon" asChild>
                      <Link to="/account" onClick={() => setMobileOpen(false)}>
                        <User className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
