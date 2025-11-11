import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Building2, MapPin, Leaf, Shield, TrendingUp, Activity, Award, FileText, Users, CheckCircle, Clock, AlertCircle, ArrowRight, ExternalLink, Download, LogOut, Bell, Settings, Search, Filter, Plus, Send, Archive, Eye, Edit, Upload, Calendar, DollarSign, Home, BarChart3, ShoppingCart, Package, Briefcase, Lock, Mail, User as UserIcon } from 'lucide-react';

// ==================== MOCK DATA ====================

// Mock Users Database
const mockUsers = {
  'owner@stratos.com': {
    id: 'USR-001',
    email: 'owner@stratos.com',
    password: 'demo123',
    name: 'Sarah Mitchell',
    role: 'owner',
    organization: 'STRATOS Energy LLC',
    wallet: '0x742d35Cc6634C0532925a3b844a4bF0C89E1c8A7',
    kyc_status: 'verified',
    facilities: ['FAC-001'],
    avatar: null
  },
  'owner@danish.com': {
    id: 'USR-002',
    email: 'owner@danish.com',
    password: 'demo123',
    name: 'Lars Nielsen',
    role: 'owner',
    organization: 'Danish Carbon Solutions',
    wallet: '0x8c2a5d7f9b1e3c6a8d2f4b7e9c1a3d5f8b2e4c7a',
    kyc_status: 'verified',
    facilities: ['FAC-002'],
    avatar: null
  },
  'verifier@scs.com': {
    id: 'USR-003',
    email: 'verifier@scs.com',
    password: 'demo123',
    name: 'Dr. Michael Chen',
    role: 'verifier',
    organization: 'SCS Global Services',
    wallet: '0x9f2e4b6d8a1c3e5f7d9b2a4c6e8f1d3b5a7c9e2f',
    kyc_status: 'verified',
    accreditation: 'ISO 14065',
    avatar: null
  },
  'buyer@techcorp.com': {
    id: 'USR-004',
    email: 'buyer@techcorp.com',
    password: 'demo123',
    name: 'Jennifer Park',
    role: 'buyer',
    organization: 'TechCorp Sustainability',
    wallet: '0x3e5f8b2d4c7a9e1f3b5d8c2a4f6b9e1c3d5a7f8b',
    kyc_status: 'verified',
    avatar: null
  },
  'insurer@lloyds.com': {
    id: 'USR-005',
    email: 'insurer@lloyds.com',
    password: 'demo123',
    name: 'Robert Thompson',
    role: 'insurer',
    organization: "Lloyd's of London",
    wallet: '0xc5a9d3f6b8e1c4a7d2f5b9e3c6a8f1d4b7e9c2a5',
    kyc_status: 'verified',
    avatar: null
  }
};

// Facilities Data
const facilities = {
  'FAC-001': {
    id: 'FAC-001',
    name: 'STRATOS Facility',
    location: 'Houston, Texas, USA',
    type: 'LNG CO₂ Capture & Storage',
    capacity: '2.5M tonnes CO₂/year',
    status: 'Operational',
    commissioned: '2023-06-15',
    ownerId: 'USR-001'
  },
  'FAC-002': {
    id: 'FAC-002',
    name: 'Danish Facility',
    location: 'Copenhagen, Denmark',
    type: 'Industrial CO₂ Capture',
    capacity: '1.8M tonnes CO₂/year',
    status: 'Operational',
    commissioned: '2024-01-10',
    ownerId: 'USR-002'
  }
};

// Projects Data
const projects = {
  'PROJ-STRATOS-001': {
    id: 'PROJ-STRATOS-001',
    facilityId: 'FAC-001',
    name: 'STRATOS CCS Phase 1',
    methodology: 'VM0049',
    status: 'Active',
    verifierId: 'USR-003',
    startDate: '2024-01-01',
    currentPeriod: 'Q3 2025',
    totalCaptured: 1847500,
    totalVerified: 1754625,
    totalIssued: 1666494,
    bufferWithheld: 88131,
    insured: true,
    insurerId: 'USR-005'
  },
  'PROJ-DANISH-001': {
    id: 'PROJ-DANISH-001',
    facilityId: 'FAC-002',
    name: 'Copenhagen Carbon Initiative',
    methodology: 'VM0049',
    status: 'Active',
    verifierId: 'USR-003',
    startDate: '2024-02-01',
    currentPeriod: 'Q3 2025',
    totalCaptured: 1234000,
    totalVerified: 1172300,
    totalIssued: 1113885,
    bufferWithheld: 58415,
    insured: true,
    insurerId: 'USR-005'
  }
};

