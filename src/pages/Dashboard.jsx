import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import GenerateBuyerCode from '../components/GenerateBuyerCode';
import GenerateVendorCode from '../components/GenerateVendorCode';
import VendorMasterSheet from '../components/VendorMasterSheet';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('home');
  const [hoveredDeptItem, setHoveredDeptItem] = useState(null);
  const [stickySubMenu, setStickySubMenu] = useState(null);
  const [selectedSubMenuItem, setSelectedSubMenuItem] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showGenerateBuyerCode, setShowGenerateBuyerCode] = useState(false);
  const [showGenerateVendorCode, setShowGenerateVendorCode] = useState(false);
  const [showVendorMasterSheet, setShowVendorMasterSheet] = useState(false);
  
  const subMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    return [
      { id: 'home', label: 'Home' },
      { id: 'tasks', label: 'Tasks' },
      { id: 'department', label: 'Department' },
      { id: 'community', label: 'Community' }, // Add Community menu item
      { id: 'profile', label: 'Profile' },
    ];
  };

  const departmentItems = [
    { id: 'chd-code', label: 'CHD CODE CREATION', hasSubMenu: true },
    { id: 'chd-po', label: 'CHD PO ISSUE', hasSubMenu: true },
    { id: 'sourcing', label: 'SOURCING', hasSubMenu: true },
    { id: 'ims', label: 'IMS', hasSubMenu: true },
    { id: 'operations', label: 'OPERATIONS', hasSubMenu: true },
    { id: 'quality', label: 'TOTAL QUALITY MANAGEMENT', hasSubMenu: true },
    { id: 'designing', label: 'DESIGNING', hasSubMenu: true },
    { id: 'shipping', label: 'SHIPPING', hasSubMenu: true },
    { id: 'accounts', label:'ACCOUNTS', hasSubMenu: true },
    { id: 'hr', label: 'HR', hasSubMenu: true },
  ];

  const subMenuItems = {
    'chd-code': [
      { id: 'buyer', label: 'BUYER' },
      { id: 'vendor', label: 'VENDOR' },
      { id: 'factory', label: 'FACTORY' },
    ],
    'chd-po': [
      { id: 'generate-po', label: 'GENERATE PO' },
      { id: 'po-master', label: 'PO MASTER' },
    ],
    'ims': [
      { id: 'inward-store-sheet', label: 'INWARD STORE SHEET' },
      { id: 'outward-store-sheet', label: 'OUTWARD STORE SHEET' },
    ],
    'sourcing': [
      { id: 'yarn', label: 'YARN' },
      { id: 'recycled-yarn', label: 'RECYCLED YARN' },
      { id: 'fabric', label: 'FABRIC' },
      { id: 'dye', label: 'DYE' },
      { id: 'knitting', label: 'KNITTING' },
      { id: 'quilting', label: 'QUILTING' },
      { id: 'embroidery', label: 'EMBROIDERY' },
      { id: 'cut-sew', label: 'CUT & SEW' },
      { id: 'artworks-trims', label: 'ARTWORKS AND TRIMS' },
      { id: 'packaging-material', label: 'PACKAGING MATERIAL' },
      { id: 'factory-supplies', label: 'FACTORY SUPPLIES' },
      { id: 'fiber', label: 'FIBER' },
      { id: 'weaving', label: 'WEAVING' },
      { id: 'braided', label: 'BRAIDED' },
      { id: 'printing', label: 'PRINTING' },
      { id: 'job-card-service', label: 'JOB CARD SERVICE' },
      { id: 'tufting', label: 'TUFTING' },
      { id: 'carpet', label: 'CARPET' },
      { id: 'manpower', label: 'MANPOWER' },
    ],
    'operations': [
      { id: 'production', label: 'PRODUCTION' },
      { id: 'merchandising', label: 'MERCHANDISING' },
      { id: 'sampling', label: 'SAMPLING' },
    ],
    'quality': [
      { id: 'goods-receipt-note', label: 'GOODS RECEIPT NOTE' },
      { id: 'quality-formats', label: 'QUALITY FORMATS' },
      { id: 'prod-quality-formats', label: 'PROD-QUALITY FORMATS' },
    ],
    'designing': [
      { id: 'product-category', label: 'PRODUCT CATEGORY' },
    ],
    'shipping': [
      { id: 'shipped-goods', label: 'SHIPPED GOODS' },
      { id: 'shipping-master', label: 'SHIPPING MASTER' },
    ],
    'accounts': [
      { id: 'accounts-tally', label: 'ACCOUNTS TALLY' },
      { id: 'sbi-4034', label: 'SBI-4034' },
      { id: 'cashbook', label: 'CASHBOOK' },
    ],
    'hr': [
      { id: 'leave-application', label: 'LEAVE APPLICATION' },
      { id: 'personal-aspiration', label: 'PERSONAL ASPIRATION' },
      { id: 'advance-request', label: 'ADVANCE REQUEST' },
      { id: 'exit-interview', label: 'EXIT INTERVIEW' },
      { id: 'attendance', label: 'ATTENDANCE' },
    ],
  };

  // Define button configurations for each submenu item
  const subMenuButtonConfigs = {
    // SOURCING buttons
    'yarn': [
      'Acrylic Yarn',
      'Fine Count UV 24Ne to 60Ne',
      'Rafiya Yarn',
      'Viscose Yarn',
      'Fancy Yarn',
      'Hemp Yarn',
      'Roto Yarn',
      'Wool Yarn',
      'Chenille Yarn',
      'Jute Yarn',
      'Silk Yarn',
      'Pet Yarn',
      'Linen Yarn',
      'Slub Yarn',
      'Polyester Yarn',
      'Coarse Count'
    ],
    'recycled-yarn': [
      'Non UV Natural',
      'Fine Count 24Ne to 40Ne',
      'Coarse Count 2Ne to 20Ne',
      'Melange Yarn'
    ],
    'fabric': [
      'Recycled Fabric',
      'Non Wooven',
      'Designer Fabric',
      'Plain Fabric',
      'Fancy Fabric'
    ],
    'dye': [
      'Natural Yarn',
      'Artificial Yarn',
      'Artificial Fabric',
      'Natural Fabric',
      'Cotton Bathmat',
      'Polyester Bathmat',
      'StoneWash'
    ],
    'knitting': [
      'Crochet',
      'Circular',
      'Flat Bed'
    ],
    'quilting': [
      'Single Needle',
      'Multi Needle + Embroidery',
      'Multi Needle',
      'Hand Quilting'
    ],
    'embroidery': [
      'Rice Stitch',
      'Dori',
      'Multi thread',
      'Single thread',
      'Aari embroidery'
    ],
    'cut-sew': [
      'Machine/Material Supplier',
      'Stiching Centre',
      'Stiching Contractor',
      'Complete Packaging Unit'
    ],
    'artworks-trims': [
      'Tyvek Labels',
      'Taffta Labels',
      'Woven Labels',
      'Embossing Labels',
      'Insert Cards',
      'Belly Bands',
      'Ribbon',
      'Carton Marking'
    ],
    'packaging-material': [
      'Zip',
      'Cartoon',
      'Tape',
      'Packaging Accessories'
    ],
    'factory-supplies': [
      'Admin Stationery',
      'Sharp Tools',
      'Quality Accessories',
      'Maintenance '
    ],
    'fiber': [
      'Foam',
      'Fiber Sheets',
      'Only Bale',
      'Virgin',
      'Mix',
      'Conjugated'
    ],
    'weaving': [
      'Frameloom',
      'Powerloom',
      'Dobby',
      'Jumbo Jacquard',
      'Pitloom',
      'Shuttleless',
      'Jacquard',
      'Airjet'
    ],
    'braided': [
      'Hand Braided',
      'Machine Braided'
    ],
    'printing': [
      'Screen Print',
      'Lamination Polyster Digital Print',
      'Rotary Print',
      'Block Print',
      'Cotton Digital Print'
    ],
    'job-card-service': [
      'Flocking',
      'Applique',
      'Gel Backing',
      'Latex',
      'Tassle Making',
      'Lamination',
      'TPR',
      'Niwar Backing',
      'Niwar',
      'Beads Work'
    ],
    'tufting': [
      'Table Tufting',
      'Multi Needle',
      'Computerized'
    ],
    'carpet': [
      'Hand tufting',
      'Machine Made - Vandewiele',
      'Broadloom'
    ],
    'manpower': [
      'Marketing',
      'Production Operations',
      'HR',
      'Security',
      'Sales',
      'Quality Operations',
      'Auditory Compliances',
      'Trader',
      'Designing',
      'Resarch & Development',
      'Merchendising',
      'IT',
      'Accounts',
      'Machine Manufacturing',
      'Management'
    ],

    // OPERATIONS buttons
    'production': [
      'CHD/002A/1/JUTE PLACEMAT',
      'CHD/003A/3/QUILTED PILLOW',
      'CHD/005A/5/ RECYCLE WOVEN RUG',
      'CHD/002A/6/BEIGE&OFFWHITE RUG-3047'
    ],
    'merchandising': [
      
    ],
    'sampling': [
      
    ],

    // QUALITY buttons
    'goods-receipt-note': [
      'Generate GRN'
    ],
    'quality-formats': [
      'FABRIC CHECKING REPORT',
      'CUTTING INSPECTION REPORT',
      'FIRST PCS REPORT',
      'SHARP TOOLS',
      'CARTON AUDIT REPORT',
      'STITCHING INSPECTION REPORT',
      'FINAL RANDOM INSPECTION REPORT',
      'PACKING INSPECTION REPORT',
      'METAL DETECTION CALLIBRATION'
    ],
    'prod-quality-formats': [
      'PROD-CUTTING INSPECTION REPORT',
      'PROD-CARTON INSPECTION REPORT',
      'PROD-PACKING INSPECTION REPORT',
      'PROD-STITCHING INSPECTION REPORT'
    ],

    // DESIGNING buttons
    'product-category': [
      'Product Category'
    ],

    // SHIPPING buttons
    'shipped-goods': [
      'Shipped Goods'
    ],
    'shipping-master': [
      'Shipping Master'
    ],

    // ACCOUNTS buttons
    'accounts-tally': [
      'CREDITORS LIST',
      'DEBITORS LIST'
    ],
    'sbi-4034': [
      'SBI-4034'
    ],
    'cashbook': [
      'CASHBOOK'
    ],

    // HR buttons
    'leave-application': [
      'LEAVE APPLICATION-FORM',
      'LEAVE APPLICATION-RESPONSES'
    ],
    'personal-aspiration': [
      'PERSONAL ASPIRATION-FORM',
      'PERSONAL ASPIRATION-MASTER'
    ],
    'advance-request': [
      'ADVANCE REQUEST-FORM',
      'ADVANCE REQUEST-MASTER'
    ],
    'exit-interview': [
      'EXIT INTERVIEW-FORM',
      'EXIT INTERVIEW-MASTER'
    ],
    'attendance': [
      'ATTENDANCE'
    ]
  };

  // Handle hover to show submenu temporarily
  const handleDeptItemHover = (itemId) => {
    if (departmentItems.find(item => item.id === itemId)?.hasSubMenu) {
      setHoveredDeptItem(itemId);
    }
  };

  // Handle mouse leave to hide temporary submenu
  const handleDeptItemLeave = () => {
    setHoveredDeptItem(null);
  };

  // Handle click to make submenu sticky or select department
  const handleDeptItemClick = (itemId) => {
    const item = departmentItems.find(item => item.id === itemId);
    
    if (item?.hasSubMenu) {
      // If item has submenu, make it sticky
      setStickySubMenu(stickySubMenu === itemId ? null : itemId);
      setSelectedDepartment(null);
    } else {
      // If item doesn't have submenu, select it
      setSelectedDepartment(itemId);
      setStickySubMenu(null);
      setSelectedSubMenuItem(null);
    }
  };

  // Handle submenu item click - hide both menus and show fullscreen content
  const handleSubItemClick = (subItemId) => {
    setSelectedSubMenuItem(subItemId);
    setStickySubMenu(null);
    setHoveredDeptItem(null);
    setSelectedDepartment(null);
  };

  // Handle back to departments
  const handleBackToDepartments = () => {
    setSelectedSubMenuItem(null);
    setSelectedDepartment(null);
    setStickySubMenu(null);
    setHoveredDeptItem(null);
    setShowGenerateBuyerCode(false);
    setShowGenerateVendorCode(false);
    setShowVendorMasterSheet(false);
  };

  // Determine if submenu should be shown (either hovered or sticky)
  const shouldShowSubMenu = (itemId) => {
    return hoveredDeptItem === itemId || stickySubMenu === itemId;
  };

  // Get department name from item ID
  const getDepartmentName = (itemId) => {
    const dept = departmentItems.find(item => item.id === itemId);
    return dept ? dept.label : '';
  };

  // Generic multi-button content renderer
  const renderMultiButtonContent = (title, description, buttons) => (
    <div className="fullscreen-content">
      <div className="content-header">
        <button className="back-button" onClick={handleBackToDepartments}>
          ← Back to Departments
        </button>
        <h1 className="fullscreen-title">{title}</h1>
        <p className="fullscreen-description">{description}</p>
      </div>
      <div className="fullscreen-buttons multi-button-grid">
        {buttons.map((buttonLabel, index) => (
          <button key={index} className="fullscreen-action-button primary">
            <div className="button-content">
              <span className="button-title">{buttonLabel}</span>
              <span className="button-subtitle">Access {buttonLabel.toLowerCase()}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // Content renderers for CHD CODE CREATION
  const renderBuyerContent = () => (
    <div className="fullscreen-content">
      <div className="content-header">
        <button className="back-button" onClick={handleBackToDepartments}>
          ← Back to Departments
        </button>
        <h1 className="fullscreen-title">Buyer Management</h1>
        <p className="fullscreen-description">Generate buyer codes and manage buyer master sheets</p>
      </div>
      <div className="fullscreen-buttons">
        <button 
          className="fullscreen-action-button primary"
          onClick={() => setShowGenerateBuyerCode(true)}
        >
          <div className="button-content">
            <span className="button-title">GENERATE BUYER CODE</span>
            <span className="button-subtitle">Create new buyer codes for procurement</span>
          </div>
        </button>
        <button className="fullscreen-action-button secondary">
          <div className="button-content">
            <span className="button-title">BUYER MASTER SHEET</span>
            <span className="button-subtitle">View and manage buyer master data</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderVendorContent = () => (
    <div className="fullscreen-content">
      <div className="content-header">
        <button className="back-button" onClick={handleBackToDepartments}>
          ← Back to Departments
        </button>
        <h1 className="fullscreen-title">Vendor Management</h1>
        <p className="fullscreen-description">Generate vendor codes and manage vendor master sheets</p>
      </div>
      <div className="fullscreen-buttons">
        <button 
          className="fullscreen-action-button primary"
          onClick={() => setShowGenerateVendorCode(true)}
        >
          <div className="button-content">
            <span className="button-title">GENERATE VENDOR CODE</span>
            <span className="button-subtitle">Create new vendor codes for suppliers</span>
          </div>
        </button>
        <button 
          className="fullscreen-action-button secondary"
          onClick={() => setShowVendorMasterSheet(true)}
        >
          <div className="button-content">
            <span className="button-title">VENDOR MASTER SHEET</span>
            <span className="button-subtitle">View and manage vendor master data</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderFactoryContent = () => (
    <div className="fullscreen-content">
      <div className="content-header">
        <button className="back-button" onClick={handleBackToDepartments}>
          ← Back to Departments
        </button>
        <h1 className="fullscreen-title">Factory Management</h1>
        <p className="fullscreen-description">Generate factory codes and manage factory master sheets</p>
      </div>
      <div className="fullscreen-buttons">
        <button className="fullscreen-action-button primary">
          <div className="button-content">
            <span className="button-title">GENERATE FACTORY CODE</span>
            <span className="button-subtitle">Create new factory codes for manufacturing</span>
          </div>
        </button>
        <button className="fullscreen-action-button secondary">
          <div className="button-content">
            <span className="button-title">FACTORY MASTER SHEET</span>
            <span className="button-subtitle">View and manage factory master data</span>
          </div>
        </button>
      </div>
    </div>
  );

  // Content renderers for CHD PO ISSUE  
  const renderGeneratePOContent = () => (
    <div className="fullscreen-content">
      <div className="content-header">
        <button className="back-button" onClick={handleBackToDepartments}>
          ← Back to Departments
        </button>
        <h1 className="fullscreen-title">Generate PO</h1>
        <p className="fullscreen-description">Create and manage purchase orders</p>
      </div>
      <div className="fullscreen-buttons">
        <button className="fullscreen-action-button primary">
          <div className="button-content">
            <span className="button-title">GENERATE PO</span>
            <span className="button-subtitle">Create new purchase orders</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderPOMasterContent = () => (
    <div className="fullscreen-content">
      <div className="content-header">
        <button className="back-button" onClick={handleBackToDepartments}>
          ← Back to Departments
        </button>
        <h1 className="fullscreen-title">PO Master</h1>
        <p className="fullscreen-description">View and manage purchase order master data</p>
      </div>
      <div className="fullscreen-buttons">
        <button className="fullscreen-action-button primary">
          <div className="button-content">
            <span className="button-title">PO MASTER</span>
            <span className="button-subtitle">Access purchase order master sheet</span>
          </div>
        </button>
      </div>
    </div>
  );

  // Content renderers for IMS
  const renderInwardStoreSheetContent = () => (
    <div className="fullscreen-content">
      <div className="content-header">
        <button className="back-button" onClick={handleBackToDepartments}>
          ← Back to Departments
        </button>
        <h1 className="fullscreen-title">Inward Store Sheet</h1>
        <p className="fullscreen-description">Manage incoming inventory and stock receipts</p>
      </div>
      <div className="fullscreen-buttons">
        <button className="fullscreen-action-button primary">
          <div className="button-content">
            <span className="button-title">INWARD STORE SHEET</span>
            <span className="button-subtitle">Track and manage incoming stock</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderOutwardStoreSheetContent = () => (
    <div className="fullscreen-content">
      <div className="content-header">
        <button className="back-button" onClick={handleBackToDepartments}>
          ← Back to Departments
        </button>
        <h1 className="fullscreen-title">Outward Store Sheet</h1>
        <p className="fullscreen-description">Manage outgoing inventory and stock dispatch</p>
      </div>
      <div className="fullscreen-buttons">
        <button className="fullscreen-action-button primary">
          <div className="button-content">
            <span className="button-title">OUTWARD STORE SHEET</span>
            <span className="button-subtitle">Track and manage outgoing stock</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderDepartmentMainContent = () => {
    if (showGenerateBuyerCode) {
      return (
        <GenerateBuyerCode 
          onBack={() => setShowGenerateBuyerCode(false)} 
        />
      );
    }
    
    if (showGenerateVendorCode) {
      return (
        <GenerateVendorCode 
          onBack={() => setShowGenerateVendorCode(false)} 
        />
      );
    }

    if (showVendorMasterSheet) {
      return (
        <VendorMasterSheet 
          onBack={() => setShowVendorMasterSheet(false)} 
        />
      );
    }
    
    // Handle specific content for CHD CODE CREATION
    if (selectedSubMenuItem === 'buyer') {
      return renderBuyerContent();
    }
    if (selectedSubMenuItem === 'vendor') {
      return renderVendorContent();
    }
    if (selectedSubMenuItem === 'factory') {
      return renderFactoryContent();
    }

    // Handle specific content for CHD PO ISSUE
    if (selectedSubMenuItem === 'generate-po') {
      return renderGeneratePOContent();
    }
    if (selectedSubMenuItem === 'po-master') {
      return renderPOMasterContent();
    }

    // Handle specific content for IMS
    if (selectedSubMenuItem === 'inward-store-sheet') {
      return renderInwardStoreSheetContent();
    }
    if (selectedSubMenuItem === 'outward-store-sheet') {
      return renderOutwardStoreSheetContent();
    }

    // Handle all other submenu items with multi-button content
    if (selectedSubMenuItem && subMenuButtonConfigs[selectedSubMenuItem]) {
      // Find the submenu item label
      let subMenuLabel = '';
      Object.values(subMenuItems).forEach(items => {
        const found = items.find(item => item.id === selectedSubMenuItem);
        if (found) {
          subMenuLabel = found.label;
        }
      });

      const buttons = subMenuButtonConfigs[selectedSubMenuItem];
      const description = `Manage ${subMenuLabel.toLowerCase()} operations and related activities`;
      
      return renderMultiButtonContent(subMenuLabel, description, buttons);
    }
  };

  const renderDepartmentContent = () => {
    // If a submenu item is selected, show fullscreen content
    if (selectedSubMenuItem || showGenerateBuyerCode || showGenerateVendorCode || showVendorMasterSheet) {
      return renderDepartmentMainContent();
    }

    return (
      <div className="department-layout">
        {/* Left Department Menu */}
        <div className="department-menu">
          <h3 className="dept-menu-title">Department Sections</h3>
          <div className="dept-menu-list">
            {departmentItems.map((deptItem) => (
              <div
                key={deptItem.id}
                className="dept-menu-item-wrapper"
                onMouseEnter={() => handleDeptItemHover(deptItem.id)}
                onMouseLeave={handleDeptItemLeave}
              >
                <div 
                  className={`dept-menu-item ${
                    selectedDepartment === deptItem.id || stickySubMenu === deptItem.id ? 'active' : ''
                  }`}
                  onClick={() => handleDeptItemClick(deptItem.id)}
                >
                  <span className="dept-menu-label">{deptItem.label}</span>
                  {deptItem.hasSubMenu && (
                    <span className={`forward-arrow ${stickySubMenu === deptItem.id ? 'active' : ''}`}>
                      {stickySubMenu === deptItem.id ? '▼' : '→'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submenu - appears as a separate menu panel on hover or when sticky */}
        {Object.keys(subMenuItems).map(deptId => 
          shouldShowSubMenu(deptId) && (
            <div 
              key={deptId}
              className={`department-submenu-panel ${stickySubMenu === deptId ? 'sticky' : 'hover'}`} 
              ref={subMenuRef}
              onMouseEnter={() => setHoveredDeptItem(deptId)}
              onMouseLeave={handleDeptItemLeave}
            >
              <h3 className="dept-menu-title">
                {getDepartmentName(deptId)} Options
                {stickySubMenu === deptId && <span className="sticky-indicator">📌</span>}
              </h3>
              <div className="dept-menu-list">
                {subMenuItems[deptId].map((subItem) => (
                  <div
                    key={subItem.id}
                    className="dept-menu-item-wrapper"
                  >
                    <div 
                      className="dept-menu-item submenu-item"
                      onClick={() => handleSubItemClick(subItem.id)}
                    >
                      <span className="dept-menu-label">{subItem.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (activePage === 'home') {
      return (
        <div className="dashboard-content">
          <h1 className="dashboard-title">
            Welcome back, {user?.name || user?.email}!
          </h1>
          <p className="dashboard-subtitle">
            {user?.role === 'master-admin' && 'You have full administrative access to the system.'}
            {user?.role === 'manager' && 'Manage your tenants efficiently.'}
            {user?.role === 'tenant' && 'View your information and tasks here.'}
          </p>
        </div>
      );
    }

    if (activePage === 'department') {
      return renderDepartmentContent();
    }

    if (activePage === 'community') {
      // Navigate to community page instead of rendering inline
      navigate('/community');
      return null;
    }

    return (
      <div className="dashboard-content">
        <h1 className="dashboard-title">{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h1>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-wrapper">
            <div className="logo-icon-dash">B</div>
            <span className="logo-text-dash">Binder</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {getMenuItems().map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => {
                if (item.id === 'community') {
                  // Navigate to community page
                  navigate('/community');
                } else {
                  setActivePage(item.id);
                  if (item.id !== 'department') {
                    setSelectedDepartment(null);
                    setSelectedSubMenuItem(null);
                    setStickySubMenu(null);
                    setHoveredDeptItem(null);
                    setShowGenerateBuyerCode(false);
                    setShowGenerateVendorCode(false);
                    setShowVendorMasterSheet(false);
                  }
                }
              }}
            >
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <div className="top-bar-left">
            <h2 className="page-title">Binder Dashboard</h2>
          </div>
          <div className="top-bar-right">
            <div className="user-info">
              <div className="user-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="user-details">
                <p className="user-name">{user?.name || user?.email}</p>
                <p className="user-role">
                  {user?.role === 'master-admin' && 'Master Admin'}
                  {user?.role === 'manager' && 'Manager'}
                  {user?.role === 'tenant' && 'Tenant'}
                </p>
              </div>
            </div>
          </div>
        </header>
        <div className="content-wrapper">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;