import { useState } from 'react';
import { ShareIcon, HeartIcon } from '@heroicons/react/24/outline';

interface Image {
  id: string;
  url: string;
  prompt: string;
  likes: number;
}

interface ImageGalleryProps {
  images: Image[];
  onLike: (id: string) => void;
}

export default function ImageGallery({ images, onLike }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const handleShare = async (image: Image) => {
    try {
      await navigator.share({
        title: 'AI生成的图片',
        text: image.prompt,
        url: image.url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative group rounded-lg overflow-hidden shadow-lg"
          onClick={() => setSelectedImage(image)}
        >
          <img
            src={image.url}
            alt={image.prompt}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm truncate">{image.prompt}</p>
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike(image.id);
                  }}
                  className="flex items-center space-x-1"
                >
                  <HeartIcon className="h-5 w-5" />
                  <span>{image.likes}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(image);
                  }}
                >
                  <ShareIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full mx-4">
            <img
              src={selectedImage.url}
              alt={selectedImage.prompt}
              className="w-full rounded-lg"
            />
            <p className="text-white mt-4 text-center">{selectedImage.prompt}</p>
          </div>
        </div>
      )}
    </div>
  );
} 