// User Assets (Credit Holdings)
const userAssets = {
  'USR-001': [ // STRATOS Owner
    { projectId: 'PROJ-STRATOS-001', vintage: 'Q3 2024', balance: 150000, status: 'Available', insured: true },
    { projectId: 'PROJ-STRATOS-001', vintage: 'Q2 2024', balance: 75000, status: 'Listed', insured: true },
    { projectId: 'PROJ-STRATOS-001', vintage: 'Q1 2024', balance: 50000, status: 'Available', insured: true }
  ],
  'USR-002': [ // Danish Owner
    { projectId: 'PROJ-DANISH-001', vintage: 'Q3 2024', balance: 100000, status: 'Available', insured: true },
    { projectId: 'PROJ-DANISH-001', vintage: 'Q2 2024', balance: 50000, status: 'Listed', insured: true }
  ],
  'USR-004': [ // Buyer
    { projectId: 'PROJ-STRATOS-001', vintage: 'Q2 2024', balance: 50000, status: 'Held', insured: true },
    { projectId: 'PROJ-DANISH-001', vintage: 'Q2 2024', balance: 25000, status: 'Held', insured: true },
    { projectId: 'PROJ-STRATOS-001', vintage: 'Q1 2024', balance: 0, status: 'Retired', insured: true, retiredDate: '2024-08-15', certificateId: 'CERT-001' }
  ]
};

// Transaction History
const allTransactions = {
  'USR-001': [
    { id: 'TXN-001', date: '2024-10-10 16:18:33', type: 'Mint', amount: 418120, projectId: 'PROJ-STRATOS-001', vintage: 'Q3 2024', hash: '0x3d6a9c2f5e8b1d4a7c9f...', status: 'Completed' },
    { id: 'TXN-002', date: '2024-10-08 14:55:27', type: 'List', amount: 300000, price: 45, projectId: 'PROJ-STRATOS-001', vintage: 'Q3 2024', hash: '0x4a7c9d2e5f8b1c3a6d9e...', status: 'Completed' },
    { id: 'TXN-003', date: '2024-09-12 09:33:48', type: 'Transfer', amount: 50000, to: 'TechCorp Sustainability', projectId: 'PROJ-STRATOS-001', vintage: 'Q2 2024', hash: '0x8e2c5a7d9f1b3e6c8a2d...', status: 'Completed' },
    { id: 'TXN-004', date: '2024-07-08 15:22:11', type: 'Mint', amount: 425780, projectId: 'PROJ-STRATOS-001', vintage: 'Q2 2024', hash: '0x1f4b7e9c2a5d8f3b6e9c...', status: 'Completed' },
    { id: 'TXN-005', date: '2024-04-05 16:45:33', type: 'Mint', amount: 412350, projectId: 'PROJ-STRATOS-001', vintage: 'Q1 2024', hash: '0x5c8e2a4f7d1b9e3c6a8d...', status: 'Completed' }
  ],
  'USR-002': [
    { id: 'TXN-006', date: '2024-10-12 12:28:17', type: 'Mint', amount: 282890, projectId: 'PROJ-DANISH-001', vintage: 'Q3 2024', hash: '0x1b4e7c9a2d5f8b3e6c9a...', status: 'Completed' },
    { id: 'TXN-007', date: '2024-08-22 15:42:31', type: 'Transfer', amount: 75000, to: 'Nordic Sustainability Fund', projectId: 'PROJ-DANISH-001', vintage: 'Q2 2024', hash: '0x8e1c4a7d9f2b5e8c3a6d...', status: 'Completed' },
    { id: 'TXN-008', date: '2024-07-15 13:35:44', type: 'Mint', amount: 275450, projectId: 'PROJ-DANISH-001', vintage: 'Q2 2024', hash: '0x7c9a2f5d8b1e4c7a9f2d...', status: 'Completed' }
  ],
  'USR-003': [
    { id: 'TXN-009', date: '2024-10-10 16:18:00', type: 'Verification', projectId: 'PROJ-STRATOS-001', period: 'Q3 2024', verified: 418120, status: 'Approved' },
    { id: 'TXN-010', date: '2024-10-12 12:28:00', type: 'Verification', projectId: 'PROJ-DANISH-001', period: 'Q3 2024', verified: 282890, status: 'Approved' },
    { id: 'TXN-011', date: '2024-07-08 15:22:00', type: 'Verification', projectId: 'PROJ-STRATOS-001', period: 'Q2 2024', verified: 425780, status: 'Approved' }
  ],
  'USR-004': [
    { id: 'TXN-012', date: '2024-09-12 09:33:48', type: 'Purchase', amount: 50000, from: 'STRATOS Energy LLC', price: 45, projectId: 'PROJ-STRATOS-001', vintage: 'Q2 2024', hash: '0x8e2c5a7d9f1b3e6c8a2d...', status: 'Completed' },
    { id: 'TXN-013', date: '2024-08-22 15:42:31', type: 'Purchase', amount: 25000, from: 'Danish Carbon Solutions', price: 48, projectId: 'PROJ-DANISH-001', vintage: 'Q2 2024', hash: '0x8e1c4a7d9f2b5e8c3a6d...', status: 'Completed' },
    { id: 'TXN-014', date: '2024-08-15 13:47:55', type: 'Retirement', amount: 25000, projectId: 'PROJ-STRATOS-001', purpose: 'FY2024 Scope 1 Offset', certificateId: 'CERT-001', hash: '0x6c9a2e5f8d1b4c7a9e2f...', status: 'Completed' }
  ],
  'USR-005': [
    { id: 'TXN-015', date: '2024-10-13 11:20:15', type: 'Insurance', projectId: 'PROJ-STRATOS-001', coverage: 50000000, premium: 125000, status: 'Active' },
    { id: 'TXN-016', date: '2024-07-16 09:18:56', type: 'Insurance', projectId: 'PROJ-DANISH-001', coverage: 35000000, premium: 87500, status: 'Active' }
  ]
};

