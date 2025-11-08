import React, { useState, useMemo } from 'react';
import { ChevronRight, Shield, Award, FileText, AlertTriangle, TrendingUp, 
         CheckCircle, Clock, XCircle, Menu, X, Database, Users, ShoppingCart,
         Settings, Eye, Bell, BarChart3, Link2, Package, Search, Filter,
         Download, Upload, Plus, Edit, Trash2, Home, MapPin, Calendar,
         DollarSign, Layers, Activity, Droplet, Factory, Zap, Wind } from 'lucide-react';

// ==================== MOCKUP DATA - CCS FOCUSED ====================

const mockProjects = [
  {
    id: 'CCS-LNG-2025-001',
    name: 'LNG Terminal Post-Combustion CO2 Capture - Qatar',
    pathway: 'CCS - LNG',
    ccsStage: 'Full Lifecycle',
    country: 'Qatar',
    coordinates: '25.3548, 51.1839',
    vintage: '2024-2025',
    status: 'MRV Ready',
    methodology: 'ISO 27914 + Article 6.4',
    registry: 'UNFCCC A6.4',
    baselineTco2e: 0,
    capturedTco2e: 500000,
    storedTco2e: 485000,
    issuableTco2e: 485000,
    uncertainty: 8,
    integrityScore: 0.96,
    permanenceScore: 0.94,
    requiredBuffer: 5,
    minInsurance: 'Enhanced',
    disclosures: ['ICVCM CCP', 'ISO 27914', 'Article 6 LoA', 'CORSIA'],
    verifierArtifact: 'VerifierReport_DNV_CCS_2025.pdf',
    lastUpdated: '2025-10-28',
    ccsLifecycle: {
      capture: {
        efficiency: 92.5,
        energyIntensity: 2.1,
        captureUnit: 'Amine-based post-combustion',
        captureRate: 500000,
        deviceIds: ['CAP-001', 'CAP-002', 'CAP-003']
      },
      transport: {
        method: 'Pipeline',
        distance: 85,
        leakRate: 0.001,
        pressureMaintained: true,
        deviceIds: ['PIPE-001', 'PIPE-002']
      },
      injection: {
        reservoir: 'Saline Aquifer - Lower Fars Formation',
        depth: 2400,
        injectionRate: 1370,
        wellCount: 3,
        deviceIds: ['INJ-001', 'INJ-002', 'INJ-003']
      },
      storage: {
        formation: 'Saline Aquifer',
        capacity: 50000000,
        permanenceRisk: 'Low',
        monitoringFrequency: 'Continuous',
        seismicMonitoring: true,
        insarMonitoring: true,
        deviceIds: ['MON-001', 'MON-002', 'MON-003', 'SEIS-001']
      }
    },
    aiExtraction: {
      methodologyVersion: 'ISO 27914:2017 + ISO 27916:2019',
      monitoringPeriod: '2024-01-01 to 2024-12-31',
      captureEfficiencyModel: 'ML-Regression v2.3',
      leakageDetectionModel: 'Bayesian-Fault v1.8',
      plumeModelVersion: 'Geospatial-ML v3.1',
      documentHash: 'sha256:a3f5b8c9d2e1f4g7...',
      qldbRef: 'arn:aws:qldb:us-east-1:123456789012:ledger/acip-ccs/block/5j8k2m'
    }
  },
  {
    id: 'CCS-LNG-2025-002',
    name: 'LNG Processing CO2 Capture & Storage - Australia',
    pathway: 'CCS - LNG',
    ccsStage: 'Full Lifecycle',
    country: 'Australia',
    coordinates: '-20.7256, 116.8480',
    vintage: '2024-2025',
    status: 'Under TIC',
    methodology: 'ISO 27914 + Article 6.4',
    registry: 'UNFCCC A6.4',
    baselineTco2e: 0,
    capturedTco2e: 800000,
    storedTco2e: 776000,
    issuableTco2e: 776000,
    uncertainty: 10,
    integrityScore: 0.93,
    permanenceScore: 0.92,
    requiredBuffer: 6,
    minInsurance: 'Enhanced',
    disclosures: ['ICVCM CCP', 'ISO 27914', 'Article 6 LoA'],
    verifierArtifact: 'VerifierReport_SGS_CCS_2025.pdf',
    lastUpdated: '2025-10-25',
    ccsLifecycle: {
      capture: {
        efficiency: 94.0,
        energyIntensity: 1.9,
        captureUnit: 'Pre-combustion + Membrane separation',
        captureRate: 800000,
        deviceIds: ['CAP-A01', 'CAP-A02', 'CAP-A03', 'CAP-A04']
      },
      transport: {
        method: 'Pipeline + Ship',
        distance: 120,
        leakRate: 0.0008,
        pressureMaintained: true,
        deviceIds: ['PIPE-A01', 'SHIP-A01']
      },
      injection: {
        reservoir: 'Depleted Gas Field - Gorgon',
        depth: 2300,
        injectionRate: 2192,
        wellCount: 5,
        deviceIds: ['INJ-A01', 'INJ-A02', 'INJ-A03', 'INJ-A04', 'INJ-A05']
      },
      storage: {
        formation: 'Depleted Gas Reservoir',
        capacity: 120000000,
        permanenceRisk: 'Very Low',
        monitoringFrequency: 'Continuous',
        seismicMonitoring: true,
        insarMonitoring: true,
        deviceIds: ['MON-A01', 'MON-A02', 'SEIS-A01', 'SEIS-A02']
      }
    },
    aiExtraction: {
      methodologyVersion: 'ISO 27914:2017 + ISO 27916:2019',
      monitoringPeriod: '2024-01-01 to 2024-12-31',
      captureEfficiencyModel: 'ML-Regression v2.3',
      leakageDetectionModel: 'Bayesian-Fault v1.8',
      plumeModelVersion: 'Geospatial-ML v3.1',
      documentHash: 'sha256:b4g6c9e3f2h1k5j8...',
      qldbRef: 'arn:aws:qldb:us-east-1:123456789012:ledger/acip-ccs/block/6k9l3n'
    }
  },
  {
    id: 'CCS-PWR-2025-003',
    name: 'Power Plant CO2 Capture & Geological Storage - USA',
    pathway: 'CCS - Power',
    ccsStage: 'Full Lifecycle',
    country: 'USA',
    coordinates: '29.7604, -95.3698',
    vintage: '2023-2024',
    status: 'Approved',
    methodology: 'ISO 27914 + EPA Class VI',
    registry: 'UNFCCC A6.4',
    baselineTco2e: 0,
    capturedTco2e: 1200000,
    storedTco2e: 1164000,
    issuableTco2e: 1164000,
    uncertainty: 7,
    integrityScore: 0.95,
    permanenceScore: 0.96,
    requiredBuffer: 4,
    minInsurance: 'Enhanced',
    disclosures: ['ICVCM CCP', 'ISO 27914', 'Article 6 LoA', 'CORSIA', '45Q Tax Credit'],
    verifierArtifact: 'VerifierReport_TUV_CCS_2024.pdf',
    lastUpdated: '2025-09-15',
    ccsLifecycle: {
      capture: {
        efficiency: 95.5,
        energyIntensity: 1.7,
        captureUnit: 'Advanced amine with heat recovery',
        captureRate: 1200000,
        deviceIds: ['CAP-TX01', 'CAP-TX02', 'CAP-TX03', 'CAP-TX04', 'CAP-TX05']
      },
      transport: {
        method: 'Pipeline',
        distance: 65,
        leakRate: 0.0005,
        pressureMaintained: true,
        deviceIds: ['PIPE-TX01', 'PIPE-TX02']
      },
      injection: {
        reservoir: 'Saline Aquifer - Frio Formation',
        depth: 1800,
        injectionRate: 3288,
        wellCount: 4,
        deviceIds: ['INJ-TX01', 'INJ-TX02', 'INJ-TX03', 'INJ-TX04']
      },
      storage: {
        formation: 'Saline Aquifer',
        capacity: 80000000,
        permanenceRisk: 'Very Low',
        monitoringFrequency: 'Continuous',
        seismicMonitoring: true,
        insarMonitoring: true,
        deviceIds: ['MON-TX01', 'MON-TX02', 'MON-TX03', 'SEIS-TX01']
      }
    },
    aiExtraction: {
      methodologyVersion: 'ISO 27914:2017 + EPA UIC Class VI',
      monitoringPeriod: '2023-01-01 to 2023-12-31',
      captureEfficiencyModel: 'ML-Regression v2.3',
      leakageDetectionModel: 'Bayesian-Fault v1.8',
      plumeModelVersion: 'Geospatial-ML v3.1',
      documentHash: 'sha256:c5h7d0f4g3i2m6n9...',
      qldbRef: 'arn:aws:qldb:us-east-1:123456789012:ledger/acip-ccs/block/7l0m4o'
    }
  },
  {
    id: 'CCS-LNG-2025-004',
    name: 'Offshore LNG CO2 Capture & Sub-seabed Storage - Norway',
    pathway: 'CCS - LNG',
    ccsStage: 'Capture + Transport',
    country: 'Norway',
    coordinates: '58.9700, 5.7331',
    vintage: '2024-2025',
    status: 'Draft',
    methodology: 'ISO 27914 + Article 6.4',
    registry: 'UNFCCC A6.4',
    baselineTco2e: 0,
    capturedTco2e: 350000,
    storedTco2e: 0,
    issuableTco2e: 0,
    uncertainty: 9,
    integrityScore: 0.90,
    permanenceScore: 0.88,
    requiredBuffer: 7,
    minInsurance: 'Enhanced',
    disclosures: ['ICVCM CCP', 'ISO 27914', 'Northern Lights Project'],
    verifierArtifact: 'VerifierReport_Bureau_Veritas_CCS_2025.pdf',
    lastUpdated: '2025-11-01',
    ccsLifecycle: {
      capture: {
        efficiency: 90.0,
        energyIntensity: 2.3,
        captureUnit: 'Offshore platform amine scrubbing',
        captureRate: 350000,
        deviceIds: ['CAP-NO01', 'CAP-NO02']
      },
      transport: {
        method: 'Ship (liquid CO2)',
        distance: 250,
        leakRate: 0.002,
        pressureMaintained: true,
        deviceIds: ['SHIP-NO01']
      },
      injection: {
        reservoir: 'Sub-seabed Saline Aquifer - Planned',
        depth: 0,
        injectionRate: 0,
        wellCount: 0,
        deviceIds: []
      },
      storage: {
        formation: 'Sub-seabed Saline Formation',
        capacity: 25000000,
        permanenceRisk: 'Low',
        monitoringFrequency: 'Planned',
        seismicMonitoring: false,
        insarMonitoring: false,
        deviceIds: []
      }
    },
    aiExtraction: {
      methodologyVersion: 'ISO 27914:2017 + Northern Lights Protocol',
      monitoringPeriod: '2024-06-01 to 2024-12-31',
      captureEfficiencyModel: 'ML-Regression v2.3',
      leakageDetectionModel: 'Bayesian-Fault v1.8',
      plumeModelVersion: 'Geospatial-ML v3.1',
      documentHash: 'sha256:d6i8e1g5h4j3p7q0...',
      qldbRef: 'arn:aws:qldb:us-east-1:123456789012:ledger/acip-ccs/block/8m1n5p'
    }
  }
];

