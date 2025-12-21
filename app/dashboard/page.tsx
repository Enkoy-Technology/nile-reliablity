'use client';

import FrequencySpectrumCanvas from '@/components/FrequencySpectrumCanvas';
import Logo from '@/components/Logo';
import TimeWaveformCanvas from '@/components/TimeWaveformCanvas';
import { motion } from 'framer-motion';
import { Activity, ArrowLeft, Clock, RefreshCw, Shield } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Dynamically import recharts with no SSR (only for trend chart)
const RechartsContainer = dynamic(
  () => import('@/components/RechartsContainer'),
  { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center text-slate-400">Loading chart...</div> }
);

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState('');
  const [mounted, setMounted] = useState(false);

  // Trend data state (updates less frequently, so React state is fine)
  const [trendData, setTrendData] = useState<Array<{ day: number; value: number }>>([]);
  const [equipment, setEquipment] = useState([
    { name: 'Main Turbine', value: '2.1 mm/s', status: 'normal' },
    { name: 'Pump System A', value: '3.8 mm/s', status: 'normal' },
    { name: 'Compressor Unit 1', value: '1.5 mm/s', status: 'normal' },
    { name: 'Generator B', value: '2.9 mm/s', status: 'normal' },
  ]);

  // Refs to maintain base values for trend updates
  const trendBaseRef = useRef<Array<number>>([]);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize trend data
  useEffect(() => {
    const initialData = [];
    const baseValues = [];
    for (let i = 0; i < 30; i++) {
      const baseValue = 2.0 + (i * 0.03) + Math.sin(i * 0.3) * 0.3;
      baseValues.push(baseValue);
      initialData.push({ day: i + 1, value: baseValue });
    }
    trendBaseRef.current = baseValues;
    setTrendData(initialData);
  }, []);

  // Update performance trends (slower updates)
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setTrendData(prevData => {
        return prevData.map((item, index) => {
          const baseValue = trendBaseRef.current[index] || item.value;
          // Add small random variations
          const variation = (Math.random() - 0.5) * 0.15;
          return {
            ...item,
            value: Math.max(0, baseValue + variation)
          };
        });
      });
    }, 500);

    return () => clearInterval(interval);
  }, [mounted]);

  // Update equipment values periodically
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setEquipment(prev => prev.map(item => {
        const currentValue = parseFloat(item.value);
        const variation = (Math.random() - 0.5) * 0.3;
        const newValue = Math.max(0.5, currentValue + variation);
        return {
          ...item,
          value: `${newValue.toFixed(1)} mm/s`
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [mounted]);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                <ArrowLeft size={20} />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-slate-300"></div>
              <Logo />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white py-16 sm:py-20 border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <div className="h-0.5 w-16 bg-slate-900 mx-auto"></div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-6"
            >
              Real-time dashboard with AI-powered predictive analytics and multi-dimensional diagnostics
            </motion.h1>
          </div>
        </div>
      </motion.section>

      {/* Dashboard Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white border border-slate-200 rounded-lg p-6 mb-6 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                ></motion.div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                  Advanced CM Dashboard
                </h2>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-slate-600"
                >
                  <Clock size={18} />
                  <span className="text-sm font-medium">{currentTime}</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-slate-600"
                >
                  <RefreshCw size={18} />
                  <span className="text-sm font-medium">99.8% Sync</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-slate-600"
                >
                  <Shield size={18} />
                  <span className="text-sm font-medium">Level 4 Security</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Dashboard Widgets */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
          >
            {/* Frequency Spectrum */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">Frequency Spectrum</h3>
                  <p className="text-sm text-slate-600">FFT Analysis • 0-10kHz</p>
                </div>
                <motion.span
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-green-500/10 text-green-600 text-xs font-medium px-3 py-1 rounded-full border border-green-500/30"
                >
                  Active
                </motion.span>
              </div>
              <div className="h-64 bg-slate-50 rounded p-4 border border-slate-100">
                {mounted && <FrequencySpectrumCanvas />}
              </div>
            </motion.div>

            {/* Time Waveform */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">Time Waveform</h3>
                  <p className="text-sm text-slate-600">Raw Vibration • 51.2kHz</p>
                </div>
                <motion.span
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-green-500/10 text-green-600 text-xs font-medium px-3 py-1 rounded-full border border-green-500/30"
                >
                  Live
                </motion.span>
              </div>
              <div className="h-64 bg-slate-50 rounded p-4 border border-slate-100">
                {mounted && <TimeWaveformCanvas />}
              </div>
            </motion.div>
          </motion.div>

          {/* Performance Trends & Critical Equipment */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Performance Trends */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">Performance Trends</h3>
                  <p className="text-sm text-slate-600">RMS Velocity • 30-Day</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-sm font-medium">Normal</span>
                  <Activity size={16} className="text-green-600" />
                </div>
              </div>
              <div className="h-64 bg-slate-50 rounded p-4 border border-slate-100">
                {mounted && (
                  <RechartsContainer
                    type="line"
                    data={trendData}
                    dataKey="value"
                    nameKey="day"
                  />
                )}
              </div>
            </motion.div>

            {/* Critical Equipment */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">Critical Equipment</h3>
                  <p className="text-sm text-slate-600">Health Monitoring</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-sm font-medium">All Systems</span>
                  <Activity size={16} className="text-green-600" />
                </div>
              </div>
              <div className="space-y-4">
                {equipment.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="bg-slate-50 rounded border-l-4 border-l-orange-500 border-r border-t border-b border-r-slate-200 border-t-slate-200 border-b-slate-200 p-4 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-slate-900 font-medium mb-1">{item.name}</h4>
                        <p className="text-sm text-slate-600">Vibration Level</p>
                      </div>
                      <div className="text-right">
                        <motion.p
                          animate={{ opacity: [1, 0.8, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          className="text-xl font-bold text-orange-500"
                        >
                          {item.value}
                        </motion.p>
                        <span className="text-xs text-green-600 uppercase tracking-wide">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}