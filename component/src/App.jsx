import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle, 
  XCircle, 
  Clock, 
  DoorOpen, 
  DoorClosed, 
  CheckSquare,
  XSquare,
  Package,
  Search,
  Calendar,
  MapPin,
  AlertCircle,
  HelpCircle,
  LayoutDashboard,
  ClipboardList,
  Users,
  Map,
  LogOut,
  Menu,
  X,
  User,
  FileText
} from 'lucide-react';

const LabKeeperDashboard = () => {
  // State variables
  const [activeTab, setActiveTab] = useState('tasks');
  const [pendingTasks, setPendingTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeReportTab, setActiveReportTab] = useState('lost');
  const [notifications, setNotifications] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  // Mock data loading
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      // Pending tasks mock data
      setPendingTasks([
        {
          id: '1',
          roomName: 'Lab 101',
          bookingTime: '09:00 - 11:00',
          floor: 1,
          building: 'Main',
          requesterName: 'John Smith',
          additionalInfo: 'Need the room setup for presentation'
        },
        {
          id: '2',
          roomName: 'Lab 203',
          bookingTime: '13:00 - 15:00',
          floor: 2,
          building: 'Science',
          requesterName: 'Emily Johnson',
          additionalInfo: null
        }
      ]);
      
      // My tasks mock data
      setMyTasks([
        {
          id: '3',
          roomName: 'Computer Lab A',
          bookingTime: '10:00 - 12:00',
          floor: 1,
          building: 'Tech',
          status: 'To Be Opened',
          requesterName: 'Michael Brown'
        },
        {
          id: '4',
          roomName: 'Physics Lab',
          bookingTime: '14:00 - 16:00',
          floor: 3,
          building: 'Science',
          status: 'Opened',
          requesterName: 'Sarah Davis'
        }
      ]);
      
      // Lost items mock data
      setLostItems([
        {
          id: '1',
          itemName: 'MacBook Pro',
          category: 'Electronics',
          location: 'Computer Lab 2',
          description: 'Silver laptop with university sticker',
          reporterName: 'Alex Wilson',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          itemName: 'Blue Notebook',
          category: 'Books',
          location: 'Chemistry Lab',
          description: 'Blue spiral notebook with physics notes',
          reporterName: 'Jessica Lee',
          timestamp: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
      
      setNotifications(2); // Number of pending tasks
      setLoading(false);
    }, 1000);
  }, []);

  // Event handlers
  const handleAcceptTask = (taskId) => {
    console.log('Task accepted:', taskId);
    // Move task from pending to my tasks
    const task = pendingTasks.find(t => t.id === taskId);
    if (task) {
      setPendingTasks(prev => prev.filter(t => t.id !== taskId));
      setMyTasks(prev => [...prev, {...task, status: 'To Be Opened'}]);
      setNotifications(prev => prev - 1);
    }
  };

  const handleDeclineTask = (taskId) => {
    console.log('Task declined:', taskId);
    setPendingTasks(prev => prev.filter(t => t.id !== taskId));
    setNotifications(prev => prev - 1);
  };

  const handleStatusChange = (taskId, newStatus) => {
    console.log(`Task ${taskId} status changed to ${newStatus}`);
    setMyTasks(prev => 
      prev.map(task => task.id === taskId ? {...task, status: newStatus} : task)
    );
  };

  const handleSetNotComplete = (taskId, selectedIssue, reason) => {
    console.log(`Task ${taskId} not completed: ${selectedIssue} - ${reason}`);
    
    // Validate that we have both selectedIssue and reason
    if (!selectedIssue) {
      alert("Please select a reason for not completing the task");
      return;
    }
    
    if (selectedIssue === "Other" && !reason) {
      alert("Please provide details for the 'Other' reason");
      return;
    }
    
    // Update the task status with the selected issue and reason
    setMyTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? {...task, status: 'Not Completed', selectedIssue, reason} 
          : task
      )
    );
    
    // Show confirmation message
    alert(`Task marked as Not Completed. Reason: ${selectedIssue}`);
  };

  const handleHelpSubmit = (helpData) => {
    console.log('Help request submitted:', helpData);
    alert('Help request submitted successfully!');
  };

  const handleLostItemSubmit = (itemData) => {
    console.log('Lost item reported:', itemData);
    alert('Lost item report submitted successfully!');
  };

  const handleFoundItemSubmit = (itemData) => {
    console.log('Found item reported:', itemData);
    alert('Found item report submitted successfully!');
  };

  const handleMarkItemFound = (itemId) => {
    console.log('Item marked as found:', itemId);
    setLostItems(prev => prev.filter(item => item.id !== itemId));
    alert('Item marked as found successfully!');
  };

  // Sidebar navigation items
  const navItems = [
    { id: 'tasks', label: 'Tasks', icon: ClipboardList },
    { id: 'mytasks', label: 'My Tasks', icon: Users },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'report', label: 'Report', icon: AlertCircle }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-emerald-500 font-medium">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-white border-r shadow-sm ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {!sidebarCollapsed && (
            <div className="text-xl font-bold text-blue-600">
              Lab Keeper
            </div>
          )}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
          >
            {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
        
        {/* Sidebar Navigation */}
        <nav className="mt-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActivePage(item.id);
                    setActiveTab(item.id);
                  }}
                  className={`flex items-center w-full px-4 py-3 text-left ${
                    activePage === item.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} className={`${!sidebarCollapsed ? 'mr-3' : 'mx-auto'}`} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <header className="fixed top-0 right-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b shadow-sm left-64">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">Lab Keeper Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button className="p-2 rounded-full relative text-gray-600 hover:bg-gray-100">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {notifications}
                </span>
              )}
            </button>
            
            
            {/* User Profile */}
            <div className="flex items-center">
              <div className="mr-2 text-right">
                <p className="text-sm font-medium text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">Lab Keeper</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={`p-6 mt-16 ${sidebarCollapsed ? 'ml-4' : 'ml-0'}`}>
          {/* Content Area */}
          <div className="container max-w-5xl p-6 mx-auto bg-white rounded-lg shadow-sm">
            {/* Heading Area */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Welcome to Spacefix</h2>
              <p className="text-gray-600">Select a feature to get started</p>
            </div>

          
            {/* Tasks Tab */}
            {activeTab === 'tasks' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Pending Tasks</h2>
                {pendingTasks.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No pending tasks</p>
                ) : (
                  pendingTasks.map(task => (
                    <div key={task.id} className="mb-4 border-l-4 border-l-blue-500 bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-transparent">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="flex items-center text-xl text-blue-800">
                              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                              {task.roomName}
                            </h3>
                            <div className="text-gray-600 mt-1">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                <span>{task.bookingTime}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                                <span>Floor {task.floor}, Building {task.building}</span>
                              </div>
                            </div>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200">
                            New Request
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <div className="relative inline-block h-6 w-6 mr-2 rounded-full overflow-hidden bg-blue-100 text-blue-800 text-xs flex items-center justify-center">
                            {task.requesterName?.charAt(0) || 'U'}
                          </div>
                          <span>Requested by: <span className="font-medium">{task.requesterName || 'Unknown'}</span></span>
                        </div>
                        {task.additionalInfo && (
                          <div className="text-sm text-gray-600 mb-4">
                            <div className="bg-gray-50 p-2 rounded-md mt-2 italic">
                              "{task.additionalInfo}"
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4 border-t flex justify-end gap-2">
                        <button 
                          className="inline-flex items-center justify-center px-4 py-2 font-medium rounded-md transition-colors border border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleDeclineTask(task.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Decline
                        </button>
                        <button 
                          className="inline-flex items-center justify-center px-4 py-2 font-medium rounded-md transition-colors bg-green-600 text-white hover:bg-green-700"
                          onClick={() => handleAcceptTask(task.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* My Tasks Tab */}
            {activeTab === 'mytasks' && activePage !== 'dashboard' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Space Booking</h2>
                {myTasks.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No tasks assigned to you</p>
                ) : (
                  myTasks.map(task => {
                    // Status color classes
                    const statusColors = {
                      'To Be Opened': 'border-cyan-500 bg-cyan-50',
                      'Opened': 'border-green-500 bg-green-50',
                      'To Be Closed': 'border-yellow-500 bg-yellow-50',
                      'Closed': 'border-gray-500 bg-gray-50',
                      'Completed': 'border-emerald-500 bg-emerald-50',
                      'Not Completed': 'border-red-500 bg-red-50'
                    };
                    
                    const statusBadgeColors = {
                      'To Be Opened': 'bg-cyan-100 text-cyan-800 border-cyan-200',
                      'Opened': 'bg-green-100 text-green-800 border-green-200',
                      'To Be Closed': 'bg-yellow-100 text-yellow-800 border-yellow-200',
                      'Closed': 'bg-gray-100 text-gray-800 border-gray-200',
                      'Completed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
                      'Not Completed': 'bg-red-100 text-red-800 border-red-200'
                    };
                    
                    return (
                      <div 
                        key={task.id} 
                        className={`mb-4 border-l-4 bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 ${statusColors[task.status] || 'border-blue-500 bg-blue-50'}`}
                      >
                        <div className="p-4 border-b">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="flex items-center text-xl text-gray-800">
                                <Calendar className="h-5 w-5 mr-2 text-gray-600" />
                                {task.roomName}
                              </h3>
                              <div className="text-gray-600 mt-1">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                  <span>{task.bookingTime}</span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                                  <span>Floor {task.floor}, Building {task.building}</span>
                                </div>
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeColors[task.status] || 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                              {task.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-4" id={`task-${task.id}`}>
                          {task.status === 'Not Completed' && task.reason && (
                            <div className="p-4 mb-3 rounded-md bg-red-50 text-red-800 border border-red-200">
                              <h4 className="font-medium flex items-center">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                Not completed reason:
                              </h4>
                              <div className="mt-1 text-sm">
                                {task.selectedIssue}: {task.reason}
                              </div>
                            </div>
                          )}
                          
                          {/* Not Completed Reason Form */}
                          <div id={`reason-form-${task.id}`} style={{display: 'none'}} className="mb-4 p-3 border rounded-md bg-gray-50">
                            <h4 className="font-medium mb-2">Select reason for not completing:</h4>
                            <select 
                              id={`reason-select-${task.id}`}
                              className="w-full p-2 border rounded-md bg-white mb-2"
                              onChange={(e) => {
                                const customInput = document.getElementById(`custom-reason-${task.id}`);
                                if (customInput) {
                                  customInput.style.display = e.target.value === "Other" ? "block" : "none";
                                }
                              }}
                            >
                              <option value="">Select a reason</option>
                              <option value="Can't open the room">Can't open the room</option>
                              <option value="Key is missing">Key is missing</option>
                              <option value="Room is already in use">Room is already in use</option>
                              <option value="Time changed">Time changed</option>
                              <option value="Booked by another person">Booked by another person</option>
                              <option value="Technical issue">Technical issue</option>
                              <option value="Security concern">Security concern</option>
                              <option value="Other">Other (specify)</option>
                            </select>
                            
                            <textarea
                              id={`custom-reason-${task.id}`}
                              placeholder="Explain why the task couldn't be completed..."
                              style={{display: 'none'}}
                              className="w-full p-2 border rounded-md mb-2"
                              rows={2}
                            ></textarea>
                            
                            <div className="flex justify-end gap-2">
                              <button 
                                type="button"
                                className="px-3 py-1 border rounded-md hover:bg-gray-100"
                                onClick={() => {
                                  const reasonForm = document.getElementById(`reason-form-${task.id}`);
                                  if (reasonForm) reasonForm.style.display = 'none';
                                }}
                              >
                                Cancel
                              </button>
                              <button 
                                type="button"
                                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                onClick={() => {
                                  const reasonSelect = document.getElementById(`reason-select-${task.id}`);
                                  const customInput = document.getElementById(`custom-reason-${task.id}`);
                                  const reasonForm = document.getElementById(`reason-form-${task.id}`);
                                  
                                  if (reasonSelect && reasonForm) {
                                    const selectedIssue = reasonSelect.value;
                                    let reason = selectedIssue;
                                    
                                    if (selectedIssue === "Other" && customInput) {
                                      reason = customInput.value || "No specific reason provided";
                                    }
                                    
                                    if (selectedIssue) {
                                      handleSetNotComplete(task.id, selectedIssue, reason);
                                      reasonForm.style.display = 'none';
                                    } else {
                                      alert("Please select a reason");
                                    }
                                  }
                                }}
                              >
                                Submit
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mt-2">
                            <button 
                              className={`inline-flex items-center justify-center px-4 py-2 font-medium rounded-md transition-colors border border-cyan-500 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 ${task.status === 'To Be Opened' ? 'bg-cyan-100' : ''}`}
                              onClick={() => handleStatusChange(task.id, 'To Be Opened')}
                            >
                              <Clock className="h-4 w-4 mr-1" />
                              To Be Opened
                            </button>
                            <button 
                              className={`inline-flex items-center justify-center px-4 py-2 font-medium rounded-md transition-colors border border-green-500 text-green-700 hover:bg-green-50 hover:text-green-800 ${task.status === 'Opened' ? 'bg-green-100' : ''}`}
                              onClick={() => handleStatusChange(task.id, 'Opened')}
                            >
                              <DoorOpen className="h-4 w-4 mr-1" />
                              Opened
                            </button>
                            <button 
                              className={`inline-flex items-center justify-center px-4 py-2 font-medium rounded-md transition-colors border border-yellow-500 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800 ${task.status === 'To Be Closed' ? 'bg-yellow-100' : ''}`}
                              onClick={() => handleStatusChange(task.id, 'To Be Closed')}
                            >
                              <Clock className="h-4 w-4 mr-1" />
                              To Be Closed
                            </button>
                            <button 
                              className={`inline-flex items-center justify-center px-4 py-2 font-medium rounded-md transition-colors border border-gray-500 text-gray-700 hover:bg-gray-50 hover:text-gray-800 ${task.status === 'Closed' ? 'bg-gray-100' : ''}`}
                              onClick={() => handleStatusChange(task.id, 'Closed')}
                            >
                              <DoorClosed className="h-4 w-4 mr-1" />
                              Closed
                            </button>
                            <button 
                              className={`inline-flex items-center justify-center px-4 py-2 font-medium rounded-md transition-colors border border-emerald-500 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 ${task.status === 'Completed' ? 'bg-emerald-100' : ''}`}
                              onClick={() => handleStatusChange(task.id, 'Completed')}
                            >
                              <CheckSquare className="h-4 w-4 mr-1" />
                              Completed
                            </button>
                            <button 
                              className={`inline-flex items-center justify-center px-4 py-2 font-medium rounded-md transition-colors border border-red-500 text-red-700 hover:bg-red-50 hover:text-red-800 ${task.status === 'Not Completed' ? 'bg-red-100' : ''}`}
                              onClick={() => {
                                // Show a dropdown with reasons instead of immediately setting
                                const reasonForm = document.getElementById(`reason-form-${task.id}`);
                                if (reasonForm) {
                                  reasonForm.style.display = reasonForm.style.display === 'none' ? 'block' : 'none';
                                }
                              }}
                            >
                              <XSquare className="h-4 w-4 mr-1" />
                              Not Completed
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Help Tab */}
            {activeTab === 'help' && (
    <div>
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Need Help?</h2>
    <p className="text-gray-600 mb-4">Select an issue or describe your problem</p>
    
    <form onSubmit={(e) => {
      e.preventDefault();
      handleHelpSubmit({
        issue: "Cannot open the classroom",
        timestamp: new Date().toISOString()
      });
    }} className="space-y-4">
      <select className="w-full p-2 border rounded-md bg-white">
        <option value="">Select an issue</option>
        <option value="Cannot open the classroom">Cannot open the classroom</option>
        <option value="Cannot access the system">Cannot access the system</option>
        <option value="Booking system issue">Booking system issue</option>
        <option value="App not responding">App not responding</option>
        <option value="Other">Other</option>
      </select>
      
      <textarea
        placeholder="Describe your issue..."
        rows={3}
        className="w-full p-2 border rounded-md"
      ></textarea>
      
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-4 py-2 font-medium rounded-md transition-colors bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600"
      >
        <HelpCircle className="h-4 w-4 mr-2" />
        Submit Help Request
      </button>
    </form>
  </div>
)}

{activeTab === 'report' && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Lost & Found Report</h2>
              
              {/* Report Type Tabs */}
              <div className="flex mb-4 bg-gray-50 p-2 rounded-lg">
                <button
                  onClick={() => setActiveReportTab('lost')}
                  className={`flex-1 py-2 rounded-lg transition-colors duration-200 ${
                    activeReportTab === 'lost' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Report Lost Item
                </button>
                <button
                  onClick={() => setActiveReportTab('found')}
                  className={`flex-1 py-2 rounded-lg transition-colors duration-200 ${
                    activeReportTab === 'found' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Report Found Item
                </button>
                <button
                  onClick={() => setActiveReportTab('student-lost')}
                  className={`flex-1 py-2 rounded-lg transition-colors duration-200 ${
                    activeReportTab === 'student-lost' 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Student Lost Items
                </button>
              </div>
              
              {/* Lost Items Form */}
              {activeReportTab === 'lost' && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleLostItemSubmit({
                    type: 'lost',
                    category: 'Electronics',
                    itemName: 'Laptop',
                    location: 'Lab 101',
                    description: 'Dell XPS 13',
                    timestamp: new Date().toISOString()
                  });
                }} className="space-y-4">
                  <select className="w-full p-2 border rounded-md bg-white">
                    <option value="">Select category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Personal Items">Personal Items</option>
                    <option value="Other">Other</option>
                  </select>
                  
                  <input
                    placeholder="Item name"
                    className="w-full p-2 border rounded-md"
                  />
                  
                  <input
                    placeholder="Last seen location"
                    className="w-full p-2 border rounded-md"
                  />
                  
                  <textarea
                    placeholder="Item description..."
                    rows={3}
                    className="w-full p-2 border rounded-md"
                  ></textarea>
                  
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-2 font-medium rounded-md transition-colors bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
                  >
                    Submit Lost Item Report
                  </button>
                </form>
              )}
              
              {/* Found Items Form */}
              {activeReportTab === 'found' && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleFoundItemSubmit({
                    type: 'found',
                    category: 'Books',
                    itemName: 'Textbook',
                    location: 'Library',
                    description: 'Physics 101 textbook',
                    timestamp: new Date().toISOString()
                  });
                }} className="space-y-4">
                  <select className="w-full p-2 border rounded-md bg-white">
                    <option value="">Select category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Personal Items">Personal Items</option>
                    <option value="Other">Other</option>
                  </select>
                  
                  <input
                    placeholder="Item name"
                    className="w-full p-2 border rounded-md"
                  />
                  
                  <input
                    placeholder="Found location"
                    className="w-full p-2 border rounded-md"
                  />
                  
                  <textarea
                    placeholder="Item description..."
                    rows={3}
                    className="w-full p-2 border rounded-md"
                  ></textarea>
                  
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-2 font-medium rounded-md transition-colors bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600"
                  >
                    Submit Found Item Report
                  </button>
                </form>
              )}
              
              {/* Student Lost Items List */}
              {activeReportTab === 'student-lost' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Reported Lost Items</h3>
                  {lostItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No lost items reported yet.</p>
                  ) : (
                    lostItems.map(item => (
                      <div key={item.id} className="bg-white rounded-lg border border-l-4 border-l-red-400 shadow-sm">
                        <div className="p-4 border-b">
                          <div className="flex justify-between">
                            <h3 className="text-lg text-gray-800">{item.itemName}</h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                              Lost
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm">
                            <span className="font-medium">Category:</span> {item.category}
                          </p>
                        </div>
                        <div className="p-4">
                          <div className="text-sm">
                            <div className="flex items-center mb-1">
                              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-gray-700">{item.location}</span>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-md mt-2 text-gray-700">
                              {item.description}
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              Reported by: {item.reporterName || 'Anonymous'} • {new Date(item.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border-t">
                          <button 
                            className="w-full inline-flex items-center justify-center px-4 py-2 font-medium rounded-md transition-colors bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600"
                            onClick={() => handleMarkItemFound(item.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark as Found
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                )}
              </div>
             )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LabKeeperDashboard;