const mockTokens = [
  {
    id: 2001,
    projectId: 'CCS-LNG-2025-001',
    tokenType: 'CIT-CCS',
    trancheA: {
      qty: 242500,
      attributes: ['ICVCM CCP', 'Article 6 CA', 'CORSIA', 'ISO 27914'],
      price: 85.00,
      available: 150000
    },
    trancheB: {
      qty: 242500,
      attributes: ['ICVCM CCP', 'Article 6', 'ISO 27914'],
      price: 75.00,
      available: 242500
    },
    insurancePolicy: 'LOYD-CCS-12345',
    rating: 'A',
    lastRatingDate: '2025-10-15',
    status: 'Listed',
    bufferRequired: 5,
    bufferActual: 6.2,
    geostorageMetadata: {
      formation: 'Saline Aquifer - Lower Fars',
      depth: 2400,
      permanenceScore: 0.94,
      monitoringStatus: 'Active'
    }
  },
  {
    id: 2002,
    projectId: 'CCS-PWR-2025-003',
    tokenType: 'CIT-CCS',
    trancheA: {
      qty: 1164000,
      attributes: ['ICVCM CCP', 'Article 6', 'CORSIA', 'ISO 27914', '45Q'],
      price: 90.00,
      available: 1164000
    },
    insurancePolicy: 'LOYD-CCS-12347',
    rating: 'A+',
    lastRatingDate: '2025-09-20',
    status: 'Listed',
    bufferRequired: 4,
    bufferActual: 4.5,
    geostorageMetadata: {
      formation: 'Saline Aquifer - Frio',
      depth: 1800,
      permanenceScore: 0.96,
      monitoringStatus: 'Active'
    }
  },
  {
    id: 2003,
    projectId: 'CCS-LNG-2025-002',
    tokenType: 'CIT-CCS',
    trancheA: {
      qty: 776000,
      attributes: ['ICVCM CCP', 'ISO 27914'],
      price: 80.00,
      available: 0
    },
    insurancePolicy: null,
    rating: 'A-',
    lastRatingDate: '2025-10-28',
    status: 'Minted',
    bufferRequired: 6,
    bufferActual: 7.1,
    geostorageMetadata: {
      formation: 'Depleted Gas Field - Gorgon',
      depth: 2300,
      permanenceScore: 0.92,
      monitoringStatus: 'Active'
    }
  }
];

