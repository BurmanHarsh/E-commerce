import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function PromoSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Custom Designer Promo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 md:p-12 group"
          >
            <div className="relative z-10">
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                Custom Designer
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
                Create Your Own<br />Unique Style
              </h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Use our designer tool to create custom t-shirts with your own graphics and text.
              </p>
              <Button asChild variant="secondary" className="group/btn">
                <Link to="/designer">
                  Start Designing
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background" />
            </div>
          </motion.div>

          {/* New Arrivals Promo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 p-8 md:p-12 group"
          >
            <div className="relative z-10">
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                New Drop
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
                2025 Spring<br />Collection
              </h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Fresh styles for the new season. Limited quantities available.
              </p>
              <Button asChild className="neon-box">
                <Link to="/shop?collection=new">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
