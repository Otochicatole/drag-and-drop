import  { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Image {
  default: string;
  size: number;
}

export default function Home() {
  const [shuffledImages, setShuffledImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const importAll = (r: { [key: string]: () => Promise<Image> }) =>
      Object.keys(r).map((key) => r[key]());
    const imageGlob = import.meta.glob(
      "/src/images/*.{png,jpg,svg}"
    ) as Record<string, () => Promise<Image>>;
    const imageList = Promise.all(importAll(imageGlob));
    imageList.then((images) => {
      setShuffledImages(images);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShuffledImages((prevImages) => {
        const shuffled = [...prevImages].sort(() => Math.random() - 0.5);
        return shuffled.map((image) => ({
          ...image,
          size: Math.floor(Math.random() * 2) + 1,
        }));
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const openPreview = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex p-1 lg:p-3 w-full h-full">
      {/* ✅ Solución: Usamos CSS Grid con grid-auto-flow: dense */}
      <div
        className="grid gap-3 w-full h-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gridAutoFlow: "dense",
        }}
      >
        <AnimatePresence>
          {shuffledImages.map((image, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="cursor-pointer w-full h-full"
              style={{
                gridColumn: `span ${image.size || 1}`,
                gridRow: `span ${image.size || 1}`,
                zIndex: '5'
              }}
              onClick={() => openPreview(image.default)}
            >
              <motion.img
                src={image.default}
                alt={`Imagen ${index}`}
                className="w-full h-full object-cover rounded-lg"
                whileHover={{ scale: 1.05 }}
                style={{zIndex: '5'}}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed flex flex-col inset-0 bg-black bg-opacity-75 items-center justify-center p-4 overflow-y-auto "
            onClick={closePreview}
            style={{zIndex: '9999'}}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-full m-3 max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Preview"
                className="max-w-full max-h-screen rounded-lg"
              />
              <button
                onClick={closePreview}
                className="absolute top-2 right-2 bg-white rounded-full p-2 max-w-[50px] max-h-[50px] w-[50px] h-[50px] shadow-lg hover:bg-gray-200 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </motion.div>
            <br />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
