import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import {
  Building2, MapPin, Leaf, Shield, TrendingUp, Activity, Award,
  CheckCircle, Clock, ArrowRight, ExternalLink
} from 'lucide-react';

/* ================================
   Mock Data: Facilities & Projects
   ================================ */
const facilities = {
  stratos: {
    id: 'FAC-001',
    name: 'STRATOS Facility',
    location: 'Houston, Texas, USA',
    coordinates: { lat: 29.7604, lng: -95.3698 },
    type: 'LNG CO₂ Capture & Storage',
    capacity: '2.5M tonnes CO₂/year',
    status: 'Operational',
    commissioned: '2023-06-15',
    projects: [
      {
        id: 'PROJ-STRATOS-001',
        name: 'STRATOS CCS Phase 1',
        methodology: 'VM0049',
        status: 'Active',
        verifier: 'SCS Global Services',
        startDate: '2024-01-01',
        currentPeriod: 'Q3 2025',
        totalCaptured: 1847500,
        totalVerified: 1754625,
        totalIssued: 1666494,
        bufferWithheld: 88131,
        insured: true,
        insuranceProvider: "Lloyd's of London",
        coverageAmount: 50000000
      }
    ]
  },
  danish: {
    id: 'FAC-002',
    name: 'Danish Facility',
    location: 'Copenhagen, Denmark',
    coordinates: { lat: 55.6761, lng: 12.5683 },
    type: 'Industrial CO₂ Capture',
    capacity: '1.8M tonnes CO₂/year',
    status: 'Operational',
    commissioned: '2024-01-10',
    projects: [
      {
        id: 'PROJ-DANISH-001',
        name: 'Copenhagen Carbon Initiative',
        methodology: 'VM0049',
        status: 'Active',
        verifier: 'DNV',
        startDate: '2024-02-01',
        currentPeriod: 'Q3 2025',
        totalCaptured: 1234000,
        totalVerified: 1172300,
        totalIssued: 1113885,
        bufferWithheld: 58415,
        insured: true,
        insuranceProvider: 'Swiss Re',
        coverageAmount: 35000000
      }
    ]
  }
};

/* ==========================================
   Project Boundary Data (for visualization)
   ========================================== */
const projectBoundaryData = {
  'PROJ-STRATOS-001': {
    components: [
      { name: 'CO₂ Capture Unit', x: 100, y: 150, type: 'capture', capacity: '850 tCO₂/day' },
      { name: 'Compression Station', x: 300, y: 150, type: 'process', capacity: '900 tCO₂/day' },
      { name: 'Pipeline Transport', x: 500, y: 150, type: 'transport', length: '45 km' },
      { name: 'Injection Well A1', x: 700, y: 100, type: 'storage', depth: '2,450m' },
      { name: 'Injection Well A2', x: 700, y: 200, type: 'storage', depth: '2,380m' },
      { name: 'Monitoring Station', x: 850, y: 150, type: 'monitoring', sensors: '24 units' }
    ],
    flows: [
      { from: 0, to: 1, label: '825 tCO₂/day' },
      { from: 1, to: 2, label: '815 tCO₂/day' },
      { from: 2, to: 3, label: '405 tCO₂/day' },
      { from: 2, to: 4, label: '405 tCO₂/day' },
      { from: 3, to: 5, label: 'Real-time' },
      { from: 4, to: 5, label: 'Real-time' }
    ]
  },
  'PROJ-DANISH-001': {
    components: [
      { name: 'CO₂ Capture Unit', x: 100, y: 150, type: 'capture', capacity: '620 tCO₂/day' },
      { name: 'Purification System', x: 300, y: 150, type: 'process', purity: '99.7%' },
      { name: 'Pipeline Network', x: 500, y: 150, type: 'transport', length: '32 km' },
      { name: 'Geological Storage', x: 700, y: 150, type: 'storage', depth: '1,850m' },
      { name: 'Monitoring Array', x: 850, y: 150, type: 'monitoring', sensors: '18 units' }
    ],
    flows: [
      { from: 0, to: 1, label: '610 tCO₂/day' },
      { from: 1, to: 2, label: '605 tCO₂/day' },
      { from: 2, to: 3, label: '600 tCO₂/day' },
      { from: 3, to: 4, label: 'Continuous' }
    ]
  }
};

