'use client';

import React, { useEffect, useRef } from 'react';

interface TimeWaveformCanvasProps {
  width?: number;
  height?: number;
}

const TimeWaveformCanvas: React.FC<TimeWaveformCanvasProps> = ({
  width = 800,
  height = 250
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const dataBufferRef = useRef<number[]>([]);
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

    // Initialize buffer with waveform data
    const bufferSize = 400;
    for (let i = 0; i < bufferSize; i++) {
      const t = i * 0.1;
      const value =
        Math.sin(t * 2 * Math.PI) * 30 +
        Math.sin(t * 4 * Math.PI) * 12 +
        Math.sin(t * 6 * Math.PI) * 6 +
        Math.sin(t * 0.5 * Math.PI) * 8;
      dataBufferRef.current.push(value);
    }
    timeRef.current = bufferSize * 0.1;

    const draw = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Clear canvas
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Draw grid
      ctx.strokeStyle = '#e2e8f0';
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

      // Vertical grid lines
      for (let i = 0; i <= 10; i++) {
        const x = (canvasWidth / 10) * i;
        ctx.beginPath();
        ctx.setLineDash([3, 3]);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }

      ctx.setLineDash([]);

      // Update buffer (scrolling effect)
      timeRef.current += 0.1;
      const t = timeRef.current;

      // Remove oldest sample
      dataBufferRef.current.shift();

      // Add new sample
      const newValue =
        Math.sin(t * 2 * Math.PI) * 30 +
        Math.sin(t * 4 * Math.PI) * 12 +
        Math.sin(t * 6 * Math.PI) * 6 +
        Math.sin(t * 0.5 * Math.PI) * 8 +
        (Math.random() - 0.5) * 2;
      dataBufferRef.current.push(newValue);

      // Draw waveform
      const buffer = dataBufferRef.current;
      const bufferSize = buffer.length;
      const centerY = canvasHeight / 2;
      const scaleY = canvasHeight / 100; // Scale to fit ±50 range
      const stepX = canvasWidth / bufferSize;

      // Draw filled area
      ctx.beginPath();
      ctx.moveTo(0, centerY);

      for (let i = 0; i < bufferSize; i++) {
        const x = i * stepX;
        const y = centerY - (buffer[i] * scaleY);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvasWidth, centerY);
      ctx.closePath();

      // Gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0, 'rgba(249, 115, 22, 0.6)');
      gradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.3)');
      gradient.addColorStop(1, 'rgba(249, 115, 22, 0.05)');

      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw waveform line
      ctx.beginPath();
      ctx.moveTo(0, centerY - (buffer[0] * scaleY));

      for (let i = 1; i < bufferSize; i++) {
        const x = i * stepX;
        const y = centerY - (buffer[i] * scaleY);
        ctx.lineTo(x, y);
      }

      // Gradient stroke
      const lineGradient = ctx.createLinearGradient(0, 0, canvasWidth, 0);
      lineGradient.addColorStop(0, '#f97316');
      lineGradient.addColorStop(1, '#fb923c');

      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Draw center line (zero reference)
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvasWidth, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw axes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;

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
      ctx.fillStyle = '#64748b';
      ctx.font = '10px system-ui';
      ctx.textAlign = 'center';

      // X-axis labels (samples)
      for (let i = 0; i <= 10; i++) {
        const x = (canvasWidth / 10) * i;
        const sample = Math.floor((i / 10) * bufferSize).toString();
        ctx.fillText(sample, x, canvasHeight - 5);
      }

      // Y-axis labels (amplitude)
      ctx.textAlign = 'right';
      for (let i = -2; i <= 2; i++) {
        const y = centerY - (i * (canvasHeight / 4));
        const amp = (i * 25).toString();
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

export default TimeWaveformCanvas;

