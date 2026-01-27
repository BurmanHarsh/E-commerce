import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { PromoSection } from '@/components/home/PromoSection';
import { ProductGrid } from '@/components/products/ProductGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        
        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ProductGrid limit={8} title="Featured Products" />
          </div>
        </section>
        
        <PromoSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