/* ==========================
   Colors for Boundary Types
   ========================== */
const componentColors = {
  capture: '#3b82f6',
  process: '#8b5cf6',
  transport: '#06b6d4',
  storage: '#10b981',
  monitoring: '#f59e0b'
};

/* ====================
   Blockchain Activity
   ==================== */
const blockchainTransactions = {
  'PROJ-STRATOS-001': [
    {
      id: 'TX-001',
      type: 'Project Registration',
      hash: '0x7a9f3c8e2d1b5a6c4e8f9d2a3b7c1e5f8a2d4c6b9e1f3a5c7d9b2e4f6a8c1d3e',
      timestamp: '2024-01-15 14:32:18 UTC',
      block: 18234567,
      from: '0x742d35Cc6634C0532925a3b8...',
      status: 'Confirmed',
      gasUsed: '145,234',
      details: 'Registered STRATOS CCS Phase 1 with VM0049 methodology'
    },
    {
      id: 'TX-002',
      type: 'Verifier Assignment',
      hash: '0x2b4f7d9e1c8a3f5b6d9c2e4a7f1b8d3c5e9a2f4d6c8b1e3a5d7c9f2e4b6d8a1c',
      timestamp: '2024-01-16 09:15:42 UTC',
      block: 18235012,
      from: '0x742d35Cc6634C0532925a3b8...',
      to: '0x9f2e4b6d8a1c3e5f7d9b2a4c...',
      status: 'Confirmed',
      gasUsed: '87,456',
      details: 'Assigned SCS Global Services as verifier'
    },
    {
      id: 'TX-003',
      type: 'Batch Mint (Q1 2024)',
      hash: '0x5c8e2a4f7d1b9e3c6a8d2f4b7e1c9a3d5f8b2e4c7a9d1f3b5e8c2a4d6f9b1e3a',
      timestamp: '2024-04-05 16:45:33 UTC',
      block: 18892341,
      from: '0x9f2e4b6d8a1c3e5f7d9b2a4c...',
      tokenType: 'ERC-1155',
      tokensIssued: '412,350',
      bufferWithheld: '21,850',
      status: 'Confirmed',
      gasUsed: '234,567',
      details: 'Minted 412,350 CITs for Q1 2024 verification period'
    },
    {
      id: 'TX-004',
      type: 'Insurance Policy Attached',
      hash: '0x9d3f6b8e1c4a7f2d5b9e3c6a8f1d4b7e2c5a9d3f6b8e1c4a7d2f5b9e3c6a8f1d',
      timestamp: '2024-04-06 11:20:15 UTC',
      block: 18893156,
      from: '0xc5a9d3f6b8e1c4a7d2f5b9e3...',
      status: 'Confirmed',
      gasUsed: '92,340',
      details: "Lloyd's policy attached: $50M coverage, 24-month term"
    },
    {
      id: 'TX-005',
      type: 'Marketplace Listing',
      hash: '0x4a7c9d2e5f8b1c3a6d9e2f4b7c1e8a3d5f9b2e4c7a1d3f5b8e2c4a6d9f1b3e5c',
      timestamp: '2024-04-08 14:55:27 UTC',
      block: 18895834,
      from: '0x742d35Cc6634C0532925a3b8...',
      quantity: '300,000',
      pricePerTonne: '45 USDC',
      status: 'Confirmed',
      gasUsed: '178,234',
      details: 'Listed 300,000 CITs at $45/tonne'
    },
    {
      id: 'TX-006',
      type: 'Credit Transfer (Sale)',
      hash: '0x8e2c5a7d9f1b3e6c8a2d4f7b9e1c3a5d8f2b4e7c9a1d3f6b8e2c5a7d9f1b3e6c',
      timestamp: '2024-04-12 09:33:48 UTC',
      block: 18902567,
      from: '0x742d35Cc6634C0532925a3b8...',
      to: '0x3e5f8b2d4c7a9e1f3b5d8c2a...',
      quantity: '50,000',
      status: 'Confirmed',
      gasUsed: '156,789',
      details: 'Transferred 50,000 CITs to TechCorp Sustainability'
    },
    {
      id: 'TX-007',
      type: 'Batch Mint (Q2 2024)',
      hash: '0x1f4b7e9c2a5d8f3b6e9c1a4d7f2b5e8c3a6d9f1b4e7c2a5d8f3b6e9c1a4d7f2b',
      timestamp: '2024-07-08 15:22:11 UTC',
      block: 19234890,
      from: '0x9f2e4b6d8a1c3e5f7d9b2a4c...',
      tokenType: 'ERC-1155',
      tokensIssued: '425,780',
      bufferWithheld: '22,541',
      status: 'Confirmed',
      gasUsed: '241,345',
      details: 'Minted 425,780 CITs for Q2 2024 verification period'
    },
    {
      id: 'TX-008',
      type: 'Credit Retirement',
      hash: '0x6c9a2e5f8d1b4c7a9e2f5d8b1c4a7e9f2d5c8a3e6f9b2d4c7a1e5f8d2b4c6a9e',
      timestamp: '2024-08-15 13:47:55 UTC',
      block: 19456123,
      from: '0x3e5f8b2d4c7a9e1f3b5d8c2a...',
      quantity: '25,000',
      beneficiary: 'TechCorp Inc.',
      purpose: 'FY2024 Scope 1 Emissions Offset',
      certificateId: 'CERT-NFT-001',
      status: 'Confirmed',
      gasUsed: '198,567',
      details: 'Retired 25,000 CITs, issued retirement certificate NFT'
    },
    {
      id: 'TX-009',
      type: 'Batch Mint (Q3 2024)',
      hash: '0x3d6a9c2f5e8b1d4a7c9f2e5b8d1c4a7f9e2b5d8c3a6f9d2e4b7c1a5e8d3b6a9c',
      timestamp: '2024-10-10 16:18:33 UTC',
      block: 19789456,
      from: '0x9f2e4b6d8a1c3e5f7d9b2a4c...',
      tokenType: 'ERC-1155',
      tokensIssued: '418,120',
      bufferWithheld: '22,137',
      status: 'Confirmed',
      gasUsed: '238,901',
      details: 'Minted 418,120 CITs for Q3 2024 verification period'
    },
    {
      id: 'TX-010',
      type: 'Credit Transfer (Sale)',
      hash: '0x9f2b5e8c1a4d7f3b6e9c2a5d8f1b4e7c9a2d5f8b3e6c9f1a4d7e2b5c8a3d6f9b',
      timestamp: '2024-10-18 10:52:19 UTC',
      block: 19812345,
      from: '0x742d35Cc6634C0532925a3b8...',
      to: '0x7d3a9f2e5c8b1d4a6f9e2c5b...',
      quantity: '100,000',
      status: 'Confirmed',
      gasUsed: '162,456',
      details: 'Transferred 100,000 CITs to Green Energy Corp'
    }
  ],
  'PROJ-DANISH-001': [
    {
      id: 'TX-D001',
      type: 'Project Registration',
      hash: '0xa5d8f2b4e7c9a1d3f6b8e2c5a7d9f1b4e6c8a2d5f7b9e1c3a6d8f2b4e7c9a1d3',
      timestamp: '2024-02-10 11:45:22 UTC',
      block: 18456789,
      from: '0x8c2a5d7f9b1e3c6a8d2f4b7e...',
      status: 'Confirmed',
      gasUsed: '152,340',
      details: 'Registered Copenhagen Carbon Initiative with VM0049'
    },
    {
      id: 'TX-D002',
      type: 'Verifier Assignment',
      hash: '0x2e5b8c1a4f7d9e2b5c8a3d6f9b1e4c7a9d2f5b8e1c3a6d9f2b4e7c1a5d8f3b6e',
      timestamp: '2024-02-11 14:20:37 UTC',
      block: 18457234,
      from: '0x8c2a5d7f9b1e3c6a8d2f4b7e...',
      to: '0x5f8b2e4c7a9d1f3b6e8c2a5d...',
      status: 'Confirmed',
      gasUsed: '89,123',
      details: 'Assigned DNV as verification body'
    },
    {
      id: 'TX-D003',
      type: 'Batch Mint (Q2 2024)',
      hash: '0x7c9a2f5d8b1e4c7a9f2d5b8e1c3a6d9f2b4e7c1a5d8f3b6e9c2a4d7f1b5e8c3a',
      timestamp: '2024-07-15 13:35:44 UTC',
      block: 19267890,
      from: '0x5f8b2e4c7a9d1f3b6e8c2a5d...',
      tokenType: 'ERC-1155',
      tokensIssued: '275,450',
      bufferWithheld: '14,592',
      status: 'Confirmed',
      gasUsed: '225,678',
      details: 'Minted 275,450 CITs for Q2 2024 verification period'
    },
    {
      id: 'TX-D004',
      type: 'Insurance Policy Attached',
      hash: '0x4d7b9e2c5a8f1d3b6e9c2a4d7f1b5e8c3a6d9f2b4e7c1a5d8f3b6e9c2a5d7f1b',
      timestamp: '2024-07-16 09:18:56 UTC',
      block: 19268745,
      from: '0xf3b6e9c2a5d7f1b4e8c3a6d9...',
      status: 'Confirmed',
      gasUsed: '94,567',
      details: 'Swiss Re policy attached: $35M coverage, 24-month term'
    },
    {
      id: 'TX-D005',
      type: 'Credit Transfer (Sale)',
      hash: '0x8e1c4a7d9f2b5e8c3a6d9f1b4e7c2a5d8f3b6e9c1a4d7f2b5e8c3a6d9f1b4e7c',
      timestamp: '2024-08-22 15:42:31 UTC',
      block: 19489012,
      from: '0x8c2a5d7f9b1e3c6a8d2f4b7e...',
      to: '0x9d2f5b8e1c3a6d9f2b4e7c1a...',
      quantity: '75,000',
      status: 'Confirmed',
      gasUsed: '158,234',
      details: 'Transferred 75,000 CITs to Nordic Sustainability Fund'
    },
    {
      id: 'TX-D006',
      type: 'Batch Mint (Q3 2024)',
      hash: '0x1b4e7c9a2d5f8b3e6c9a1d4f7b2e5c8a3d6f9b1e4c7a2d5f8b3e6c9a1d4f7b2e',
      timestamp: '2024-10-12 12:28:17 UTC',
      block: 19798765,
      from: '0x5f8b2e4c7a9d1f3b6e8c2a5d...',
      tokenType: 'ERC-1155',
      tokensIssued: '282,890',
      bufferWithheld: '14,984',
      status: 'Confirmed',
      gasUsed: '229,456',
      details: 'Minted 282,890 CITs for Q3 2024 verification period'
    }
  ]
};

