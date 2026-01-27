import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Minus, Plus, Loader2, Check } from 'lucide-react';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useProduct } from '@/hooks/useProducts';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/shopify';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { handle } = useParams();
  const { data: product, isLoading, error } = useProduct(handle || '');

  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const selectedVariant =
    product?.variants?.edges?.find(({ node }) =>
      node.selectedOptions.every(
        opt => selectedOptions[opt.name] === opt.value
      )
    )?.node || product?.variants?.edges?.[0]?.node;

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;

    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });

    toast.success('Added to cart', {
      description: `${product.title} x ${quantity}`,
      position: 'top-center',
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 md:pt-28">
          <div className="container mx-auto px-4 py-20 text-center">
            <p className="text-destructive">Failed to load product</p>
            <Button asChild className="mt-4">
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 md:pt-28">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-12">
              <Skeleton className="aspect-square rounded-xl" />
              <div className="space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 md:pt-28">
          <div className="container mx-auto px-4 py-20 text-center">
            <p className="text-muted-foreground">Product not found</p>
            <Button asChild className="mt-4">
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = product.images?.edges || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 md:pt-28">
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/shop"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-secondary/30">
                {images[selectedImageIndex] ? (
                  <img
                    src={images[selectedImageIndex].node.url}
                    alt={
                      images[selectedImageIndex].node.altText ||
                      product.title
                    }
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={cn(
                        'w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2',
                        selectedImageIndex === index
                          ? 'border-primary'
                          : 'border-transparent'
                      )}
                    >
                      <img
                        src={img.node.url}
                        alt={
                          img.node.altText ||
                          `${product.title} ${index + 1}`
                        }
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {product.title}
                </h1>
                <p className="text-3xl font-semibold text-primary">
                  {selectedVariant &&
                    formatPrice(
                      selectedVariant.price.amount,
                      selectedVariant.price.currencyCode
                    )}
                </p>
              </div>

              <p className="text-muted-foreground">
                {product.description}
              </p>

              {product.options?.map(option => (
                <div key={option.name} className="space-y-3">
                  <label className="text-sm font-medium">
                    {option.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map(value => (
                      <button
                        key={value}
                        onClick={() =>
                          handleOptionChange(option.name, value)
                        }
                        className={cn(
                          'px-4 py-2 rounded-lg border text-sm',
                          (selectedOptions[option.name] ||
                            product.variants?.edges?.[0]?.node?.selectedOptions?.find(
                              o => o.name === option.name
                            )?.value) === value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="space-y-3">
                <label className="text-sm font-medium">Quantity</label>
                <div className="flex items-center border rounded-lg w-fit">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setQuantity(Math.max(1, quantity - 1))
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={
                  cartLoading || !selectedVariant?.availableForSale
                }
                size="lg"
                className="w-full text-lg"
              >
                {cartLoading ? (
                  <Loader2 className="animate-spin" />
                ) : !selectedVariant?.availableForSale ? (
                  'Sold Out'
                ) : (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