// Notifications
const userNotifications = {
  'USR-001': [
    { id: 'NOT-001', type: 'success', message: 'Q3 2024 verification approved - 418,120 CITs minted', date: '2024-10-10', read: false },
    { id: 'NOT-002', type: 'info', message: '50,000 CITs sold to TechCorp Sustainability', date: '2024-09-12', read: false },
    { id: 'NOT-003', type: 'warning', message: 'MRV data submission due for Q4 2024', date: '2024-10-05', read: true }
  ],
  'USR-003': [
    { id: 'NOT-004', type: 'alert', message: 'New verification request: STRATOS Q4 2024', date: '2024-11-01', read: false },
    { id: 'NOT-005', type: 'info', message: 'Document uploaded for PROJ-DANISH-001', date: '2024-10-15', read: true }
  ],
  'USR-004': [
    { id: 'NOT-006', type: 'success', message: 'Purchase confirmed: 50,000 CITs from STRATOS', date: '2024-09-12', read: false },
    { id: 'NOT-007', type: 'success', message: 'Retirement certificate issued: CERT-001', date: '2024-08-15', read: true }
  ]
};

// Marketplace Listings
const marketplaceListings = [
  {
    id: 'LIST-001',
    ownerId: 'USR-001',
    projectId: 'PROJ-STRATOS-001',
    vintage: 'Q3 2024',
    quantity: 150000,
    available: 150000,
    pricePerTonne: 45,
    insured: true,
    rating: 'AAA',
    listedDate: '2024-10-08'
  },
  {
    id: 'LIST-002',
    ownerId: 'USR-002',
    projectId: 'PROJ-DANISH-001',
    vintage: 'Q3 2024',
    quantity: 100000,
    available: 100000,
    pricePerTonne: 48,
    insured: true,
    rating: 'AAA',
    listedDate: '2024-10-12'
  },
  {
    id: 'LIST-003',
    ownerId: 'USR-001',
    projectId: 'PROJ-STRATOS-001',
    vintage: 'Q2 2024',
    quantity: 75000,
    available: 50000,
    pricePerTonne: 43,
    insured: true,
    rating: 'AAA',
    listedDate: '2024-07-10'
  }
];

// ==================== MAIN APP COMPONENT ====================

export default function ACIPlatform() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogin = (email, password) => {
    const user = mockUsers[email];
    if (user && user.password === password) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentView('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        user={currentUser} 
        onLogout={handleLogout}
        notifications={userNotifications[currentUser.id] || []}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          user={currentUser} 
          currentView={currentView}
          setCurrentView={setCurrentView}
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentView === 'dashboard' && (
            <Dashboard user={currentUser} />
          )}
          {currentView === 'projects' && (
            <ProjectsView user={currentUser} />
          )}
          {currentView === 'verification' && currentUser.role === 'verifier' && (
            <VerificationQueue user={currentUser} />
          )}
          {currentView === 'marketplace' && (
            <MarketplaceView user={currentUser} />
          )}
          {currentView === 'portfolio' && (
            <PortfolioView user={currentUser} />
          )}
          {currentView === 'transactions' && (
            <TransactionHistory user={currentUser} />
          )}
          {currentView === 'insurance' && currentUser.role === 'insurer' && (
            <InsuranceView user={currentUser} />
          )}
        </main>
      </div>
    </div>
  );
}