/* ===================
   MRV Time Series
   =================== */
const mrvData = {
  'PROJ-STRATOS-001': [
    { date: 'Jan 2024', captured: 232000, verified: 220400, issued: 209380, target: 235000 },
    { date: 'Feb 2024', captured: 228000, verified: 216600, issued: 205770, target: 235000 },
    { date: 'Mar 2024', captured: 241000, verified: 228950, issued: 217503, target: 235000 },
    { date: 'Apr 2024', captured: 238000, verified: 226100, issued: 214795, target: 235000 },
    { date: 'May 2024', captured: 245000, verified: 232750, issued: 221113, target: 235000 },
    { date: 'Jun 2024', captured: 242000, verified: 229900, issued: 218405, target: 235000 },
    { date: 'Jul 2024', captured: 251000, verified: 238450, issued: 226528, target: 235000 },
    { date: 'Aug 2024', captured: 248000, verified: 235600, issued: 223820, target: 235000 },
    { date: 'Sep 2024', captured: 243000, verified: 230850, issued: 219308, target: 235000 },
    { date: 'Oct 2024', captured: 239500, verified: 227525, issued: 216149, target: 235000 }
  ],
  'PROJ-DANISH-001': [
    { date: 'Feb 2024', captured: 52000, verified: 49400, issued: 46930, target: 55000 },
    { date: 'Mar 2024', captured: 58000, verified: 55100, issued: 52345, target: 55000 },
    { date: 'Apr 2024', captured: 54000, verified: 51300, issued: 48735, target: 55000 },
    { date: 'May 2024', captured: 61000, verified: 57950, issued: 55053, target: 55000 },
    { date: 'Jun 2024', captured: 59000, verified: 56050, issued: 53248, target: 55000 },
    { date: 'Jul 2024', captured: 63000, verified: 59850, issued: 56858, target: 55000 },
    { date: 'Aug 2024', captured: 62000, verified: 58900, issued: 55955, target: 55000 },
    { date: 'Sep 2024', captured: 58500, verified: 55575, issued: 52796, target: 55000 },
    { date: 'Oct 2024', captured: 60000, verified: 57000, issued: 54150, target: 55000 }
  ]
};

