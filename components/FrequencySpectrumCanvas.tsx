'use client';

import React, { useEffect, useRef } from 'react';

interface FrequencySpectrumCanvasProps {
  width?: number;
  height?: number;
}

const FrequencySpectrumCanvas: React.FC<FrequencySpectrumCanvasProps> = ({
  width = 800,
  height = 250
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const baseValuesRef = useRef<number[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on container
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width || width;
        canvas.height = rect.height || height;
      }
    };

    updateCanvasSize();
    const resizeHandler = () => updateCanvasSize();
    window.addEventListener('resize', resizeHandler);

    // Initialize base frequency values (FFT-like spectrum)
    const numBins = 100;
    const baseValues: number[] = [];

    for (let i = 0; i < numBins; i++) {
      let baseValue = 2 + Math.random() * 3; // Noise floor

      const freq = i * 100; // Hz
      if (freq % 1000 === 0 && freq > 0) {
        baseValue += 15 + Math.random() * 10;
      } else if (freq % 500 === 0 && freq > 0) {
        baseValue += 8 + Math.random() * 5;
      }

      if (i === 15 || i === 32 || i === 48 || i === 67) {
        baseValue = 25 + Math.random() * 20;
      }

      if (i > 70) {
        baseValue *= (1 - (i - 70) / 30 * 0.5);
      }

      baseValues.push(baseValue);
    }
    baseValuesRef.current = baseValues;

    const draw = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Clear canvas
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Draw grid
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;

      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = (canvasHeight / 5) * i;
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
      }

      // Vertical grid lines (fewer)
      for (let i = 0; i <= 10; i++) {
        const x = (canvasWidth / 10) * i;
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }

      ctx.setLineDash([]);

      // Draw frequency bars
      const numBins = baseValuesRef.current.length;
      const barWidth = canvasWidth / numBins;
      const maxValue = 50; // Max amplitude for scaling

      // Update values with smooth animation
      timeRef.current += 0.016; // ~60fps

      for (let i = 0; i < numBins; i++) {
        const baseValue = baseValuesRef.current[i];
        const variation = Math.sin(timeRef.current * 2 + i * 0.1) * 1.5 +
                         (Math.random() - 0.5) * 1;
        let value = baseValue + variation;

        // Maintain peaks
        if (i === 15 || i === 32 || i === 48 || i === 67) {
          value = Math.max(value, baseValue * 0.7);
        }

        value = Math.max(0, value);

        const barHeight = (value / maxValue) * canvasHeight * 0.9;
        const x = i * barWidth;
        const y = canvasHeight - barHeight;

        // Draw bar with gradient
        const gradient = ctx.createLinearGradient(x, y, x, canvasHeight);
        gradient.addColorStop(0, '#f97316');
        gradient.addColorStop(1, '#fb923c');

        ctx.fillStyle = gradient;
        ctx.fillRect(x + 1, y, barWidth - 2, barHeight);

        // Draw bar outline
        ctx.strokeStyle = '#ea580c';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x + 1, y, barWidth - 2, barHeight);
      }

      // Draw axes
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);

      // X-axis
      ctx.beginPath();
      ctx.moveTo(0, canvasHeight - 1);
      ctx.lineTo(canvasWidth, canvasHeight - 1);
      ctx.stroke();

      // Y-axis
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, canvasHeight);
      ctx.stroke();

      // Draw labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px system-ui';
      ctx.textAlign = 'center';

      // X-axis labels (frequency)
      for (let i = 0; i <= 10; i++) {
        const x = (canvasWidth / 10) * i;
        const freq = (i * 1000).toString();
        ctx.fillText(freq, x, canvasHeight - 5);
      }

      // Y-axis labels (amplitude)
      ctx.textAlign = 'right';
      for (let i = 0; i <= 5; i++) {
        const y = canvasHeight - (canvasHeight / 5) * i;
        const amp = (i * 10).toString();
        ctx.fillText(amp, -5, y + 3);
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeHandler);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
};

export default FrequencySpectrumCanvas;