// ==================== LOGIN PAGE ====================

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(email, password);
    if (!success) {
      setError('Invalid credentials. Try: owner@stratos.com / demo123');
    }
  };

  const demoAccounts = [
    { email: 'owner@stratos.com', role: 'Project Owner', org: 'STRATOS Energy' },
    { email: 'owner@danish.com', role: 'Project Owner', org: 'Danish Carbon' },
    { email: 'verifier@scs.com', role: 'Verifier', org: 'SCS Global' },
    { email: 'buyer@techcorp.com', role: 'Buyer', org: 'TechCorp' },
    { email: 'insurer@lloyds.com', role: 'Insurer', org: "Lloyd's" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900">AlphaCarbon</h1>
              <p className="text-lg text-gray-600">Integrity Platform</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Blockchain-enabled MRV-to-market system for Carbon Impact Tokens
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Login Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-medium transition-all"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Demo environment • Password: <code className="bg-gray-100 px-2 py-1 rounded">demo123</code>
              </p>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Demo Accounts</h3>
            <p className="text-sm text-gray-600 mb-4">
              Click any account below to quick login
            </p>
            
            <div className="space-y-3">
              {demoAccounts.map((account, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword('demo123');
                  }}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{account.role}</div>
                      <div className="text-sm text-gray-500">{account.org}</div>
                    </div>
                    <div className="text-xs text-gray-400">{account.email}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <strong>Note:</strong> All accounts use password: <code>demo123</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <FeatureBadge icon={Shield} text="Blockchain Verified" />
          <FeatureBadge icon={CheckCircle} text="VM0049 Compliant" />
          <FeatureBadge icon={Lock} text="Secure & Transparent" />
          <FeatureBadge icon={TrendingUp} text="Real-time Tracking" />
        </div>
      </div>
    </div>
  );
}

function FeatureBadge({ icon: Icon, text }) {
  return (
    <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
      <Icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
      <div className="text-sm font-medium text-gray-700">{text}</div>
    </div>
  );
}

// ==================== HEADER ====================

function Header({ user, onLogout, notifications, showNotifications, setShowNotifications }) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ACIP</h1>
                <p className="text-xs text-gray-500">AlphaCarbon Platform</p>
              </div>
            </div>
            
            <div className="ml-8 px-3 py-1 bg-green-50 border border-green-200 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-700">Ethereum L2 (Polygon)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notif.read ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              notif.type === 'success' ? 'bg-green-100' :
                              notif.type === 'alert' ? 'bg-red-100' :
                              notif.type === 'warning' ? 'bg-orange-100' : 'bg-blue-100'
                            }`}>
                              <Bell className={`w-4 h-4 ${
                                notif.type === 'success' ? 'text-green-600' :
                                notif.type === 'alert' ? 'text-red-600' :
                                notif.type === 'warning' ? 'text-orange-600' : 'text-blue-600'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{notif.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.date}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.organization}</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <button
                onClick={onLogout}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ==================== SIDEBAR ====================