/* =========================
   Marketplace Listings
   ========================= */
const marketplaceListings = [
  {
    id: 'LIST-001',
    projectId: 'PROJ-STRATOS-001',
    facility: 'STRATOS Facility',
    vintage: 'Q3 2024',
    quantity: 150000,
    available: 150000,
    pricePerTonne: 45,
    insured: true,
    rating: 'AAA'
  },
  {
    id: 'LIST-002',
    projectId: 'PROJ-DANISH-001',
    facility: 'Danish Facility',
    vintage: 'Q3 2024',
    quantity: 100000,
    available: 100000,
    pricePerTonne: 48,
    insured: true,
    rating: 'AAA'
  }
];

/* ======================
   Main App Component
   ====================== */
export default function ACIPlatform() {
  const [selectedFacility, setSelectedFacility] = useState('stratos');
  const [selectedProject, setSelectedProject] = useState('PROJ-STRATOS-001');
  const [activeTab, setActiveTab] = useState('overview');
  const [userRole, setUserRole] = useState('owner'); // owner | verifier | buyer | insurer

  const facility = facilities[selectedFacility];
  const project = facility.projects[0];
  const boundaryData = projectBoundaryData[selectedProject];
  const transactions = blockchainTransactions[selectedProject];
  const mrvTimeSeries = mrvData[selectedProject];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AlphaCarbon Integrity Platform</h1>
                <p className="text-sm text-gray-500">Blockchain-Enabled MRV-to-Market System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700"
              >
                <option value="owner">Project Owner</option>
                <option value="verifier">Verifier (VVB)</option>
                <option value="buyer">Buyer</option>
                <option value="insurer">Insurer</option>
              </select>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Ethereum L2 (Polygon)</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Facility Selector */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-4">
            {Object.keys(facilities).map((key) => {
              const f = facilities[key];
              const isActive = selectedFacility === key;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedFacility(key);
                    setSelectedProject(f.projects[0].id);
                  }}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Building2 className={`w-8 h-8 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-gray-900">{f.name}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{f.location}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-4">
                        <span className="text-xs font-medium text-gray-500">Capacity:</span>
                        <span className="text-sm font-semibold text-gray-700">{f.capacity}</span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {f.status}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {['overview', 'boundary', 'mrv', 'blockchain', 'marketplace'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        {activeTab === 'overview' && <OverviewTab project={project} mrvTimeSeries={mrvTimeSeries} />}
        {activeTab === 'boundary' && <ProjectBoundaryTab boundaryData={boundaryData} project={project} />}
        {activeTab === 'mrv' && <MRVTab mrvTimeSeries={mrvTimeSeries} project={project} />}
        {activeTab === 'blockchain' && <BlockchainTab transactions={transactions} />}
        {activeTab === 'marketplace' && <MarketplaceTab listings={marketplaceListings} />}
      </div>
    </div>
  );
}

/* ======================
   Overview Tab
   ====================== */
function OverviewTab({ project, mrvTimeSeries }) {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard icon={Activity} label="Total Captured" value={project.totalCaptured.toLocaleString()} unit="tCO₂e" color="blue" />
        <KPICard icon={CheckCircle} label="Total Verified" value={project.totalVerified.toLocaleString()} unit="tCO₂e" color="green" />
        <KPICard icon={Award} label="CITs Issued" value={project.totalIssued.toLocaleString()} unit="tokens" color="purple" />
        <KPICard icon={Shield} label="Buffer Withheld" value={project.bufferWithheld.toLocaleString()} unit="tCO₂e" color="orange" />
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
          <div className="space-y-3">
            <InfoRow label="Project ID" value={project.id} />
            <InfoRow label="Methodology" value={project.methodology} badge />
            <InfoRow label="Status" value={project.status} statusBadge />
            <InfoRow label="Start Date" value={project.startDate} />
            <InfoRow label="Current Period" value={project.currentPeriod} />
            <InfoRow label="Verifier" value={project.verifier} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Coverage</h3>
          <div className="space-y-3">
            <InfoRow label="Insured" value={project.insured ? 'Yes' : 'No'} badge badgeColor={project.insured ? 'green' : 'gray'} />
            <InfoRow label="Provider" value={project.insuranceProvider} />
            <InfoRow label="Coverage Amount" value={`$${(project.coverageAmount / 1_000_000).toFixed(1)}M`} />
            <InfoRow label="Policy Type" value="Reversal Risk Coverage" />
            <InfoRow label="Term" value="24 months" />
          </div>
        </div>
      </div>

      {/* Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Capture & Verification Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mrvTimeSeries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="captured" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Captured" />
            <Area type="monotone" dataKey="verified" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Verified" />
            <Area type="monotone" dataKey="issued" stackId="3" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="Issued" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ==========================
   Project Boundary Tab
   ========================== */
function ProjectBoundaryTab({ boundaryData, project }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Project Boundary Diagram</h3>
          <div className="text-sm text-gray-500">Project: <span className="font-medium text-gray-900">{project.name}</span></div>
        </div>

        {/* SVG Diagram */}
        <div className="bg-gray-50 rounded-lg p-8">
          <svg width="100%" height="400" viewBox="0 0 1000 300">
            {/* Flows */}
            {boundaryData.flows.map((flow, idx) => {
              const from = boundaryData.components[flow.from];
              const to = boundaryData.components[flow.to];
              return (
                <g key={`flow-${idx}`}>
                  <line
                    x1={from.x + 50}
                    y1={from.y}
                    x2={to.x - 50}
                    y2={to.y}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 10}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="12"
                  >
                    {flow.label}
                  </text>
                </g>
              );
            })}

            {/* Components */}
            {boundaryData.components.map((comp, idx) => (
              <g key={`comp-${idx}`}>
                <rect
                  x={comp.x - 70}
                  y={comp.y - 40}
                  width="140"
                  height="80"
                  fill={componentColors[comp.type]}
                  fillOpacity="0.1"
                  stroke={componentColors[comp.type]}
                  strokeWidth="2"
                  rx="8"
                />
                <text
                  x={comp.x}
                  y={comp.y - 10}
                  textAnchor="middle"
                  fill={componentColors[comp.type]}
                  fontSize="13"
                  fontWeight="600"
                >
                  {comp.name}
                </text>
                <text
                  x={comp.x}
                  y={comp.y + 10}
                  textAnchor="middle"
                  fill="#475569"
                  fontSize="11"
                >
                  {comp.capacity || comp.length || comp.depth || comp.sensors || comp.purity}
                </text>
                <circle cx={comp.x} cy={comp.y + 25} r="4" fill={componentColors[comp.type]} />
              </g>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6">
          {Object.entries(componentColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: color }}></div>
              <span className="text-sm text-gray-700 capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==============
   MRV Tab
   ============== */
function MRVTab({ mrvTimeSeries, project }) {
  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Capture & Verification Metrics</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={mrvTimeSeries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="captured" fill="#3b82f6" name="Captured (tCO₂e)" />
            <Bar dataKey="verified" fill="#10b981" name="Verified (tCO₂e)" />
            <Bar dataKey="issued" fill="#8b5cf6" name="Issued (CITs)" />
            <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} name="Target" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={CheckCircle} title="Verification Rate" value="95.0%" subtitle="Captured → Verified" color="green" />
        <StatCard icon={Award} title="Issuance Rate" value="95.0%" subtitle="Verified → Issued" color="purple" />
        <StatCard icon={Shield} title="Buffer Rate" value="5.0%" subtitle="Safety Buffer" color="orange" />
      </div>

      {/* Recent Verifications */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification History</h3>
        <div className="space-y-3">
          <VerificationRow period="Q3 2024" captured="243,000" verified="230,850" issued="219,308" verifier={project.verifier} date="2024-10-05" status="Completed" />
          <VerificationRow period="Q2 2024" captured="725,000" verified="688,750" issued="654,313" verifier={project.verifier} date="2024-07-08" status="Completed" />
          <VerificationRow period="Q1 2024" captured="701,000" verified="665,950" issued="632,653" verifier={project.verifier} date="2024-04-05" status="Completed" />
        </div>
      </div>
    </div>
  );
}

/* =====================
   Blockchain Tab
   ===================== */
function BlockchainTab({ transactions }) {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <MiniStat label="Total Transactions" value={transactions.length} />
        <MiniStat label="Minting Events" value={transactions.filter(t => t.type.includes('Mint')).length} />
        <MiniStat label="Transfer Events" value={transactions.filter(t => t.type.includes('Transfer')).length} />
        <MiniStat label="Retirement Events" value={transactions.filter(t => t.type.includes('Retirement')).length} />
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Complete Transaction History</h3>
        <div className="space-y-4">
          {transactions.map((tx, idx) => (
            <TransactionCard key={tx.id} transaction={tx} isFirst={idx === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =====================
   Marketplace Tab
   ===================== */
function MarketplaceTab({ listings }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Available Carbon Credits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map(listing => (
            <div key={listing.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{listing.facility}</h4>
                  <p className="text-sm text-gray-500 mt-1">{listing.projectId}</p>
                </div>
                <div className="flex gap-2">
                  {listing.insured && (
                    <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Insured
                    </div>
                  )}
                  <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                    {listing.rating}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <Row label="Vintage" value={listing.vintage} />
                <Row label="Available" value={`${listing.available.toLocaleString()} tCO₂e`} />
                <Row label="Price per Tonne" value={`$${listing.pricePerTonne}`} strong />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                    Purchase
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =====================
   Helper Components
   ===================== */
function KPICard({ icon: Icon, label, value, unit, color }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h4 className="text-sm font-medium text-gray-500">{label}</h4>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{unit}</div>
    </div>
  );
}

function InfoRow({ label, value, badge, statusBadge, badgeColor = 'blue' }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}:</span>
      {badge ? (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          badgeColor === 'green' ? 'bg-green-100 text-green-700'
          : badgeColor === 'purple' ? 'bg-purple-100 text-purple-700'
          : badgeColor === 'orange' ? 'bg-orange-100 text-orange-700'
          : 'bg-blue-100 text-blue-700'
        }`}>{value}</span>
      ) : statusBadge ? (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">{value}</span>
      ) : (
        <span className="text-sm font-medium text-gray-900">{value}</span>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, title, value, subtitle, color }) {
  const map = {
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    blue: 'bg-blue-100 text-blue-700'
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${map[color] || map.blue}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function VerificationRow({ period, captured, verified, issued, verifier, date, status }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <div className="font-medium text-gray-900">{period}</div>
          <div className="text-sm text-gray-500">Verified by {verifier}</div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="text-sm text-gray-500">Captured</div>
          <div className="font-medium text-gray-900">{captured} tCO₂e</div>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400" />
        <div className="text-right">
          <div className="text-sm text-gray-500">Verified</div>
          <div className="font-medium text-gray-900">{verified} tCO₂e</div>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400" />
        <div className="text-right">
          <div className="text-sm text-gray-500">Issued</div>
          <div className="font-medium text-gray-900">{issued} CITs</div>
        </div>
        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          {status}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
    </div>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}:</span>
      <span className={strong ? 'font-semibold text-green-600' : 'font-medium text-gray-900'}>{value}</span>
    </div>
  );
}

