import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Server, 
  Shield, 
  Database, 
  Cpu, 
  HardDrive,
  Network,
  Clock,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Power,
  Terminal,
  Key,
  Users,
  BarChart3
} from 'lucide-react';

// System Resource Monitor
const ResourceMonitor: React.FC<{ 
  name: string; 
  usage: number; 
  color: string;
  icon: React.ComponentType<any>;
}> = ({ name, usage, color, icon: Icon }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-gray-400 text-sm">{name}</span>
      </div>
      <span className="text-cyan-400 text-sm">{usage}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${usage}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`h-2 rounded-full ${color.replace('text-', 'bg-')}`}
      />
    </div>
  </div>
);

// Security Status Component
const SecurityStatus: React.FC<{ status: 'secure' | 'warning' | 'critical' }> = ({ status }) => {
  const statusConfig = {
    secure: { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', icon: CheckCircle },
    warning: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: AlertTriangle },
    critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: AlertTriangle }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${config.bg} ${config.border} rounded-lg p-3 border`}
    >
      <div className="flex items-center space-x-2">
        <Icon className={`w-5 h-5 ${config.color}`} />
        <span className={`text-sm font-medium ${config.color}`}>
          {status === 'secure' && 'All Systems Secure'}
          {status === 'warning' && 'Security Warning'}
          {status === 'critical' && 'Critical Alert'}
        </span>
      </div>
    </motion.div>
  );
};

// Live Log Component
const LiveLog: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const logMessages = [
      'System initialized at 08:00:00',
      'Neural network model loaded',
      'Data stream connected - 2.4GB/s',
      'Security scan completed - No threats',
      'Backup created successfully',
      'Performance optimization running',
      'User session started - Admin',
      'API endpoints responding normally'
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < logMessages.length) {
        setLogs(prev => [...prev, logMessages[currentIndex]]);
        currentIndex++;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-32 overflow-y-auto font-mono text-xs space-y-1">
      <AnimatePresence>
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-cyan-400"
          >
            [SYSTEM] {log}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const System: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState({
    cpu: 45,
    memory: 68,
    storage: 72,
    network: 85,
    temperature: 42
  });

  const [securityStatus] = useState<'secure' | 'warning' | 'critical'>('secure');
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    // Simulate system metrics updates
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        cpu: Math.min(100, Math.max(10, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.min(100, Math.max(20, prev.memory + (Math.random() - 0.3) * 5)),
        storage: Math.min(95, Math.max(60, prev.storage + (Math.random() - 0.2) * 2)),
        network: Math.min(100, Math.max(50, prev.network + (Math.random() - 0.4) * 8)),
        temperature: Math.min(80, Math.max(35, prev.temperature + (Math.random() - 0.5) * 3))
      }));

      setUptime(prev => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const systemServices = [
    { name: 'Dashboard API', status: 'operational', response: '28ms', icon: BarChart3 },
    { name: 'Data Stream', status: 'operational', response: '42ms', icon: Database },
    { name: 'Neural Network', status: 'operational', response: '156ms', icon: Cpu },
    { name: 'Security Layer', status: 'operational', response: '15ms', icon: Shield },
    { name: 'User Management', status: 'operational', response: '22ms', icon: Users },
    { name: 'Backup Service', status: 'operational', response: '89ms', icon: HardDrive }
  ];

  const quickActions = [
    { name: 'System Refresh', icon: RefreshCw, color: 'text-blue-400', action: () => console.log('Refresh') },
    { name: 'Run Diagnostics', icon: Activity, color: 'text-green-400', action: () => console.log('Diagnostics') },
    { name: 'Security Scan', icon: Shield, color: 'text-purple-400', action: () => console.log('Security Scan') },
    { name: 'Performance Boost', icon: Zap, color: 'text-yellow-400', action: () => console.log('Performance Boost') }
  ];

  const systemStats = [
    { label: 'Uptime', value: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`, icon: Clock },
    { label: 'Active Users', value: '3', icon: Users },
    { label: 'API Calls', value: '2.4K/min', icon: Network },
    { label: 'Data Processed', value: '1.2TB', icon: Database }
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
              rotate: [0, -5, 0, 5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity 
            }}
          >
            <Settings className="w-8 h-8 text-cyan-400" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-cyan-400">System Control</h1>
            <p className="text-gray-400">Advanced monitoring and administrative controls</p>
          </div>
        </div>
      </motion.div>

      {/* System Stats */}
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        {systemStats.map((stat, _index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border border-cyan-500/20"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-6 h-6 text-cyan-400" />
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
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Resources */}
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
              <Server className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-cyan-300">System Resources</h3>
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
              <Activity className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>

          <div className="space-y-4">
            <ResourceMonitor name="CPU Usage" usage={systemStatus.cpu} color="text-blue-400" icon={Cpu} />
            <ResourceMonitor name="Memory" usage={systemStatus.memory} color="text-purple-400" icon={HardDrive} />
            <ResourceMonitor name="Storage" usage={systemStatus.storage} color="text-yellow-400" icon={Database} />
            <ResourceMonitor name="Network" usage={systemStatus.network} color="text-green-400" icon={Network} />
            <ResourceMonitor name="Temperature" usage={systemStatus.temperature} color="text-red-400" icon={Zap} />
          </div>

          <div className="mt-6 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <div className="text-cyan-400 text-sm text-center">
              System performing within optimal parameters
            </div>
          </div>
        </motion.div>

        {/* Service Status */}
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
              <Activity className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-cyan-300">Service Status</h3>
            </div>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>

          <div className="space-y-3">
            {systemServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  x: 5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-cyan-500/10"
              >
                <div className="flex items-center space-x-3">
                  <service.icon className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-white font-medium text-sm">{service.name}</div>
                    <div className="text-gray-400 text-xs">{service.response} response</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.5 
                    }}
                    className="w-2 h-2 bg-green-400 rounded-full"
                  />
                  <span className="text-green-400 text-sm font-medium">{service.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Dashboard */}
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
              <Shield className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-cyan-300">Security Dashboard</h3>
            </div>
            <Key className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4 mb-6">
            <SecurityStatus status={securityStatus} />
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Firewall', status: 'Active', color: 'text-green-400' },
                { label: 'Encryption', status: 'Enabled', color: 'text-green-400' },
                { label: 'Intrusion Detection', status: 'Monitoring', color: 'text-yellow-400' },
                { label: 'Access Logs', status: 'Recording', color: 'text-green-400' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-gray-700/30 rounded-lg p-2 text-center"
                >
                  <div className="text-white text-xs font-medium">{item.label}</div>
                  <div className={`text-xs ${item.color}`}>{item.status}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-xs text-gray-400">
            <div>Last Security Scan: 2 hours ago</div>
            <div>Threats Detected: 0</div>
            <div>System Updates: Current</div>
          </div>
        </motion.div>

        {/* Quick Actions */}
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
              <h3 className="text-xl font-semibold text-cyan-300">Quick Actions</h3>
            </div>
            <Power className="w-5 h-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, _index) => (
              <motion.button
                key={action.name}
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className="bg-gray-700/50 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-3 transition-colors group"
              >
                <div className="flex flex-col items-center space-y-2">
                  <action.icon className={`w-6 h-6 ${action.color} group-hover:text-cyan-400 transition-colors`} />
                  <span className="text-white text-xs text-center group-hover:text-cyan-300 transition-colors">
                    {action.name}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Logs */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-cyan-300">System Logs</h3>
            <Terminal className="w-5 h-5 text-gray-400" />
          </div>
          <LiveLog />
        </motion.div>

        {/* Quantum Console */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-cyan-300">Quantum Console</h3>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-5 h-5 text-cyan-400" />
            </motion.div>
          </div>
          
          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm space-y-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-green-400"
            >
              $ system status: optimal
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-cyan-400"
            >
              $ neural_network: active [98.7% efficiency]
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-cyan-400"
            >
              $ data_stream: flowing [2.4GB/s throughput]
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-yellow-400"
            >
              $ security: all_systems_secure
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="text-gray-500"
            >
              $ _
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Add AnimatePresence import at the top
import { AnimatePresence } from 'framer-motion';

export default System;