function Sidebar({ user, currentView, setCurrentView }) {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', roles: ['owner', 'verifier', 'buyer', 'insurer'] },
    { id: 'projects', icon: Building2, label: 'Projects', roles: ['owner', 'verifier'] },
    { id: 'verification', icon: CheckCircle, label: 'Verification Queue', roles: ['verifier'] },
    { id: 'marketplace', icon: ShoppingCart, label: 'Marketplace', roles: ['owner', 'buyer', 'insurer'] },
    { id: 'portfolio', icon: Package, label: 'My Portfolio', roles: ['owner', 'buyer'] },
    { id: 'transactions', icon: Activity, label: 'Transactions', roles: ['owner', 'verifier', 'buyer', 'insurer'] },
    { id: 'insurance', icon: Shield, label: 'Insurance', roles: ['insurer', 'owner'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {filteredMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === item.id
                ? 'bg-green-50 text-green-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Wallet Info */}
      <div className="p-4 border-t border-gray-200 mt-4">
        <div className="text-xs text-gray-500 mb-2">Connected Wallet</div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded flex items-center justify-center">
              <Lock className="w-3 h-3 text-white" />
            </div>
            <div className="text-xs font-medium text-gray-900">
              {user.wallet.substring(0, 6)}...{user.wallet.substring(user.wallet.length - 4)}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <CheckCircle className="w-3 h-3" />
            <span>KYC Verified</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ==================== DASHBOARD ====================

function Dashboard({ user }) {
  const userTransactions = allTransactions[user.id] || [];
  const userAsset = userAssets[user.id] || [];
  const userProjects = Object.values(projects).filter(p => 
    (user.role === 'owner' && facilities[p.facilityId]?.ownerId === user.id) ||
    (user.role === 'verifier' && p.verifierId === user.id)
  );

  const stats = calculateUserStats(user, userTransactions, userAsset, userProjects);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}</h2>
          <p className="text-gray-600">{getRoleDescription(user.role)}</p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Role-Specific Content */}
      {user.role === 'owner' && <OwnerDashboard user={user} projects={userProjects} />}
      {user.role === 'verifier' && <VerifierDashboard user={user} projects={userProjects} />}
      {user.role === 'buyer' && <BuyerDashboard user={user} assets={userAsset} />}
      {user.role === 'insurer' && <InsurerDashboard user={user} />}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, unit, change, color }) {
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
      {unit && <div className="text-sm text-gray-500 mt-1">{unit}</div>}
      {change && (
        <div className={`text-sm mt-2 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}% from last period
        </div>
      )}
    </div>
  );
}

// Continue in next part...
function calculateUserStats(user, transactions, assets, projects) {
  if (user.role === 'owner') {
    const totalIssued = projects.reduce((sum, p) => sum + p.totalIssued, 0);
    const totalAssets = assets.reduce((sum, a) => sum + a.balance, 0);
    const recentSales = transactions.filter(t => t.type === 'Transfer').length;
    return [
      { icon: Award, label: 'Total CITs Issued', value: totalIssued.toLocaleString(), unit: 'tokens', color: 'purple' },
      { icon: Package, label: 'Current Inventory', value: totalAssets.toLocaleString(), unit: 'tokens', color: 'blue' },
      { icon: TrendingUp, label: 'Recent Sales', value: recentSales, unit: 'transactions', color: 'green' },
      { icon: Building2, label: 'Active Projects', value: projects.length, unit: 'projects', color: 'orange' }
    ];
  } else if (user.role === 'verifier') {
    const totalVerified = transactions.filter(t => t.type === 'Verification').length;
    const pendingVerifications = 2; // Mock
    return [
      { icon: CheckCircle, label: 'Verifications Completed', value: totalVerified, unit: 'periods', color: 'green' },
      { icon: Clock, label: 'Pending Reviews', value: pendingVerifications, unit: 'projects', color: 'orange' },
      { icon: Building2, label: 'Assigned Projects', value: projects.length, unit: 'projects', color: 'blue' },
      { icon: FileText, label: 'Reports Issued', value: totalVerified, unit: 'reports', color: 'purple' }
    ];
  } else if (user.role === 'buyer') {
    const totalHeld = assets.filter(a => a.status === 'Held').reduce((sum, a) => sum + a.balance, 0);
    const totalRetired = assets.filter(a => a.status === 'Retired').reduce((sum, a) => sum + a.balance, 0);
    const purchases = transactions.filter(t => t.type === 'Purchase').length;
    return [
      { icon: Package, label: 'Credits Held', value: totalHeld.toLocaleString(), unit: 'tCO₂e', color: 'blue' },
      { icon: Archive, label: 'Credits Retired', value: totalRetired.toLocaleString(), unit: 'tCO₂e', color: 'purple' },
      { icon: ShoppingCart, label: 'Total Purchases', value: purchases, unit: 'transactions', color: 'green' },
      { icon: DollarSign, label: 'Portfolio Value', value: `$${(totalHeld * 45).toLocaleString()}`, unit: 'USD', color: 'orange' }
    ];
  } else if (user.role === 'insurer') {
    const activePolicies = transactions.filter(t => t.type === 'Insurance').length;
    const totalCoverage = transactions.filter(t => t.type === 'Insurance').reduce((sum, t) => sum + t.coverage, 0);
    return [
      { icon: Shield, label: 'Active Policies', value: activePolicies, unit: 'policies', color: 'blue' },
      { icon: DollarSign, label: 'Total Coverage', value: `$${(totalCoverage / 1000000).toFixed(0)}M`, unit: 'USD', color: 'green' },
      { icon: TrendingUp, label: 'Premium Income', value: '$212K', unit: 'YTD', color: 'purple' },
      { icon: AlertCircle, label: 'Claims Pending', value: 0, unit: 'claims', color: 'orange' }
    ];
  }
  return [];
}

function getRoleDescription(role) {
  const descriptions = {
    owner: 'Manage your facilities and carbon credit projects',
    verifier: 'Review and approve verification requests',
    buyer: 'Browse and purchase verified carbon credits',
    insurer: 'Underwrite policies and manage risk exposure'
  };
  return descriptions[role] || '';
}

// Owner Dashboard
function OwnerDashboard({ user, projects }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Projects</h3>
        <div className="space-y-4">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {(allTransactions[user.id] || []).slice(0, 5).map(tx => (
            <ActivityItem key={tx.id} transaction={tx} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Verifier Dashboard
function VerifierDashboard({ user, projects }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Verifications</h3>
        <div className="space-y-3">
          <div className="p-4 border-2 border-orange-200 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">STRATOS CCS Phase 1 - Q4 2024</div>
                <div className="text-sm text-gray-600 mt-1">Captured: 245,000 tCO₂e • Submitted: 2024-11-01</div>
              </div>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium text-sm">
                Review Now
              </button>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Copenhagen Carbon Initiative - Q4 2024</div>
                <div className="text-sm text-gray-600 mt-1">Captured: 62,000 tCO₂e • Submitted: 2024-11-02</div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm">
                Review Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Projects</h3>
        <div className="space-y-3">
          {projects.map(project => (
            <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{project.name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {facilities[project.facilityId]?.name} • {project.methodology}
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {project.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Buyer Dashboard
function BuyerDashboard({ user, assets }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Holdings</h3>
        <div className="space-y-3">
          {assets.filter(a => a.status !== 'Retired').map((asset, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{projects[asset.projectId]?.name}</div>
                  <div className="text-sm text-gray-600 mt-1">Vintage: {asset.vintage} • {asset.balance.toLocaleString()} tCO₂e</div>
                </div>
                <div className="flex items-center gap-2">
                  {asset.insured && (
                    <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Insured
                    </div>
                  )}
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    asset.status === 'Held' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {asset.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Climate Impact</h3>
          <div className="text-3xl font-bold mb-2">
            {assets.filter(a => a.status === 'Retired').reduce((sum, a) => sum + a.balance, 0).toLocaleString()}
          </div>
          <div className="text-sm opacity-90">tonnes CO₂e retired</div>
          <div className="mt-4 text-sm opacity-75">
            Equivalent to taking 5,400 cars off the road for a year
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Browse Marketplace
            </button>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm flex items-center justify-center gap-2">
              <Archive className="w-4 h-4" />
              Retire Credits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Insurer Dashboard
function InsurerDashboard({ user }) {
  const policies = allTransactions[user.id] || [];
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Policies</h3>
        <div className="space-y-3">
          {policies.map(policy => (
            <div key={policy.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-medium text-gray-900">{projects[policy.projectId]?.name}</div>
                  <div className="text-sm text-gray-600 mt-1">Policy ID: {policy.id}</div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {policy.status}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Coverage</div>
                  <div className="font-medium text-gray-900">${(policy.coverage / 1000000).toFixed(1)}M</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Premium</div>
                  <div className="font-medium text-gray-900">${policy.premium.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Issue Date</div>
                  <div className="font-medium text-gray-900">{policy.date.split(' ')[0]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== CONTINUE WITH OTHER VIEWS ====================
// I'll continue with the remaining views in the next part of the code...

function ProjectCard({ project }) {
  const facility = facilities[project.facilityId];
  
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{project.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{facility?.name}</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          {project.status}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
        <div>
          <div className="text-xs text-gray-500">Total Issued</div>
          <div className="font-semibold text-gray-900">{project.totalIssued.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Current Period</div>
          <div className="font-semibold text-gray-900">{project.currentPeriod}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Methodology</div>
          <div className="font-semibold text-gray-900">{project.methodology}</div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ transaction }) {
  const getTypeColor = (type) => {
    if (type === 'Mint') return 'text-purple-600 bg-purple-100';
    if (type === 'Transfer') return 'text-green-600 bg-green-100';
    if (type === 'List') return 'text-blue-600 bg-blue-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
      <div className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(transaction.type)}`}>
        {transaction.type}
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-900">{transaction.amount?.toLocaleString()} CITs</div>
        <div className="text-xs text-gray-500">{transaction.date.split(' ')[0]}</div>
      </div>
      <CheckCircle className="w-4 h-4 text-green-600" />
    </div>
  );
}

// ==================== PROJECTS VIEW ====================

function ProjectsView({ user }) {
  const userProjects = Object.values(projects).filter(p => 
    facilities[p.facilityId]?.ownerId === user.id
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600">Manage your carbon capture projects</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Register New Project
        </button>
      </div>

      <div className="grid gap-6">
        {userProjects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                  <p className="text-gray-600 mt-1">{facilities[project.facilityId]?.name}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {facilities[project.facilityId]?.location}
                    </div>
                    <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {project.methodology}
                    </div>
                    {project.insured && (
                      <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Insured
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">
                {project.status}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">Total Captured</div>
                <div className="text-2xl font-bold text-blue-900">{project.totalCaptured.toLocaleString()}</div>
                <div className="text-xs text-blue-600 mt-1">tCO₂e</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-green-600 mb-1">Total Verified</div>
                <div className="text-2xl font-bold text-green-900">{project.totalVerified.toLocaleString()}</div>
                <div className="text-xs text-green-600 mt-1">tCO₂e</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-sm text-purple-600 mb-1">CITs Issued</div>
                <div className="text-2xl font-bold text-purple-900">{project.totalIssued.toLocaleString()}</div>
                <div className="text-xs text-purple-600 mt-1">tokens</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-sm text-orange-600 mb-1">Buffer Withheld</div>
                <div className="text-2xl font-bold text-orange-900">{project.bufferWithheld.toLocaleString()}</div>
                <div className="text-xs text-orange-600 mt-1">tCO₂e (5%)</div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Submit MRV Data
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm flex items-center gap-2">
                <Send className="w-4 h-4" />
                Request Verification
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== VERIFICATION QUEUE ====================

function VerificationQueue({ user }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Verification Queue</h2>
        <p className="text-gray-600">Review and approve carbon credit verification requests</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Reviews</h3>
        <div className="space-y-4">
          <VerificationQueueItem
            projectName="STRATOS CCS Phase 1"
            period="Q4 2024"
            captured={245000}
            submitted="2024-11-01"
            priority="high"
          />
          <VerificationQueueItem
            projectName="Copenhagen Carbon Initiative"
            period="Q4 2024"
            captured={62000}
            submitted="2024-11-02"
            priority="normal"
          />
        </div>
      </div>
    </div>
  );
}

function VerificationQueueItem({ projectName, period, captured, submitted, priority }) {
  return (
    <div className={`p-6 border-2 rounded-lg ${
      priority === 'high' ? 'border-orange-200 bg-orange-50' : 'border-gray-200 bg-white'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{projectName}</h4>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              Period: {period}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              Submitted: {submitted}
            </div>
          </div>
        </div>
        {priority === 'high' && (
          <div className="px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-medium">
            High Priority
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="p-3 bg-white rounded-lg border border-gray-200">
          <div className="text-xs text-gray-500">Captured</div>
          <div className="text-lg font-bold text-gray-900">{captured.toLocaleString()}</div>
          <div className="text-xs text-gray-500">tCO₂e</div>
        </div>
        <div className="p-3 bg-white rounded-lg border border-gray-200">
          <div className="text-xs text-gray-500">Est. Verified</div>
          <div className="text-lg font-bold text-green-900">{(captured * 0.95).toLocaleString()}</div>
          <div className="text-xs text-gray-500">tCO₂e</div>
        </div>
        <div className="p-3 bg-white rounded-lg border border-gray-200">
          <div className="text-xs text-gray-500">Est. Issued</div>
          <div className="text-lg font-bold text-purple-900">{(captured * 0.9025).toLocaleString()}</div>
          <div className="text-xs text-gray-500">CITs</div>
        </div>
        <div className="p-3 bg-white rounded-lg border border-gray-200">
          <div className="text-xs text-gray-500">Buffer (5%)</div>
          <div className="text-lg font-bold text-orange-900">{(captured * 0.0475).toLocaleString()}</div>
          <div className="text-xs text-gray-500">tCO₂e</div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Start Review
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2">
          <FileText className="w-4 h-4" />
          View Documents
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2">
          <Activity className="w-4 h-4" />
          View MRV Data
        </button>
      </div>
    </div>
  );
}

// ==================== MARKETPLACE VIEW ====================

function MarketplaceView({ user }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Marketplace</h2>
          <p className="text-gray-600">Browse and purchase verified carbon credits</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {marketplaceListings.map(listing => {
          const project = projects[listing.projectId];
          const facility = facilities[project.facilityId];
          
          return (
            <div key={listing.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{facility.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {project.methodology}
                    </div>
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
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Vintage:</span>
                  <span className="font-medium text-gray-900">{listing.vintage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Available:</span>
                  <span className="font-medium text-gray-900">{listing.available.toLocaleString()} tCO₂e</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Price per Tonne:</span>
                  <span className="text-xl font-bold text-green-600">${listing.pricePerTonne}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Purchase
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== PORTFOLIO VIEW ====================

function PortfolioView({ user }) {
  const assets = userAssets[user.id] || [];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Portfolio</h2>
          <p className="text-gray-600">Manage your carbon credit holdings</p>
        </div>
        {user.role === 'buyer' && (
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Retire Credits
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Holdings</h3>
        <div className="space-y-3">
          {assets.filter(a => a.status !== 'Retired').map((asset, idx) => {
            const project = projects[asset.projectId];
            const facility = facilities[project.facilityId];
            
            return (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
                      <p className="text-sm text-gray-600">{facility.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {asset.insured && (
                      <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Insured
                      </div>
                    )}
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      asset.status === 'Available' ? 'bg-green-100 text-green-700' :
                      asset.status === 'Listed' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {asset.status}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Balance</div>
                    <div className="text-lg font-bold text-gray-900">{asset.balance.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">tCO₂e</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Vintage</div>
                    <div className="text-lg font-bold text-gray-900">{asset.vintage}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Est. Value</div>
                    <div className="text-lg font-bold text-green-600">${(asset.balance * 45).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Actions</div>
                    <div className="flex gap-2 mt-1">
                      {user.role === 'owner' && asset.status === 'Available' && (
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">List</button>
                      )}
                      {user.role === 'buyer' && (
                        <>
                          <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">Retire</button>
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Transfer</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {user.role === 'buyer' && assets.some(a => a.status === 'Retired') && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Retirement Certificates</h3>
          <div className="space-y-3">
            {assets.filter(a => a.status === 'Retired').map((asset, idx) => {
              const project = projects[asset.projectId];
              
              return (
                <div key={idx} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {asset.balance.toLocaleString()} tCO₂e retired on {asset.retiredDate}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Certificate: {asset.certificateId}</div>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== TRANSACTION HISTORY ====================

function TransactionHistory({ user }) {
  const transactions = allTransactions[user.id] || [];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
          <p className="text-gray-600">Complete record of all your blockchain activities</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {tx.date.split(' ')[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    tx.type === 'Mint' ? 'bg-purple-100 text-purple-700' :
                    tx.type === 'Transfer' || tx.type === 'Purchase' ? 'bg-green-100 text-green-700' :
                    tx.type === 'Retirement' ? 'bg-red-100 text-red-700' :
                    tx.type === 'Verification' ? 'bg-blue-100 text-blue-700' :
                    tx.type === 'Insurance' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {tx.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {tx.projectId && projects[tx.projectId]?.name}
                  {tx.period && ` - ${tx.period}`}
                  {tx.vintage && ` (${tx.vintage})`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {tx.amount ? `${tx.amount.toLocaleString()} CITs` : 
                   tx.verified ? `${tx.verified.toLocaleString()} tCO₂e` :
                   tx.coverage ? `$${(tx.coverage / 1000000).toFixed(1)}M` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-700 font-medium">{tx.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {tx.hash && (
                    <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      <ExternalLink className="w-4 h-4" />
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==================== INSURANCE VIEW ====================

function InsuranceView({ user }) {
  const policies = allTransactions[user.id] || [];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Insurance Management</h2>
          <p className="text-gray-600">Underwrite and manage carbon credit insurance policies</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Policy
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-sm font-medium text-gray-500">Active Policies</h4>
          </div>
          <div className="text-2xl font-bold text-gray-900">{policies.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="text-sm font-medium text-gray-500">Total Coverage</h4>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${(policies.reduce((sum, p) => sum + p.coverage, 0) / 1000000).toFixed(0)}M
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="text-sm font-medium text-gray-500">Premium Income</h4>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${policies.reduce((sum, p) => sum + p.premium, 0).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Policy Portfolio</h3>
        <div className="space-y-4">
          {policies.map(policy => {
            const project = projects[policy.projectId];
            const facility = facilities[project.facilityId];
            
            return (
              <div key={policy.id} className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{project.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{facility.name} • {facility.location}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">Policy ID:</span>
                      <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{policy.id}</code>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {policy.status}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-blue-600 mb-1">Coverage Amount</div>
                    <div className="text-lg font-bold text-blue-900">${(policy.coverage / 1000000).toFixed(1)}M</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-xs text-green-600 mb-1">Premium</div>
                    <div className="text-lg font-bold text-green-900">${policy.premium.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-xs text-purple-600 mb-1">Issue Date</div>
                    <div className="text-sm font-bold text-purple-900">{policy.date.split(' ')[0]}</div>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="text-xs text-orange-600 mb-1">Term</div>
                    <div className="text-sm font-bold text-orange-900">24 months</div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Policy
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Documents
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
