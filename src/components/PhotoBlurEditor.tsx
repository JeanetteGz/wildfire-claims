import React, { useRef, useState, useEffect } from 'react';

interface PhotoBlurEditorProps {
  imageUrl: string;
  onSave: (blurredImageUrl: string) => void;
  onCancel: () => void;
}

interface Point {
  x: number;
  y: number;
}

const PhotoBlurEditor: React.FC<PhotoBlurEditorProps> = ({ imageUrl, onSave, onCancel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [blurRadius, setBlurRadius] = useState(20);
  const [blurHistory, setBlurHistory] = useState<Point[][]>([]);
  const [currentBlurStrokes, setCurrentBlurStrokes] = useState<Point[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scale, setScale] = useState(1);

  // Initialize canvas and load image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      // Calculate scale to fit image in viewport
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.6;
      const scale = Math.min(
        maxWidth / image.width,
        maxHeight / image.height,
        1
      );

      canvas.width = image.width * scale;
      canvas.height = image.height * scale;
      setScale(scale);

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      setImageLoaded(true);
    };
  }, [imageUrl]);

  // Apply blur effects
  useEffect(() => {
    if (!imageLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Redraw original image
    const image = new Image();
    image.src = imageUrl;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Apply all blur strokes
    ctx.filter = `blur(${blurRadius}px)`;
    blurHistory.forEach(stroke => {
      if (stroke.length < 2) return;
      
      ctx.beginPath();
      ctx.moveTo(stroke[0].x * scale, stroke[0].y * scale);
      
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x * scale, stroke[i].y * scale);
      }
      
      ctx.strokeStyle = 'rgba(255,255,255,0)';
      ctx.lineWidth = blurRadius * 2;
      ctx.stroke();
    });

    ctx.filter = 'none';
  }, [blurHistory, imageLoaded, blurRadius, imageUrl, scale]);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const point = getMousePos(e);
    setCurrentBlurStrokes([point]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const point = getMousePos(e);
    setCurrentBlurStrokes(prev => [...prev, point]);
  };

  const stopDrawing = () => {
    if (currentBlurStrokes.length > 0) {
      setBlurHistory(prev => [...prev, currentBlurStrokes]);
      setCurrentBlurStrokes([]);
    }
    setIsDrawing(false);
  };

  const handleUndo = () => {
    setBlurHistory(prev => prev.slice(0, -1));
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const blurredImageUrl = canvas.toDataURL('image/jpeg');
    onSave(blurredImageUrl);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Blur Sensitive Information
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Blur Size:
              </label>
              <input
                type="range"
                min="5"
                max="50"
                value={blurRadius}
                onChange={(e) => setBlurRadius(Number(e.target.value))}
                className="w-24"
              />
            </div>
            <button
              onClick={handleUndo}
              disabled={blurHistory.length === 0}
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Undo
            </button>
          </div>
        </div>

        <div className="relative border rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-gray-900">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="max-w-full h-auto cursor-crosshair"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded"
          >
            Save Changes
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Click and drag on the image to blur sensitive information. Use the slider to adjust blur intensity.
        </p>
      </div>
    </div>
  );
};

export default PhotoBlurEditor;