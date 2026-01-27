import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductGrid } from '@/components/products/ProductGrid';
import { motion } from 'framer-motion';

const Shop = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 md:pt-28">
        {/* Page Header */}
        <section className="py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Shop All</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Browse our complete collection of premium streetwear. From t-shirts to hoodies, 
                find your next statement piece.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <ProductGrid limit={20} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
