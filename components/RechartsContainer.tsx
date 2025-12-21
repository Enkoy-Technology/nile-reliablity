'use client';

import React from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface RechartsContainerProps {
  type: 'bar' | 'line' | 'area';
  data: any[];
  dataKey: string;
  nameKey: string;
}

const RechartsContainer: React.FC<RechartsContainerProps> = ({
  type,
  data,
  dataKey,
  nameKey,
}) => {
  const chartProps = {
    data,
    margin: { top: 10, right: 15, left: 5, bottom: 30 },
  };

  const axisStyle = {
    stroke: '#94a3b8',
    fontSize: 11,
    tick: { fill: '#64748b' },
  };

  const tooltipStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    color: '#1e293b',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    padding: '8px 12px',
  };

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart {...chartProps} barCategoryGap="2%">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis
            dataKey={nameKey}
            {...axisStyle}
            tick={{ fontSize: 10 }}
            label={{ value: 'Frequency (Hz)', position: 'insideBottom', offset: -5, style: { fill: '#64748b', fontSize: 11 } }}
          />
          <YAxis
            {...axisStyle}
            tick={{ fontSize: 10 }}
            label={{ value: 'Amplitude', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: 11 } }}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: 'rgba(249, 115, 22, 0.1)' }}
            formatter={(value: any) => [`${value.toFixed(2)}`, 'Amplitude']}
            labelFormatter={(label) => `Frequency: ${label} Hz`}
          />
          <Bar
            dataKey={dataKey}
            fill="#f97316"
            radius={[1, 1, 0, 0]}
            isAnimationActive={true}
            animationDuration={300}
            animationEasing="ease-in-out"
            maxBarSize={8}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'area') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart {...chartProps}>
          <defs>
            <linearGradient id="waveformGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={0.6} />
              <stop offset="50%" stopColor="#f97316" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#f97316" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="waveformLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis
            dataKey={nameKey}
            {...axisStyle}
            tick={{ fontSize: 10 }}
            label={{ value: 'Time (samples)', position: 'insideBottom', offset: -5, style: { fill: '#64748b', fontSize: 11 } }}
          />
          <YAxis
            {...axisStyle}
            tick={{ fontSize: 10 }}
            label={{ value: 'Amplitude', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: 11 } }}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '5 5' }}
            formatter={(value: any) => [`${value.toFixed(2)}`, 'Amplitude']}
            labelFormatter={(label) => `Sample: ${label}`}
          />
          <Area
            type="basis"
            dataKey={dataKey}
            stroke="url(#waveformLineGradient)"
            strokeWidth={2.5}
            fill="url(#waveformGradient)"
            isAnimationActive={true}
            animationDuration={200}
            animationEasing="linear"
            dot={false}
            activeDot={{ r: 4, fill: '#f97316', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart {...chartProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
          <XAxis
            dataKey={nameKey}
            {...axisStyle}
            tick={{ fontSize: 10 }}
            label={{ value: 'Day', position: 'insideBottom', offset: -5, style: { fill: '#64748b', fontSize: 11 } }}
          />
          <YAxis
            {...axisStyle}
            tick={{ fontSize: 10 }}
            label={{ value: 'RMS Velocity (mm/s)', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: 11 } }}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ stroke: '#f97316', strokeWidth: 1 }}
            formatter={(value: any) => [`${value.toFixed(2)} mm/s`, 'RMS Velocity']}
            labelFormatter={(label) => `Day ${label}`}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#f97316"
            strokeWidth={3}
            dot={{ fill: '#f97316', r: 3, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, fill: '#f97316', stroke: '#fff', strokeWidth: 2 }}
            isAnimationActive={true}
            animationDuration={400}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return null;
};

export default RechartsContainer;