function TransactionCard({ transaction, isFirst }) {
  const getTypeColor = (type) => {
    if (type.includes('Registration')) return 'blue';
    if (type.includes('Mint')) return 'purple';
    if (type.includes('Transfer') || type.includes('Sale')) return 'green';
    if (type.includes('Retirement')) return 'red';
    if (type.includes('Insurance')) return 'orange';
    return 'gray';
  };

  const color = getTypeColor(transaction.type);
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  return (
    <div className={`border-l-4 ${colorClasses[color].replace('bg-', 'border-')} bg-white p-5 rounded-r-lg shadow-sm`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}>
            {transaction.type}
          </div>
          {isFirst && <div className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">Latest</div>}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{transaction.timestamp}</span>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-3">{transaction.details}</p>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <div className="text-xs text-gray-500 mb-1">Transaction Hash</div>
          <div className="flex items-center gap-2">
            <code className="text-xs font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded">
              {transaction.hash.substring(0, 20)}...{transaction.hash.substring(transaction.hash.length - 10)}
            </code>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Block Number</div>
          <div className="text-sm font-mono text-gray-900">{transaction.block.toLocaleString()}</div>
        </div>
      </div>

      {transaction.tokensIssued && (
        <div className="flex items-center gap-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <Award className="w-5 h-5 text-purple-600" />
          <div className="flex-1">
            <div className="text-sm font-medium text-purple-900">{transaction.tokensIssued} CITs Issued</div>
            {transaction.bufferWithheld && (
              <div className="text-xs text-purple-700 mt-1">Buffer: {transaction.bufferWithheld} tokens withheld</div>
            )}
          </div>
        </div>
      )}

      {transaction.quantity && !transaction.tokensIssued && (
        <div className="flex items-center gap-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <div className="flex-1">
            <div className="text-sm font-medium text-green-900">
              {transaction.quantity} CITs {transaction.type.includes('Retirement') ? 'Retired' : 'Transferred'}
            </div>
            {transaction.beneficiary && <div className="text-xs text-green-700 mt-1">Beneficiary: {transaction.beneficiary}</div>}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs font-medium text-green-700">{transaction.status}</span>
        </div>
        <div className="text-xs text-gray-500">Gas: {transaction.gasUsed}</div>
      </div>
    </div>
  );
}
