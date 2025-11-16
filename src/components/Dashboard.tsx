import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Car, 
  Users, 
  Zap, 
  CloudRain, 
  AlertTriangle,
  TrendingUp,
  Gauge,
  MapPin,
  Wifi,
  Droplets
} from 'lucide-react';
import { useDashboardData } from '../hooks/useDashboardData';

// Scaled down BarChart
const BarChart: React.FC<{ data: number[]; labels: string[]; color: string }> = ({ data, labels, color }) => (
  <div className="flex items-end justify-between h-16 space-x-3">
    {data.map((value, index) => (
      <motion.div
        key={index}
        initial={{ height: 0 }}
        animate={{ height: `${value}%` }}
        transition={{ duration: 1, delay: index * 0.1 }}
        className={`${color} rounded-t flex-1 relative min-w-10 group`}
        whileHover={{ scale: 1.05 }}
      >
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-400 whitespace-nowrap">
          {labels[index]}
        </div>
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-[10px] text-white bg-gray-800 px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {value}%
        </div>
      </motion.div>
    ))}
  </div>
);

// Scaled down WideBarChart
const WideBarChart: React.FC<{ data: number[]; labels: string[]; color: string }> = ({ data, labels, color }) => (
  <div className="flex items-end justify-between h-16 space-x-3">
    {data.map((value, index) => (
      <motion.div
        key={index}
        initial={{ height: 0 }}
        animate={{ height: `${value}%` }}
        transition={{ duration: 1, delay: index * 0.1 }}
        className={`${color} rounded-t flex-1 relative min-w-10 group`}
        whileHover={{ scale: 1.08 }}
      >
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[9px] text-gray-400 whitespace-nowrap">
          {labels[index]}
        </div>
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-[10px] text-white bg-gray-800 px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {value}%
        </div>
      </motion.div>
    ))}
  </div>
);

