import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Cpu, 
  Network, 
  Zap, 
  Activity, 
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Sparkles,
  Satellite,
  Binary,
  CircuitBoard,
  Scan
} from 'lucide-react';

// Animated Neural Network Visualization
const NeuralNetworkViz: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nodes = Array.from({ length: 8 }, (_, i) => i)
        .filter(() => Math.random() > 0.5);
      setActiveNodes(nodes);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 w-full">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        {/* Connections */}
        {[0, 1, 2, 3].map((layer) => 
          [0, 1, 2, 3, 4, 5, 6, 7].map((node) => 
            [0, 1, 2, 3, 4, 5, 6, 7].map((target) => (
              <motion.line
                key={`${layer}-${node}-${target}`}
                x1={50 + layer * 100}
                y1={30 + node * 20}
                x2={150 + layer * 100}
                y2={30 + target * 20}
                stroke="rgba(0, 240, 255, 0.1)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: Math.random() * 2 }}
              />
            ))
          )
        )}

        {/* Nodes */}
        {[0, 1, 2, 3, 4].map((layer) =>
          [0, 1, 2, 3, 4, 5, 6, 7].map((node) => (
            <motion.circle
              key={`node-${layer}-${node}`}
              cx={50 + layer * 75}
              cy={30 + node * 20}
              r="4"
              fill={activeNodes.includes(node) ? "#00f0ff" : "rgba(0, 240, 255, 0.3)"}
              initial={{ scale: 0 }}
              animate={{ 
                scale: activeNodes.includes(node) ? [1, 1.5, 1] : 1,
                fill: activeNodes.includes(node) ? ["#00f0ff", "#ff00f0", "#00f0ff"] : "rgba(0, 240, 255, 0.3)"
              }}
              transition={{ 
                duration: 0.8,
                fill: { duration: 1.5, repeat: Infinity }
              }}
            />
          ))
        )}
      </svg>
    </div>
  );
};