const mockIssuances = [
  {
    id: 'SUBM-CCS-123',
    projectId: 'CCS-LNG-2025-001',
    mrvPacket: 485000,
    captureVerified: 500000,
    storageVerified: 485000,
    bufferToVault: 24250,
    insuranceTier: 'Enhanced',
    article6: 'Authorized + CA',
    status: 'TIC Approved',
    submittedDate: '2025-10-15',
    approvedDate: '2025-10-25'
  },
  {
    id: 'SUBM-CCS-124',
    projectId: 'CCS-LNG-2025-002',
    mrvPacket: 776000,
    captureVerified: 800000,
    storageVerified: 776000,
    bufferToVault: 46560,
    insuranceTier: 'Enhanced',
    article6: 'Pending',
    status: 'Pending TIC',
    submittedDate: '2025-10-20',
    approvedDate: null
  }
];

const mockAlerts = [
  {
    id: 1,
    type: 'seismic_anomaly',
    severity: 'high',
    message: 'Seismic monitoring detected minor anomaly near CCS-LNG-2025-002 storage site',
    action: 'Bayesian leak model triggered additional monitoring',
    timestamp: '2025-11-02 14:30',
    resolved: false
  },
  {
    id: 2,
    type: 'article6_status',
    severity: 'medium',
    message: 'Article 6 LoA status changed for project CCS-PWR-2025-003',
    action: 'Review Article 6 tab',
    timestamp: '2025-11-01 09:15',
    resolved: false
  },
  {
    id: 3,
    type: 'methodology_update',
    severity: 'low',
    message: 'ISO 27914:2017 updated to ISO 27914:2024',
    action: 'Review methodology compliance for active projects',
    timestamp: '2025-10-30 16:45',
    resolved: true
  },
  {
    id: 4,
    type: 'plume_migration',
    severity: 'medium',
    message: 'Plume migration model update for CCS-LNG-2025-001',
    action: 'ML model v3.2 deployed, permanence score adjusted',
    timestamp: '2025-10-29 11:20',
    resolved: true
  }
];

const mockActivity = [
  { id: 1, user: 'Dr. Sarah Chen', action: 'uploaded Seismic Survey Report to CCS-LNG-2025-001', timestamp: '2 hours ago' },
  { id: 2, user: 'TIC Committee', action: 'approved Issuance SUBM-CCS-123', timestamp: '5 hours ago' },
  { id: 3, user: 'Insurance Bot', action: 'bound parametric policy on Token 2001 (Enhanced)', timestamp: '1 day ago' },
  { id: 4, user: 'Marcus Williams', action: 'listed Token 2001 on marketplace', timestamp: '1 day ago' },
  { id: 5, user: 'Plume Monitor AI', action: 'updated permanence score for CCS-LNG-2025-001', timestamp: '2 days ago' }
];

// ==================== COMPONENTS ====================

