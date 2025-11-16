import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Car, 
  CloudRain, 
  Activity,
  MapPin,
  Clock,
  AlertCircle,
  BarChart3,
  PieChart
} from 'lucide-react';

// Chart Components
const AreaChart: React.FC<{ data: number[]; color: string }> = ({ data, color }) => (
  <div className="h-32 relative">
    <svg viewBox={`0 0 ${data.length * 30} 100`} className="w-full h-full">
      <defs>
        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color === 'cyan' ? '#00f0ff' : '#00ff88'} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color === 'cyan' ? '#00f0ff' : '#00ff88'} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
        d={`M 0,100 ${data.map((point, i) => `L ${i * 30},${100 - point}`).join(' ')} L ${(data.length - 1) * 30},100 Z`}
        fill="url(#areaGradient)"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        d={data.map((point, i) => `${i === 0 ? 'M' : 'L'} ${i * 30} ${100 - point}`).join(' ')}
        stroke={color === 'cyan' ? '#00f0ff' : '#00ff88'}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const ProgressBar: React.FC<{ value: number; max: number; color: string; label: string }> = ({ value, max, color, label }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-cyan-400">{value}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-2 rounded-full ${color}`}
      />
    </div>
  </div>
);

const DonutChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const size = 120;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className="relative">
      <svg width={size} height={size} className="transform -rotate-90">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const strokeDasharray = circumference;
          const strokeDashoffset = circumference - (percentage / 100) * circumference;
          const offset = currentOffset;
          currentOffset += strokeDashoffset;

          return (
            <motion.circle
              key={item.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={item.color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-white font-bold text-lg">{total}</span>
        <span className="text-gray-400 text-xs">Total</span>
      </div>
    </div>
  );
};

const Analytics: React.FC = () => {
  const trafficData = [45, 60, 75, 85, 70, 55, 40];
  const populationData = [30, 45, 60, 75, 65, 50, 35];
  
  const areaDistribution = [
    { label: 'Bogor Tengah', value: 25, color: '#00f0ff' },
    { label: 'Bogor Utara', value: 20, color: '#00ff88' },
    { label: 'Bogor Timur', value: 18, color: '#ff00f0' },
    { label: 'Bogor Selatan', value: 22, color: '#ffaa00' },
    { label: 'Bogor Barat', value: 15, color: '#aa00ff' }
  ];

  const metrics = [
    { icon: Users, label: 'Peak Population', value: '87%', change: '+5.2%', trend: 'up' },
    { icon: Car, label: 'Avg Traffic Speed', value: '28 km/h', change: '-2.1%', trend: 'down' },
    { icon: CloudRain, label: 'Rainfall Today', value: '45mm', change: '+12%', trend: 'up' },
    { icon: Activity, label: 'Air Quality', value: 'Moderate', change: 'Stable', trend: 'stable' },
  ];

  const kpiCards = [
    { title: 'Traffic Efficiency', value: '78%', subtitle: 'Flow optimization', color: 'text-green-400', icon: TrendingUp },
    { title: 'Public Satisfaction', value: '4.2/5', subtitle: 'Citizen feedback', color: 'text-blue-400', icon: Users },
    { title: 'Response Time', value: '8.3min', subtitle: 'Emergency services', color: 'text-purple-400', icon: Clock },
    { title: 'Infrastructure Health', value: '92%', subtitle: 'System status', color: 'text-cyan-400', icon: Activity },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-3xl font-bold text-cyan-400">Advanced Analytics</h1>
        <p className="text-gray-400">Deep insights and predictive analysis for Bogor City</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        {kpiCards.map((card, index) => (
          <motion.div
            key={card.title}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-cyan-500/20"
          >
            <div className="flex items-center justify-between mb-3">
              <motion.div
                animate={{ 
                  rotate: [0, -5, 0, 5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: index * 0.5 
                }}
              >
                <card.icon className={`w-8 h-8 ${card.color}`} />
              </motion.div>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity 
                }}
              >
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </motion.div>
            </div>
            <h3 className="text-white font-semibold text-lg">{card.value}</h3>
            <p className="text-gray-400 text-sm">{card.title}</p>
            <p className="text-cyan-300/80 text-xs mt-1">{card.subtitle}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Analysis */}
        <motion.div
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02, 
            y: -5,
            transition: { type: "spring", stiffness: 400 }
          }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/20 space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ 
                  rotate: [0, -5, 0, 5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: 0 
                }}
              >
                <Car className="w-6 h-6 text-orange-400" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Traffic Flow Analysis</h3>
                <p className="text-gray-400 text-sm">7-day trend pattern</p>
              </div>
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              <TrendingUp className="w-5 h-5 text-green-400" />
            </motion.div>
          </div>

          <AreaChart data={trafficData} color="cyan" />

          <div className="grid grid-cols-2 gap-4 text-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700/50 rounded-lg p-3"
            >
              <div className="text-2xl font-bold text-orange-400">85%</div>
              <div className="text-gray-400 text-xs">Peak Congestion</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700/50 rounded-lg p-3"
            >
              <div className="text-2xl font-bold text-green-400">32km/h</div>
              <div className="text-gray-400 text-xs">Avg Speed</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Population Analysis */}
        <motion.div
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02, 
            y: -5,
            transition: { type: "spring", stiffness: 400 }
          }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/20 space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ 
                  rotate: [0, -5, 0, 5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: 1 
                }}
              >
                <Users className="w-6 h-6 text-purple-400" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Population Movement</h3>
                <p className="text-gray-400 text-sm">Weekly density patterns</p>
              </div>
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              <TrendingUp className="w-5 h-5 text-green-400" />
            </motion.div>
          </div>

          <AreaChart data={populationData} color="green" />

          <div className="space-y-4">
            <ProgressBar value={75} max={100} color="bg-purple-400" label="Bogor Tengah" />
            <ProgressBar value={60} max={100} color="bg-blue-400" label="Bogor Utara" />
            <ProgressBar value={45} max={100} color="bg-cyan-400" label="Bogor Timur" />
          </div>
        </motion.div>

        {/* Area Distribution */}
        <motion.div
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02, 
            y: -5,
            transition: { type: "spring", stiffness: 400 }
          }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ 
                  rotate: [0, -5, 0, 5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: 2 
                }}
              >
                <PieChart className="w-6 h-6 text-green-400" />
              </motion.div>
              <h3 className="text-xl font-semibold text-cyan-300">Area Distribution</h3>
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              <MapPin className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>

          <div className="flex items-center justify-center mb-6">
            <DonutChart data={areaDistribution} />
          </div>

          <div className="space-y-3">
            {areaDistribution.map((area, index) => (
              <motion.div
                key={area.label}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  x: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="flex items-center justify-between p-2 hover:bg-gray-700/30 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: area.color }}
                  />
                  <span className="text-gray-300 text-sm">{area.label}</span>
                </div>
                <span className="text-cyan-400 font-semibold">{area.value}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real-time Metrics */}
        <motion.div
          variants={itemVariants}
          whileHover={{ 
            scale: 1.02, 
            y: -5,
            transition: { type: "spring", stiffness: 400 }
          }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ 
                  rotate: [0, -5, 0, 5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: 3 
                }}
              >
                <Activity className="w-6 h-6 text-yellow-400" />
              </motion.div>
              <h3 className="text-xl font-semibold text-cyan-300">Real-time Metrics</h3>
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              <AlertCircle className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>

          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  y: -2,
                  transition: { type: "spring", stiffness: 400 }
                }}
                className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-cyan-500/10"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.5 
                    }}
                  >
                    <metric.icon className={`w-5 h-5 ${
                      metric.trend === 'up' ? 'text-green-400' : 
                      metric.trend === 'down' ? 'text-red-400' : 'text-yellow-400'
                    }`} />
                  </motion.div>
                  <div>
                    <div className="text-white font-medium">{metric.label}</div>
                    <div className="text-gray-400 text-sm">{metric.value}</div>
                  </div>
                </div>
                <div className={`text-xs font-semibold ${
                  metric.trend === 'up' ? 'text-green-400' : 
                  metric.trend === 'down' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {metric.change}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Data Points', value: '24.7K', color: 'text-cyan-400' },
          { label: 'Analysis Complete', value: '98%', color: 'text-green-400' },
          { label: 'Prediction Accuracy', value: '94.2%', color: 'text-purple-400' },
          { label: 'Update Frequency', value: 'Real-time', color: 'text-orange-400' },
        ].map((stat, _index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 text-center border border-cyan-500/20"
          >
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Analytics;