// Data Stream Visualization
const DataStream: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newPoints = [...prev, Math.random() * 100];
        return newPoints.slice(-20);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-32 relative overflow-hidden">
      <svg viewBox="0 0 400 100" className="w-full h-full">
        <motion.path
          d={dataPoints.map((point, i) => 
            `${i === 0 ? 'M' : 'L'} ${i * 20} ${100 - point}`
          ).join(' ')}
          stroke="url(#dataGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="50%" stopColor="#ff00f0" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Floating data particles */}
      {dataPoints.slice(-10).map((point, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${95 + i * 4}%`,
            bottom: `${point}%`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 1.5, 
            delay: i * 0.1 
          }}
        />
      ))}
    </div>
  );
};

// Training Progress Component
const TrainingProgress: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">Model Training</span>
      <span className="text-cyan-400">{progress}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-3">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="h-3 rounded-full bg-linear-to-r from-cyan-400 to-purple-500 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-30"
          animate={{ x: [-100, 300] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ width: '50%' }}
        />
      </motion.div>
    </div>
  </div>
);

const NeuralNetwork: React.FC = () => {
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [activePredictions, setActivePredictions] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setTrainingProgress(prev => (prev >= 95 ? 95 : prev + 5));
    }, 2000);

    const predictionInterval = setInterval(() => {
      setActivePredictions(prev => (prev + 1) % 10000);
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(predictionInterval);
    };
  }, []);

  const predictions = [
    { 
      name: 'Traffic Flow', 
      accuracy: 92, 
      confidence: 88,
      trend: 'up',
      icon: CircuitBoard
    },
    { 
      name: 'Population Movement', 
      accuracy: 87, 
      confidence: 85,
      trend: 'stable',
      icon: Satellite
    },
    { 
      name: 'Weather Patterns', 
      accuracy: 94, 
      confidence: 91,
      trend: 'up',
      icon: Scan
    },
    { 
      name: 'Utility Demand', 
      accuracy: 89, 
      confidence: 86,
      trend: 'down',
      icon: Zap
    }
  ];

  const systemMetrics = [
    { label: 'Processing Power', value: '78%', icon: Cpu, color: 'text-green-400' },
    { label: 'Memory Usage', value: '64%', icon: Brain, color: 'text-blue-400' },
    { label: 'Data Throughput', value: '2.4GB/s', icon: Network, color: 'text-purple-400' },
    { label: 'Active Models', value: '12', icon: Binary, color: 'text-cyan-400' },
  ];

  const anomalies = [
    { type: 'Critical', count: 0, status: 'normal', color: 'text-green-400' },
    { type: 'Warning', count: 3, status: 'monitoring', color: 'text-yellow-400' },
    { type: 'Minor', count: 12, status: 'stable', color: 'text-blue-400' },
    { type: 'Informational', count: 47, status: 'optimal', color: 'text-cyan-400' },
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
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ 
              rotate: [0, -10, 0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity 
            }}
          >
            <Brain className="w-8 h-8 text-cyan-400" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">Neural Network</h1>
            <p className="text-gray-400">Advanced AI-powered city intelligence system</p>
          </div>
        </div>
      </motion.div>

      {/* System Metrics */}
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        {systemMetrics.map((metric) => (
          <motion.div
            key={metric.label}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-cyan-500/20"
          >
            <div className="flex items-center justify-between mb-2">
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
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
                <Activity className="w-4 h-4 text-gray-400" />
              </motion.div>
            </div>
            <div className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
            <div className="text-gray-400 text-sm">{metric.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Neural Network Visualization */}
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
              <Network className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-cyan-300">Live Network Activity</h3>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </motion.div>
          </div>
          
          <NeuralNetworkViz />
          
          <div className="mt-4 text-center">
            <div className="text-cyan-400 font-bold text-lg">
              {activePredictions.toLocaleString()} predictions/sec
            </div>
            <div className="text-gray-400 text-sm">Real-time processing</div>
          </div>
        </motion.div>

        {/* Predictive Analytics */}
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
              <BarChart3 className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-cyan-300">Predictive Analytics</h3>
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>

          <div className="space-y-4">
            {predictions.map((prediction) => (
              <motion.div
                key={prediction.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ 
                  scale: 1.02,
                  x: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-cyan-500/10"
              >
                <div className="flex items-center space-x-3">
                  <prediction.icon className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-white font-medium text-sm">{prediction.name}</div>
                    <div className="text-gray-400 text-xs">{prediction.confidence}% confidence</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-cyan-400 font-bold">{prediction.accuracy}%</div>
                  <div className={`text-xs ${
                    prediction.trend === 'up' ? 'text-green-400' : 
                    prediction.trend === 'down' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {prediction.trend === 'up' ? '↑ Improving' : 
                     prediction.trend === 'down' ? '↓ Declining' : '→ Stable'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Training Progress */}
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
              <Zap className="w-6 h-6 text-yellow-400" />
              <h3 className="text-xl font-semibold text-cyan-300">Model Training</h3>
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity 
              }}
            >
              <Activity className="w-5 h-5 text-green-400" />
            </motion.div>
          </div>

          <TrainingProgress progress={trainingProgress} />

          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Epoch 245/300</span>
              <span className="text-cyan-400">Loss: 0.0234</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Learning Rate</span>
              <span className="text-cyan-400">0.001</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Batch Size</span>
              <span className="text-cyan-400">128</span>
            </div>
          </div>
        </motion.div>

        {/* Anomaly Detection */}
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
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-semibold text-cyan-300">Anomaly Detection</h3>
            </div>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              <Scan className="w-5 h-5 text-cyan-400" />
            </motion.div>
          </div>

          <div className="space-y-4">
            {anomalies.map((anomaly) => (
              <motion.div
                key={anomaly.type}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${anomaly.color.replace('text-', 'bg-')}`} />
                  <span className="text-gray-300 text-sm">{anomaly.type}</span>
                </div>
                <div className="text-right">
                  <div className={anomaly.color}>{anomaly.count}</div>
                  <div className="text-gray-400 text-xs">{anomaly.status}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
          >
            <div className="text-green-400 text-sm text-center">
              ✓ System operating at optimal efficiency
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Data Stream */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/20"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-cyan-300">Live Data Stream</h3>
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity 
            }}
          >
            <Binary className="w-5 h-5 text-cyan-400" />
          </motion.div>
        </div>
        <DataStream />
        <div className="mt-3 text-center text-gray-400 text-sm">
          Processing real-time city data streams
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NeuralNetwork;