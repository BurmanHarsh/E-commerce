import { motion } from 'framer-motion';
import { Truck, Shield, Palette, RefreshCcw } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Free worldwide shipping on all orders over $100'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Your payment information is safe and encrypted'
  },
  {
    icon: Palette,
    title: 'Custom Designs',
    description: 'Create your own unique designs with our tool'
  },
  {
    icon: RefreshCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns on all products'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-16 border-y border-border bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
