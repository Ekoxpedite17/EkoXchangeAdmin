// Mock data for user management
export const mockUsers = [
  {
    id: 1,
    username: 'johndoe',
    email: 'john.doe@example.com',
    dateRegistered: '2023-01-15',
    kycStatus: 'Approved',
    accountStatus: 'Active'
  },
  {
    id: 2,
    username: 'janedoe',
    email: 'jane.doe@example.com',
    dateRegistered: '2023-02-20',
    kycStatus: 'Pending',
    accountStatus: 'Active'
  },
  {
    id: 3,
    username: 'mikebrown',
    email: 'mike.brown@example.com',
    dateRegistered: '2023-03-10',
    kycStatus: 'Rejected',
    accountStatus: 'Suspended'
  },
  {
    id: 4,
    username: 'sarahsmith',
    email: 'sarah.smith@example.com',
    dateRegistered: '2023-04-05',
    kycStatus: 'Not Submitted',
    accountStatus: 'Locked'
  },
  {
    id: 5,
    username: 'alexjones',
    email: 'alex.jones@example.com',
    dateRegistered: '2023-05-12',
    kycStatus: 'Approved',
    accountStatus: 'Active'
  }
];

export const mockKycDocuments = [
  { 
    id: 1, 
    userId: 2, 
    type: 'ID Card', 
    uploadDate: '2023-02-21', 
    status: 'Pending',
    documentUrl: 'https://example.com/docs/id_2.pdf'
  },
  { 
    id: 2, 
    userId: 2, 
    type: 'Proof of Address', 
    uploadDate: '2023-02-21', 
    status: 'Pending',
    documentUrl: 'https://example.com/docs/address_2.pdf'
  },
  { 
    id: 3, 
    userId: 3, 
    type: 'ID Card', 
    uploadDate: '2023-03-11', 
    status: 'Rejected', 
    reason: 'Document unclear',
    documentUrl: 'https://example.com/docs/id_3.pdf'
  },
  { 
    id: 4, 
    userId: 3, 
    type: 'Proof of Address', 
    uploadDate: '2023-03-11', 
    status: 'Rejected', 
    reason: 'Document expired',
    documentUrl: 'https://example.com/docs/address_3.pdf'
  },
  { 
    id: 5, 
    userId: 1, 
    type: 'ID Card', 
    uploadDate: '2023-01-16', 
    status: 'Approved',
    documentUrl: 'https://example.com/docs/id_1.pdf'
  },
  { 
    id: 6, 
    userId: 1, 
    type: 'Proof of Address', 
    uploadDate: '2023-01-16', 
    status: 'Approved',
    documentUrl: 'https://example.com/docs/address_1.pdf'
  },
  { 
    id: 7, 
    userId: 5, 
    type: 'ID Card', 
    uploadDate: '2023-05-13', 
    status: 'Approved',
    documentUrl: 'https://example.com/docs/id_5.pdf'
  },
  { 
    id: 8, 
    userId: 5, 
    type: 'Proof of Address', 
    uploadDate: '2023-05-13', 
    status: 'Approved',
    documentUrl: 'https://example.com/docs/address_5.pdf'
  }
];

export const mockApprovalLogs = [
  { 
    id: 1, 
    userId: 1, 
    documentId: 5, 
    action: 'Approved', 
    adminUser: 'admin1', 
    date: '2023-01-17', 
    notes: 'All documents valid' 
  },
  { 
    id: 2, 
    userId: 1, 
    documentId: 6, 
    action: 'Approved', 
    adminUser: 'admin1', 
    date: '2023-01-17', 
    notes: 'All documents valid' 
  },
  { 
    id: 3, 
    userId: 3, 
    documentId: 3, 
    action: 'Rejected', 
    adminUser: 'admin2', 
    date: '2023-03-12', 
    notes: 'Document unclear' 
  },
  { 
    id: 4, 
    userId: 3, 
    documentId: 4, 
    action: 'Rejected', 
    adminUser: 'admin2', 
    date: '2023-03-12', 
    notes: 'Document expired' 
  },
  { 
    id: 5, 
    userId: 5, 
    documentId: 7, 
    action: 'Approved', 
    adminUser: 'admin1', 
    date: '2023-05-14', 
    notes: 'All documents valid' 
  },
  { 
    id: 6, 
    userId: 5, 
    documentId: 8, 
    action: 'Approved', 
    adminUser: 'admin1', 
    date: '2023-05-14', 
    notes: 'All documents valid' 
  }
];

export const statusColors = {
  kycStatus: {
    'Approved': 'success',
    'Pending': 'warning',
    'Rejected': 'error',
    'Not Submitted': 'default'
  },
  accountStatus: {
    'Active': 'success',
    'Suspended': 'error',
    'Locked': 'warning'
  }
};