'use client';

import { useState } from 'react';
import ImageGenerator from '@/components/ImageGenerator';
import ImageGallery from '@/components/ImageGallery';

interface Image {
  id: string;
  url: string;
  prompt: string;
  likes: number;
}

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);

  const handleLike = (id: string) => {
    setImages(images.map(image => 
      image.id === id ? { ...image, likes: image.likes + 1 } : image
    ));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI 图片生成器
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            使用 AI 技术，将你的想象转化为现实
          </p>
        </div>

        <div className="mb-12">
          <ImageGenerator />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            最新生成的图片
          </h2>
          <ImageGallery images={images} onLike={handleLike} />
        </div>
      </div>
    </main>
  );
} 