const Sidebar = ({ currentPage, setCurrentPage, collapsed, setCollapsed, userRole }) => {
  const menuItems = [
    { id: 'home', label: 'Home / Overview', icon: Home, roles: ['all'] },
    { id: 'projects', label: 'CCS Projects & MRV', icon: Factory, roles: ['originator', 'admin'] },
    { id: 'issuance', label: 'Issuance & Tokens', icon: Package, roles: ['originator', 'admin'] },
    { id: 'governance', label: 'Governance (TIC)', icon: Users, roles: ['tic', 'admin'] },
    { id: 'insurance', label: 'Insurance & Risk', icon: Shield, roles: ['insurer', 'admin'] },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, roles: ['buyer', 'originator', 'admin'] },
    { id: 'monitoring', label: 'Monitoring & Alerts', icon: Bell, roles: ['all'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['all'] }
  ];

  const filteredItems = menuItems.filter(item => 
    item.roles.includes('all') || item.roles.includes(userRole)
  );

  return (
    <div className={`${collapsed ? 'w-16' : 'w-60'} bg-slate-900 text-white transition-all duration-300 flex flex-col h-screen fixed left-0 top-0 z-50`}>
      <div className="p-4 flex items-center justify-between border-b border-slate-700">
        {!collapsed && (
          <div>
            <h1 className="text-lg font-bold text-teal-400">AlphaCarbon</h1>
            <p className="text-xs text-slate-400">CCS Integrity Platform</p>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1 hover:bg-slate-800 rounded">
          {collapsed ? <ChevronRight size={20} /> : <X size={20} />}
        </button>
      </div>
      <nav className="flex-1 p-2 overflow-y-auto">
        {filteredItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg mb-1 transition-colors ${
              currentPage === item.id ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <item.icon size={20} />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>
      {!collapsed && (
        <div className="p-4 border-t border-slate-700 text-xs text-slate-400">
          <p className="font-semibold text-teal-400 mb-1">Mission</p>
          <p className="leading-relaxed">AI-verified CCS infrastructure for CO2 capture, storage, and permanence verification</p>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color = 'teal', subtitle }) => {
  const colorClasses = {
    teal: 'bg-teal-50 text-teal-700',
    orange: 'bg-orange-50 text-orange-700',
    green: 'bg-green-50 text-green-700',
    blue: 'bg-blue-50 text-blue-700',
    purple: 'bg-purple-50 text-purple-700'
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <p className="text-slate-600 text-sm">{label}</p>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const statusConfig = {
    'Draft': { color: 'bg-slate-100 text-slate-700', icon: Edit },
    'Ingestion': { color: 'bg-blue-100 text-blue-700', icon: Upload },
    'MRV Ready': { color: 'bg-orange-100 text-orange-700', icon: Clock },
    'Under TIC': { color: 'bg-purple-100 text-purple-700', icon: Users },
    'Approved': { color: 'bg-green-100 text-green-700', icon: CheckCircle },
    'Rejected': { color: 'bg-red-100 text-red-700', icon: XCircle },
    'Pending TIC': { color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    'TIC Approved': { color: 'bg-green-100 text-green-700', icon: CheckCircle },
    'Minted': { color: 'bg-teal-100 text-teal-700', icon: Package },
    'Listed': { color: 'bg-blue-100 text-blue-700', icon: ShoppingCart },
    'Capture + Transport': { color: 'bg-orange-100 text-orange-700', icon: Factory },
    'Full Lifecycle': { color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle }
  };

  const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-700', icon: Clock };
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <Icon size={12} />
      {status}
    </span>
  );
};

const AttributeBadge = ({ label }) => {
  const config = {
    'ICVCM CCP': { color: 'bg-emerald-100 text-emerald-700', icon: Award },
    'Article 6': { color: 'bg-blue-100 text-blue-700', icon: Link2 },
    'Article 6 CA': { color: 'bg-indigo-100 text-indigo-700', icon: Link2 },
    'CORSIA': { color: 'bg-purple-100 text-purple-700', icon: Award },
    'Insured': { color: 'bg-orange-100 text-orange-700', icon: Shield },
    'ISO 27914': { color: 'bg-cyan-100 text-cyan-700', icon: FileText },
    '45Q': { color: 'bg-green-100 text-green-700', icon: DollarSign }
  };

  const style = config[label] || { color: 'bg-gray-100 text-gray-700', icon: Award };
  const Icon = style.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${style.color}`}>
      <Icon size={10} />
      {label}
    </span>
  );
};

// ==================== CCS LIFECYCLE VISUALIZATION ====================

const CCSLifecycleCard = ({ project }) => {
  const stages = [
    { 
      name: 'Capture', 
      icon: Factory, 
      color: 'teal',
      data: project.ccsLifecycle.capture,
      metrics: [
        { label: 'Efficiency', value: `${project.ccsLifecycle.capture.efficiency}%` },
        { label: 'Captured', value: `${(project.ccsLifecycle.capture.captureRate / 1000).toFixed(0)}k tCO2` },
        { label: 'Energy', value: `${project.ccsLifecycle.capture.energyIntensity} MWh/t` }
      ]
    },
    { 
      name: 'Transport', 
      icon: Wind, 
      color: 'blue',
      data: project.ccsLifecycle.transport,
      metrics: [
        { label: 'Method', value: project.ccsLifecycle.transport.method },
        { label: 'Distance', value: `${project.ccsLifecycle.transport.distance} km` },
        { label: 'Leak Rate', value: `${(project.ccsLifecycle.transport.leakRate * 100).toFixed(3)}%` }
      ]
    },
    { 
      name: 'Injection', 
      icon: Droplet, 
      color: 'orange',
      data: project.ccsLifecycle.injection,
      metrics: [
        { label: 'Depth', value: `${project.ccsLifecycle.injection.depth}m` },
        { label: 'Rate', value: `${project.ccsLifecycle.injection.injectionRate} t/day` },
        { label: 'Wells', value: project.ccsLifecycle.injection.wellCount }
      ]
    },
    { 
      name: 'Storage', 
      icon: Database, 
      color: 'green',
      data: project.ccsLifecycle.storage,
      metrics: [
        { label: 'Formation', value: project.ccsLifecycle.storage.formation.split('-')[0].trim() },
        { label: 'Risk', value: project.ccsLifecycle.storage.permanenceRisk },
        { label: 'Monitoring', value: project.ccsLifecycle.storage.monitoringFrequency }
      ]
    }
  ];

  const colorClasses = {
    teal: 'bg-teal-50 border-teal-200 text-teal-900',
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    orange: 'bg-orange-50 border-orange-200 text-orange-900',
    green: 'bg-green-50 border-green-200 text-green-900'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Layers size={20} />
        CCS Lifecycle Status
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const active = stage.data.deviceIds?.length > 0;
          return (
            <div key={idx} className={`${colorClasses[stage.color]} border-2 rounded-lg p-4 ${!active && 'opacity-50'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Icon size={20} />
                <p className="font-bold">{stage.name}</p>
              </div>
              <div className="space-y-2">
                {stage.metrics.map((metric, i) => (
                  <div key={i}>
                    <p className="text-xs opacity-75">{metric.label}</p>
                    <p className="text-sm font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
              {active && (
                <div className="mt-3 pt-3 border-t border-current/20">
                  <p className="text-xs opacity-75">Devices: {stage.data.deviceIds.length}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==================== PAGES ====================

const HomePage = () => {
  const totalCaptured = mockProjects.reduce((sum, p) => sum + p.capturedTco2e, 0);
  const totalStored = mockProjects.reduce((sum, p) => sum + p.storedTco2e, 0);
  const avgPermanence = (mockProjects.reduce((sum, p) => sum + (p.permanenceScore || 0), 0) / mockProjects.length * 100).toFixed(1);
  const article6Ready = mockProjects.filter(p => p.disclosures.includes('Article 6 LoA')).length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">CCS Integrity Platform</h1>
        <p className="text-teal-100">AI-verified infrastructure for CO2 capture, storage, and permanence verification</p>
      </div>
      
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          label="Total CO2 Captured" 
          value={`${(totalCaptured / 1000000).toFixed(2)}M t`} 
          subtitle="Across all CCS projects"
          icon={Factory} 
          color="teal" 
        />
        <StatCard 
          label="Total CO2 Stored" 
          value={`${(totalStored / 1000000).toFixed(2)}M t`} 
          subtitle="Verified geological storage"
          icon={Database} 
          color="green" 
        />
        <StatCard 
          label="Avg Permanence (P90)" 
          value={`${avgPermanence}%`} 
          subtitle="Storage permanence confidence"
          icon={Shield} 
          color="purple" 
        />
        <StatCard 
          label="Article 6 Ready" 
          value={article6Ready} 
          subtitle="UNFCCC authorized projects"
          icon={Link2} 
          color="blue" 
        />
      </div>

      {/* Pipeline Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">CCS Pipeline Status</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          <div className="min-w-[200px] bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Upload size={16} className="text-orange-600" />
              <p className="font-semibold text-orange-900">MRV Stage</p>
            </div>
            <p className="text-3xl font-bold text-orange-700 mb-1">
              {mockProjects.filter(p => p.status === 'MRV Ready').length}
            </p>
            <p className="text-sm text-orange-600">Projects in verification</p>
          </div>
          <div className="min-w-[200px] bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-purple-600" />
              <p className="font-semibold text-purple-900">TIC Review</p>
            </div>
            <p className="text-3xl font-bold text-purple-700 mb-1">
              {mockProjects.filter(p => p.status === 'Under TIC').length}
            </p>
            <p className="text-sm text-purple-600">Awaiting approval</p>
          </div>
          <div className="min-w-[200px] bg-teal-50 border-2 border-teal-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Package size={16} className="text-teal-600" />
              <p className="font-semibold text-teal-900">Minted</p>
            </div>
            <p className="text-3xl font-bold text-teal-700 mb-1">
              {mockTokens.filter(t => t.status === 'Minted').length}
            </p>
            <p className="text-sm text-teal-600">CIT-CCS tokens created</p>
          </div>
          <div className="min-w-[200px] bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart size={16} className="text-blue-600" />
              <p className="font-semibold text-blue-900">Listed</p>
            </div>
            <p className="text-3xl font-bold text-blue-700 mb-1">
              {mockTokens.filter(t => t.status === 'Listed').length}
            </p>
            <p className="text-sm text-blue-600">Available on marketplace</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Watch */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-orange-600" />
            CCS Risk Watch
          </h2>
          <div className="space-y-3">
            {mockAlerts.filter(a => !a.resolved).map(alert => {
              const severityConfig = {
                high: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900' },
                medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-900' }
              };
              const config = severityConfig[alert.severity];
              return (
                <div key={alert.id} className={`${config.bg} border ${config.border} rounded-lg p-4`}>
                  <p className={`text-sm font-medium ${config.text} mb-1`}>{alert.type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</p>
                  <p className={`text-sm ${config.text}`}>{alert.message}</p>
                  <p className={`text-xs opacity-75 ${config.text} mt-2`}>→ {alert.action}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Activity size={20} className="text-teal-600" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {mockActivity.map(activity => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = mockProjects.filter(p => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">CCS Projects & MRV</h1>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700">
          <Plus size={16} />
          New CCS Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search CCS projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-xs ${filter === 'all' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-600'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('MRV Ready')}
                className={`px-3 py-1 rounded-full text-xs ${filter === 'MRV Ready' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}
              >
                MRV Ready
              </button>
              <button
                onClick={() => setFilter('Under TIC')}
                className={`px-3 py-1 rounded-full text-xs ${filter === 'Under TIC' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}
              >
                Under TIC
              </button>
            </div>
          </div>
          <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`p-4 cursor-pointer hover:bg-slate-50 ${selectedProject.id === project.id ? 'bg-teal-50 border-l-4 border-teal-600' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{project.id}</p>
                    <p className="text-xs text-slate-600 mt-1">{project.pathway}</p>
                  </div>
                  <StatusBadge status={project.ccsStage} />
                </div>
                <p className="text-sm text-slate-700 mb-2">{project.name}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin size={12} />
                  {project.country}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Inspector */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedProject.name}</h2>
                <p className="text-slate-600 mt-1">{selectedProject.id}</p>
              </div>
              <StatusBadge status={selectedProject.status} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Country</p>
                <p className="font-medium text-slate-900">{selectedProject.country}</p>
              </div>
              <div>
                <p className="text-slate-600">Vintage</p>
                <p className="font-medium text-slate-900">{selectedProject.vintage}</p>
              </div>
              <div>
                <p className="text-slate-600">Methodology</p>
                <p className="font-medium text-slate-900">{selectedProject.methodology}</p>
              </div>
              <div>
                <p className="text-slate-600">Registry</p>
                <p className="font-medium text-slate-900">{selectedProject.registry}</p>
              </div>
            </div>
          </div>

          {/* CCS Lifecycle Visualization */}
          <CCSLifecycleCard project={selectedProject} />

          {/* MRV Results */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">MRV Results - CCS Verification</h3>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-slate-600 text-sm mb-2">CO2 Captured</p>
                <p className="text-3xl font-bold text-teal-600">{(selectedProject.capturedTco2e / 1000).toFixed(0)}k</p>
                <p className="text-xs text-slate-500">tCO2e</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm mb-2">CO2 Stored</p>
                <p className="text-3xl font-bold text-emerald-600">{(selectedProject.storedTco2e / 1000).toFixed(0)}k</p>
                <p className="text-xs text-slate-500">tCO2e</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm mb-2">Integrity Score</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-cyan-600">{selectedProject.integrityScore}</p>
                  <div className="w-12 h-12 relative">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="4" fill="none" />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#06b6d4"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${selectedProject.integrityScore * 125.6} 125.6`}
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-slate-600 text-sm mb-2">Permanence (P90)</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-purple-600">{selectedProject.permanenceScore}</p>
                  <div className="w-12 h-12 relative">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle cx="24" cy="24" r="20" stroke="#e2e8f0" strokeWidth="4" fill="none" />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#9333ea"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray={`${selectedProject.permanenceScore * 125.6} 125.6`}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Uncertainty (P50)</p>
                  <p className="text-2xl font-bold text-slate-900">{selectedProject.uncertainty}%</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 mb-1">Required Buffer</p>
                  <p className="text-2xl font-bold text-slate-900">{selectedProject.requiredBuffer}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Extraction */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Database size={20} />
              AI/ML Model Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Methodology Version</span>
                <span className="font-medium text-slate-900">{selectedProject.aiExtraction.methodologyVersion}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Monitoring Period</span>
                <span className="font-medium text-slate-900">{selectedProject.aiExtraction.monitoringPeriod}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Capture Efficiency Model</span>
                <span className="font-medium text-slate-900">{selectedProject.aiExtraction.captureEfficiencyModel}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Leakage Detection Model</span>
                <span className="font-medium text-slate-900">{selectedProject.aiExtraction.leakageDetectionModel}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Plume Migration Model</span>
                <span className="font-medium text-slate-900">{selectedProject.aiExtraction.plumeModelVersion}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Document Hash</span>
                <span className="font-mono text-xs text-slate-900">{selectedProject.aiExtraction.documentHash}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">QLDB Reference</span>
                <span className="font-mono text-xs text-slate-900 break-all">{selectedProject.aiExtraction.qldbRef}</span>
              </div>
            </div>
          </div>

          {/* Controls & Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Controls & Requirements</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Shield size={16} className="text-orange-600" />
                <span className="text-sm text-slate-700">Min Insurance: <strong>{selectedProject.minInsurance}</strong> (Parametric triggers)</span>
              </div>
              <div className="flex items-center gap-3">
                <Award size={16} className="text-emerald-600" />
                <span className="text-sm text-slate-700">Disclosures: <strong>{selectedProject.disclosures.join(', ')}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-blue-600" />
                <span className="text-sm text-slate-700">Verifier: <strong>{selectedProject.verifierArtifact}</strong></span>
              </div>
            </div>
            {selectedProject.status === 'MRV Ready' && (
              <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700">
                Submit for Issuance (→ TIC)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const IssuancePage = () => {
  const [selectedIssuance, setSelectedIssuance] = useState(mockIssuances[0]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Issuance & CIT-CCS Tokens</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issuance List */}
        <div className="space-y-4">
          {mockIssuances.map(issuance => (
            <div
              key={issuance.id}
              onClick={() => setSelectedIssuance(issuance)}
              className={`bg-white rounded-lg shadow-sm border p-6 cursor-pointer hover:shadow-md transition-shadow ${
                selectedIssuance.id === issuance.id ? 'border-teal-500 border-2' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-600">Issuance ID</p>
                  <p className="text-xl font-bold text-slate-900">{issuance.id}</p>
                </div>
                <StatusBadge status={issuance.status} />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Project</p>
                  <p className="font-medium text-slate-900">{issuance.projectId}</p>
                </div>
                <div>
                  <p className="text-slate-600">Captured (verified)</p>
                  <p className="font-medium text-slate-900">{issuance.captureVerified.toLocaleString()} tCO2</p>
                </div>
                <div>
                  <p className="text-slate-600">Stored (verified)</p>
                  <p className="font-medium text-emerald-600 font-bold">{issuance.storageVerified.toLocaleString()} tCO2</p>
                </div>
                <div>
                  <p className="text-slate-600">Buffer to Vault</p>
                  <p className="font-medium text-slate-900">{issuance.bufferToVault.toLocaleString()} tCO2</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tokenization Preview */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">CIT-CCS Tokenization Preview</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-emerald-900">Tranche A - Premium</p>
                  <p className="text-2xl font-bold text-emerald-700">{(selectedIssuance.storageVerified / 2).toLocaleString()} t</p>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  <AttributeBadge label="ICVCM CCP" />
                  <AttributeBadge label="Article 6 CA" />
                  <AttributeBadge label="CORSIA" />
                  <AttributeBadge label="ISO 27914" />
                </div>
                <p className="text-xs text-emerald-700">Highest-quality CCS removal credits with full compliance</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-blue-900">Tranche B - Standard</p>
                  <p className="text-2xl font-bold text-blue-700">{(selectedIssuance.storageVerified / 2).toLocaleString()} t</p>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  <AttributeBadge label="ICVCM CCP" />
                  <AttributeBadge label="Article 6" />
                  <AttributeBadge label="ISO 27914" />
                </div>
                <p className="text-xs text-blue-700">High-integrity CCS credits with Article 6 authorization</p>
              </div>
            </div>
          </div>

          {/* Metadata Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">IPFS Metadata Preview (CIT-CCS)</h3>
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
              <pre>{JSON.stringify({
                token_type: "CIT-CCS",
                project_id: selectedIssuance.projectId,
                methodology: "ISO 27914:2017 + ISO 27916:2019",
                verifier: "DNV",
                co2_captured: selectedIssuance.captureVerified,
                co2_stored: selectedIssuance.storageVerified,
                buffer_reserved: selectedIssuance.bufferToVault,
                insurance_tier: selectedIssuance.insuranceTier,
                article6_status: selectedIssuance.article6,
                integrity_score: 0.96,
                permanence_score: 0.94,
                geostorage: {
                  formation: "Saline Aquifer - Lower Fars",
                  depth_meters: 2400,
                  monitoring: "Continuous + Seismic + InSAR"
                },
                attributes: ["ICVCM CCP", "Article 6", "CORSIA", "ISO 27914"],
                timestamp: "2025-10-25T14:30:00Z"
              }, null, 2)}</pre>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Actions</h3>
            <div className="space-y-3">
              {selectedIssuance.status === 'Pending TIC' && (
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700">
                  Send to TIC Review
                </button>
              )}
              {selectedIssuance.status === 'TIC Approved' && (
                <>
                  <button className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700">
                    Mint CIT-CCS on Chain
                  </button>
                  <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700">
                    Mint & Bind Parametric Insurance
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GovernancePage = () => {
  const [selectedReview, setSelectedReview] = useState(mockIssuances[1]);
  const [checks, setChecks] = useState({
    ccp: false,
    iso27914: false,
    article6: false,
    permanence: false,
    monitoring: false
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Governance (TIC) - CCS Review</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Work Queue */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-900">CCS Review Queue</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {mockIssuances.filter(i => i.status === 'Pending TIC').map(issuance => (
              <div
                key={issuance.id}
                onClick={() => setSelectedReview(issuance)}
                className={`p-4 cursor-pointer hover:bg-slate-50 ${selectedReview.id === issuance.id ? 'bg-purple-50 border-l-4 border-purple-600' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{issuance.id}</p>
                    <p className="text-xs text-slate-600 mt-1">{issuance.projectId}</p>
                  </div>
                  <Clock size={16} className="text-orange-600" />
                </div>
                <p className="text-xs text-slate-600">Submitted: {issuance.submittedDate}</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">{issuance.storageVerified.toLocaleString()} tCO2 stored</p>
              </div>
            ))}
          </div>
        </div>

        {/* Review Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Review: {selectedReview.id}</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-slate-600">Project ID</p>
                <p className="font-medium text-slate-900">{selectedReview.projectId}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">CO2 Stored (verified)</p>
                <p className="font-medium text-emerald-600 text-lg">{selectedReview.storageVerified.toLocaleString()} tCO2</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Insurance Tier</p>
                <p className="font-medium text-slate-900">{selectedReview.insuranceTier}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Article 6 Status</p>
                <p className="font-medium text-slate-900">{selectedReview.article6}</p>
              </div>
            </div>
          </div>

          {/* CCS-Specific Checklist */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">CCS Review Checklist</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checks.ccp}
                  onChange={(e) => setChecks({...checks, ccp: e.target.checked})}
                  className="w-5 h-5 text-teal-600"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">ICVCM CCP Core Checks</p>
                  <p className="text-xs text-slate-600">Additionality, permanence, robust quantification verified</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checks.iso27914}
                  onChange={(e) => setChecks({...checks, iso27914: e.target.checked})}
                  className="w-5 h-5 text-teal-600"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">ISO 27914 & ISO 27916 Compliance</p>
                  <p className="text-xs text-slate-600">CCS lifecycle methodology and MRV standards verified</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checks.article6}
                  onChange={(e) => setChecks({...checks, article6: e.target.checked})}
                  className="w-5 h-5 text-teal-600"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Article 6.4 / LoA Documentation</p>
                  <p className="text-xs text-slate-600">UNFCCC authorization and corresponding adjustments verified</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checks.permanence}
                  onChange={(e) => setChecks({...checks, permanence: e.target.checked})}
                  className="w-5 h-5 text-teal-600"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Geological Storage Permanence (P90)</p>
                  <p className="text-xs text-slate-600">Bayesian leakage model and Monte Carlo uncertainty verified</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={checks.monitoring}
                  onChange={(e) => setChecks({...checks, monitoring: e.target.checked})}
                  className="w-5 h-5 text-teal-600"
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Monitoring & Verification Systems</p>
                  <p className="text-xs text-slate-600">Seismic, InSAR, wellhead sensors, and plume migration models active</p>
                </div>
              </label>
            </div>
          </div>

          {/* Decision Bar */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Decision</h3>
            <div className="grid grid-cols-3 gap-3">
              <button className="bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700">
                Approve & Attest
              </button>
              <button className="bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700">
                Approve with Conditions
              </button>
              <button className="bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsurancePage = () => {
  const [selectedToken, setSelectedToken] = useState(mockTokens[2]);
  const [policyForm, setPolicyForm] = useState({
    delivery: true,
    reversal: true,
    leakage: true,
    political: false,
    settlement: 'replacement',
    period: 120,
    insurerRef: ''
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Insurance & CCS Risk Management</h1>

      {/* Risk Inbox */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={20} className="text-orange-600" />
            <p className="font-semibold text-orange-900">New Mints</p>
          </div>
          <p className="text-3xl font-bold text-orange-700 mb-1">
            {mockTokens.filter(t => !t.insurancePolicy).length}
          </p>
          <p className="text-sm text-orange-600">Need parametric binding</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={20} className="text-red-600" />
            <p className="font-semibold text-red-900">Seismic Events</p>
          </div>
          <p className="text-3xl font-bold text-red-700 mb-1">1</p>
          <p className="text-sm text-red-600">Monitoring triggered</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplet size={20} className="text-yellow-600" />
            <p className="font-semibold text-yellow-900">Plume Migration</p>
          </div>
          <p className="text-3xl font-bold text-yellow-700 mb-1">2</p>
          <p className="text-sm text-yellow-600">ML models updated</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Selection */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">CIT-CCS Tokens Needing Coverage</h3>
            <div className="space-y-3">
              {mockTokens.filter(t => !t.insurancePolicy).map(token => (
                <div
                  key={token.id}
                  onClick={() => setSelectedToken(token)}
                  className={`p-4 border-2 rounded-lg cursor-pointer ${
                    selectedToken.id === token.id ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-slate-900">Token {token.id}</p>
                      <p className="text-sm text-slate-600">{token.projectId}</p>
                      <p className="text-xs text-teal-600 mt-1">{token.tokenType}</p>
                    </div>
                    <StatusBadge status={token.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <div>
                      <p className="text-slate-600">Quantity</p>
                      <p className="font-medium text-slate-900">{token.trancheA.qty.toLocaleString()} tCO2</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Rating</p>
                      <p className="font-medium text-slate-900">{token.rating}</p>
                    </div>
                  </div>
                  <div className="bg-slate-100 rounded p-2 text-xs">
                    <p className="text-slate-600">Storage: {token.geostorageMetadata.formation}</p>
                    <p className="text-slate-600">Permanence: {(token.geostorageMetadata.permanenceScore * 100).toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Parametric Policy Form */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Parametric Policy Configuration</h3>
            <div className="space-y-4">
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3 mb-4">
                <p className="text-xs font-medium text-cyan-900 mb-1">CCS-Specific Coverage</p>
                <p className="text-xs text-cyan-700">Parametric triggers: seismic events, pressure anomalies, plume migration</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Coverage Types</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={policyForm.delivery}
                      onChange={(e) => setPolicyForm({...policyForm, delivery: e.target.checked})}
                      className="w-4 h-4 text-teal-600"
                    />
                    <span className="text-sm text-slate-700">Delivery Risk</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={policyForm.reversal}
                      onChange={(e) => setPolicyForm({...policyForm, reversal: e.target.checked})}
                      className="w-4 h-4 text-teal-600"
                    />
                    <span className="text-sm text-slate-700">Reversal Risk (Storage Loss)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={policyForm.leakage}
                      onChange={(e) => setPolicyForm({...policyForm, leakage: e.target.checked})}
                      className="w-4 h-4 text-teal-600"
                    />
                    <span className="text-sm text-slate-700">Leakage Risk (Seismic/Plume triggers)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={policyForm.political}
                      onChange={(e) => setPolicyForm({...policyForm, political: e.target.checked})}
                      className="w-4 h-4 text-teal-600"
                    />
                    <span className="text-sm text-slate-700">Political Risk</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Settlement Type</label>
                <select
                  value={policyForm.settlement}
                  onChange={(e) => setPolicyForm({...policyForm, settlement: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                >
                  <option value="cash">Cash Settlement</option>
                  <option value="replacement">Replacement CIT-CCS Credits</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Coverage Period (months)</label>
                <input
                  type="number"
                  value={policyForm.period}
                  onChange={(e) => setPolicyForm({...policyForm, period: parseInt(e.target.value)})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  placeholder="120 (10 years)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Insurer Reference</label>
                <input
                  type="text"
                  value={policyForm.insurerRef}
                  onChange={(e) => setPolicyForm({...policyForm, insurerRef: e.target.value})}
                  placeholder="LOYD-CCS-XXXXX"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <p className="text-sm text-teal-900 mb-1">Recommended Premium</p>
                <p className="text-2xl font-bold text-teal-700">$8,500</p>
                <p className="text-xs text-teal-600 mt-1">Enhanced tier with parametric triggers (seismic, pressure, plume)</p>
              </div>

              <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700">
                Bind Parametric Policy & Write to Chain
              </button>
            </div>
          </div>

          {/* Buffer Status */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Buffer / Reserve Status</h3>
            <div className="space-y-3">
              {mockTokens.map(token => (
                <div key={token.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900">Token {token.id}</p>
                    <p className="text-xs text-slate-600">{token.projectId}</p>
                    <p className="text-xs text-teal-600">{token.tokenType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">
                      {token.bufferActual}% / {token.bufferRequired}%
                    </p>
                    {token.bufferActual >= token.bufferRequired ? (
                      <p className="text-xs text-green-600">✓ Adequate</p>
                    ) : (
                      <p className="text-xs text-red-600">⚠ Insufficient</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketplacePage = () => {
  const [filters, setFilters] = useState({
    ccp: false,
    article6: false,
    corsia: false,
    insured: false,
    iso27914: false
  });

  const listedTokens = mockTokens.filter(t => t.status === 'Listed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">CCS Marketplace</h1>
          <p className="text-slate-600 mt-1">Trade verified CIT-CCS removal & storage credits</p>
        </div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700">
          <ShoppingCart size={16} />
          View Cart (0)
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <Filter size={20} className="text-slate-600" />
          <h3 className="font-bold text-slate-900">Filter CCS Credits</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.ccp}
              onChange={(e) => setFilters({...filters, ccp: e.target.checked})}
              className="w-4 h-4 text-teal-600"
            />
            <span className="text-sm text-slate-700">ICVCM CCP</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.article6}
              onChange={(e) => setFilters({...filters, article6: e.target.checked})}
              className="w-4 h-4 text-teal-600"
            />
            <span className="text-sm text-slate-700">Article 6</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.corsia}
              onChange={(e) => setFilters({...filters, corsia: e.target.checked})}
              className="w-4 h-4 text-teal-600"
            />
            <span className="text-sm text-slate-700">CORSIA</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.insured}
              onChange={(e) => setFilters({...filters, insured: e.target.checked})}
              className="w-4 h-4 text-teal-600"
            />
            <span className="text-sm text-slate-700">Insured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.iso27914}
              onChange={(e) => setFilters({...filters, iso27914: e.target.checked})}
              className="w-4 h-4 text-teal-600"
            />
            <span className="text-sm text-slate-700">ISO 27914</span>
          </label>
        </div>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 gap-4">
        {listedTokens.map(token => (
          <div key={token.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-slate-900">CIT-CCS Token {token.id}</h3>
                  <StatusBadge status={token.status} />
                  <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded font-medium">{token.tokenType}</span>
                </div>
                <p className="text-slate-600 mb-2">{token.projectId}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {token.trancheA.attributes.map(attr => (
                    <AttributeBadge key={attr} label={attr} />
                  ))}
                  {token.insurancePolicy && <AttributeBadge label="Insured" />}
                </div>
                <div className="bg-slate-50 rounded-lg p-3 mt-3">
                  <p className="text-xs font-medium text-slate-700 mb-2">Geostorage Metadata</p>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-slate-600">Formation</p>
                      <p className="font-medium text-slate-900">{token.geostorageMetadata.formation}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Depth</p>
                      <p className="font-medium text-slate-900">{token.geostorageMetadata.depth}m</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Permanence</p>
                      <p className="font-medium text-emerald-600">{(token.geostorageMetadata.permanenceScore * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm text-slate-600 mb-1">Available</p>
                <p className="text-3xl font-bold text-teal-600">{token.trancheA.available.toLocaleString()}</p>
                <p className="text-sm text-slate-600">tCO2</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-slate-200">
              <div>
                <p className="text-sm text-slate-600">Price per tonne</p>
                <p className="text-xl font-bold text-slate-900">${token.trancheA.price}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Rating</p>
                <p className="text-xl font-bold text-slate-900">{token.rating}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Insurance</p>
                <p className="text-sm font-medium text-slate-900">{token.insurancePolicy || 'None'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Buffer</p>
                <p className="text-sm font-medium text-slate-900">{token.bufferActual}%</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg font-medium hover:bg-teal-700">
                Add to Cart
              </button>
              <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">
                <Eye size={16} />
              </button>
              <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MonitoringPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">CCS Monitoring & Alerts</h1>

      {/* Alert Strip */}
      <div className="space-y-3">
        {mockAlerts.filter(a => !a.resolved).map(alert => {
          const severityConfig = {
            high: { color: 'bg-red-50 border-red-200', textColor: 'text-red-900', icon: AlertTriangle },
            medium: { color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-900', icon: Bell },
            low: { color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-900', icon: Bell }
          };
          const config = severityConfig[alert.severity];
          const Icon = config.icon;

          return (
            <div key={alert.id} className={`${config.color} border rounded-lg p-4`}>
              <div className="flex items-start gap-3">
                <Icon size={20} className={config.textColor} />
                <div className="flex-1">
                  <p className={`font-semibold ${config.textColor}`}>{alert.message}</p>
                  <p className="text-sm text-slate-600 mt-1">→ {alert.action}</p>
                  <p className="text-xs text-slate-500 mt-2">{alert.timestamp}</p>
                </div>
                <button className="px-3 py-1 bg-white border border-slate-300 rounded text-sm hover:bg-slate-50">
                  Resolve
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI/ML Monitoring Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">AI/ML Auto-Applied Actions</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="font-medium text-slate-900">Plume Migration Model Updated</p>
              <p className="text-sm text-slate-600">Geospatial-ML v3.2 deployed for CCS-LNG-2025-001</p>
              <p className="text-xs text-slate-500 mt-1">2025-10-29 11:20</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="font-medium text-slate-900">Buffer Top-Up Triggered</p>
              <p className="text-sm text-slate-600">Token 2003: +1% buffer added due to seismic anomaly detection</p>
              <p className="text-xs text-slate-500 mt-1">2025-11-02 14:35</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="font-medium text-slate-900">Leakage Probability Re-calculated</p>
              <p className="text-sm text-slate-600">Bayesian-Fault v1.8 updated risk score for CCS-LNG-2025-002</p>
              <p className="text-xs text-slate-500 mt-1">2025-11-02 09:10</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="font-medium text-slate-900">Insurance Re-Price Triggered</p>
              <p className="text-sm text-slate-600">Parametric policy LOYD-CCS-12347 premium adjusted</p>
              <p className="text-xs text-slate-500 mt-1">2025-11-01 09:20</p>
            </div>
          </div>
        </div>
      </div>

      {/* Token Health */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">CIT-CCS Token Health Dashboard</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Token ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Project</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Rating</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Permanence</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Insurance</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Buffer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockTokens.map(token => (
                <tr key={token.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{token.id}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{token.projectId}</td>
                  <td className="px-4 py-3 text-sm text-slate-900">{token.rating}</td>
                  <td className="px-4 py-3 text-sm font-medium text-emerald-600">{(token.geostorageMetadata.permanenceScore * 100).toFixed(1)}%</td>
                  <td className="px-4 py-3 text-sm">
                    {token.insurancePolicy ? (
                      <span className="text-green-600">✓ Bound</span>
                    ) : (
                      <span className="text-orange-600">⚠ Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {token.bufferActual >= token.bufferRequired ? (
                      <span className="text-green-600">{token.bufferActual}%</span>
                    ) : (
                      <span className="text-red-600">{token.bufferActual}%</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={token.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Organization Profile */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Organization Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Organization Name</label>
              <input
                type="text"
                defaultValue="AlphaCarbon CCS Corp"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Legal Entity</label>
              <input
                type="text"
                defaultValue="AlphaCarbon LLC"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Jurisdiction</label>
              <input
                type="text"
                defaultValue="Delaware, USA"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700">
              Save Changes
            </button>
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">API Keys</h3>
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-slate-900">Production Key</p>
                <button className="text-red-600 text-sm hover:underline">Revoke</button>
              </div>
              <p className="font-mono text-xs text-slate-600 break-all">ak_prod_ccs_a8f7d9e2c4b1x9y7z5...</p>
              <p className="text-xs text-slate-500 mt-2">Created: 2025-09-15</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-slate-900">Staging Key</p>
                <button className="text-red-600 text-sm hover:underline">Revoke</button>
              </div>
              <p className="font-mono text-xs text-slate-600 break-all">ak_staging_ccs_b9g8e0f3d5c2y0z8...</p>
              <p className="text-xs text-slate-500 mt-2">Created: 2025-10-01</p>
            </div>
            <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 flex items-center justify-center gap-2">
              <Plus size={16} />
              Generate New Key
            </button>
          </div>
        </div>

        {/* Webhooks */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Webhooks</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-slate-700">Seismic Anomalies</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-slate-700">Plume Migration Updates</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-slate-700">Insurance Rebind Required</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-slate-700">New CIT-CCS Mint Notifications</span>
            </label>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Webhook URL</label>
              <input
                type="url"
                placeholder="https://your-domain.com/webhooks/ccs"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
              />
            </div>
            <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700">
              Save Webhook Config
            </button>
          </div>
        </div>

        {/* User Roles */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">User Roles</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">john.smith@alphacarbon.io</p>
                <p className="text-xs text-slate-600">Originator</p>
              </div>
              <button className="text-teal-600 text-sm hover:underline">Edit</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">sarah.jones@alphacarbon.io</p>
                <p className="text-xs text-slate-600">TIC Member</p>
              </div>
              <button className="text-teal-600 text-sm hover:underline">Edit</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">mike.wilson@alphacarbon.io</p>
                <p className="text-xs text-slate-600">Admin</p>
              </div>
              <button className="text-teal-600 text-sm hover:underline">Edit</button>
            </div>
            <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 flex items-center justify-center gap-2">
              <Plus size={16} />
              Invite User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN APP ====================

const AlphaCarbonCCSPlatform = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userRole, setUserRole] = useState('admin');

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage />;
      case 'projects': return <ProjectsPage />;
      case 'issuance': return <IssuancePage />;
      case 'governance': return <GovernancePage />;
      case 'insurance': return <InsurancePage />;
      case 'marketplace': return <MarketplacePage />;
      case 'monitoring': return <MonitoringPage />;
      case 'settings': return <SettingsPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userRole={userRole}
      />
      
      <div className={`${sidebarCollapsed ? 'ml-16' : 'ml-60'} transition-all duration-300`}>
        {/* Top Bar with Role Selector */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-600 font-medium">Role:</label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-900 bg-white hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="admin">Admin</option>
                <option value="originator">Originator</option>
                <option value="tic">TIC Member</option>
                <option value="insurer">Insurer</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-slate-100 rounded-lg">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-medium">
              {userRole[0].toUpperCase()}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default AlphaCarbonCCSPlatform;