const LineChart: React.FC<{ data: number[]; color: string }> = ({ data, color }) => (
  <div className="h-16 relative">
    <svg viewBox={`0 0 ${data.length * 20} 100`} className="w-full h-full">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2 }}
        d={data.map((point, i) => 
          `${i === 0 ? 'M' : 'L'} ${i * 20} ${100 - point}`
        ).join(' ')}
        stroke={color.replace('text-', '').split('-')[0] === 'cyan' ? '#00f0ff' : '#00ff88'}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const DonutChart: React.FC<{ value: number; max: number; color: string; size?: number }> = ({ 
  value, max, color, size = 50 
}) => {
  const circumference = 2 * Math.PI * (size / 2 - 2);
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <motion.div className="relative" whileHover={{ scale: 1.05 }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-gray-700"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className={color}
          initial={{ strokeDasharray, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
        {value}%
      </div>
    </motion.div>
  );
};

const RadialProgress: React.FC<{ value: number; color: string }> = ({ value, color }) => (
  <div className="relative w-12 h-12">
    <motion.div
      className={`w-full h-full rounded-full border-3 border-gray-700 flex items-center justify-center ${color} border-t-transparent border-r-transparent`}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: value / 100 * 2, ease: "linear" }}
    />
    <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
      {value}%
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { data, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
            className="w-12 h-12 border-3 border-cyan-500 border-t-transparent rounded-full mx-auto mb-3"
          />
          <motion.h2
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-cyan-400"
          >
            BOGOR NEXUS
          </motion.h2>
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-sm mt-1"
          >
            Loading City Intelligence...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  const trafficData = [65, 80, 75, 60, 70, 50];
  const trafficLabels = ['S Kencana', 'Ring Road', 'Puncak', 'Ciawi', 'Jl Baru', 'Tol'];
  
  const populationData = [85, 60, 45, 70, 90, 55];
  const areaLabels = ['Tengah', 'Utara', 'Timur', 'Selatan', 'Barat', 'Tanah Sereal'];

  const cards = [
    { 
      icon: Car, 
      title: 'Traffic Grid', 
      value: `${data.traffic.congestion}%`,
      subtitle: 'City-wide congestion',
      color: 'text-orange-400',
      bg: 'bg-gradient-to-br from-orange-500/10 to-orange-600/5',
      chart: <BarChart data={trafficData} labels={trafficLabels} color="bg-orange-400" />,
      delay: 0
    },
    { 
      icon: Activity, 
      title: 'Air Quality', 
      value: `${data.environment.airQuality} AQI`,
      subtitle: 'Moderate pollution level',
      color: 'text-green-400',
      bg: 'bg-gradient-to-br from-green-500/10 to-green-600/5',
      chart: <LineChart data={[30, 45, 35, 50, 40, 42]} color="text-green-400" />,
      delay: 0.1
    },
    { 
      icon: Zap, 
      title: 'Power Grid', 
      value: `${data.utilities.powerStatus}%`,
      subtitle: 'Stable operation',
      color: 'text-yellow-400',
      bg: 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/5',
      chart: <RadialProgress value={data.utilities.powerStatus} color="border-yellow-400" />,
      delay: 0.2
    },
    { 
      icon: Users, 
      title: 'Population Density', 
      value: `${data.population.density}%`,
      subtitle: 'Distribution by area',
      color: 'text-purple-400',
      bg: 'bg-gradient-to-br from-purple-500/10 to-purple-600/5',
      chart: <WideBarChart data={populationData} labels={areaLabels} color="bg-purple-400" />,
      delay: 0.3
    },
    { 
      icon: CloudRain, 
      title: 'Rainfall', 
      value: `${data.environment.rainfall}%`,
      subtitle: 'Precipitation intensity',
      color: 'text-cyan-400',
      bg: 'bg-gradient-to-br from-cyan-500/10 to-cyan-600/5',
      chart: <DonutChart value={data.environment.rainfall} max={100} color="text-cyan-400" />,
      delay: 0.4
    },
    { 
      icon: AlertTriangle, 
      title: 'System Status', 
      value: `${100 - data.traffic.accidents * 10}%`,
      subtitle: 'Infrastructure health',
      color: 'text-red-400',
      bg: 'bg-gradient-to-br from-red-500/10 to-red-600/5',
      chart: <RadialProgress value={100 - data.traffic.accidents * 10} color="border-red-400" />,
      delay: 0.5
    }
  ];

  // Additional mini stats
  const miniStats = [
    { icon: Wifi, label: 'Network Uptime', value: '99.9%', color: 'text-green-400' },
    { icon: Droplets, label: 'Water Supply', value: '92%', color: 'text-blue-400' },
    { icon: MapPin, label: 'Active Sensors', value: '1,247', color: 'text-purple-400' },
    { icon: Gauge, label: 'Response Time', value: '47ms', color: 'text-cyan-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 relative min-h-screen overflow-hidden"
    >
      {/* Header - Scaled down */}
      <motion.div
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 mb-6"
      >
        <h1 className="text-2xl font-bold text-cyan-400 mb-1">
          City Metrics Dashboard
        </h1>
        <p className="text-gray-400 text-sm">
          Real-time analytics for <span className="text-cyan-400">Bogor City</span>
        </p>
      </motion.div>

      {/* Mini Stats Row - Scaled down */}
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {miniStats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03, y: -1 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-3 border border-cyan-500/20"
          >
            <div className="flex items-center space-x-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <div className="text-gray-400 text-xs">{stat.label}</div>
                <div className="text-white font-semibold text-sm">{stat.value}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Analytics Grid - Scaled down */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: card.delay, type: "spring", stiffness: 100 }}
            whileHover={{ 
              scale: 1.01, 
              y: -2,
              transition: { type: "spring", stiffness: 400 }
            }}
            className={`${card.bg} backdrop-blur-xl rounded-xl p-4 border border-cyan-500/30 relative overflow-hidden group`}
          >
            {/* Header - Scaled down */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ 
                    rotate: [0, -3, 0, 3, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: card.delay 
                  }}
                >
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </motion.div>
                <div>
                  <h2 className="text-white font-semibold text-sm">{card.title}</h2>
                  <p className="text-cyan-300/80 text-xs">{card.subtitle}</p>
                </div>
              </div>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity 
                }}
              >
                <TrendingUp className="w-4 h-4 text-green-400" />
              </motion.div>
            </div>

            {/* Main Value - Scaled down */}
            <motion.div 
              className="text-2xl font-bold text-white mb-3 text-center"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: card.delay + 0.15, type: "spring" }}
            >
              {card.value}
            </motion.div>

            {/* Chart/Diagram - Scaled down */}
            <div className="h-16 flex items-center justify-center">
              {card.chart}
            </div>

            {/* Progress Indicator - Scaled down */}
            <motion.div 
              className="w-full bg-gray-700/50 rounded-full h-1.5 mt-3 overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: card.delay + 0.25 }}
            >
              <motion.div
                className={`h-full rounded-full ${card.color.replace('text-', 'bg-')}`}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${parseInt(card.value)}%`,
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: card.delay + 0.4,
                  ease: "easeOut"
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

        <script type="application/ld+json">
        {`
        {
        "@context": "https://schema.org",
        "@type": "Dashboard",
        "name": "Bogor City Intelligence Dashboard",
        "description": "Real-time monitoring of traffic, population, environment and utilities in Bogor City",
        "mainEntity": {
            "@type": "WebPage",
            "name": "City Overview",
            "description": "Comprehensive overview of Bogor City infrastructure metrics"
        }
        }
        `}
</script>
export default Dashboard;