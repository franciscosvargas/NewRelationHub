export const paths = {
  // ... existing paths ...
  
  dashboard: {
    root: ROOTS.DASHBOARD,
    mail: {
      root: `${ROOTS.DASHBOARD}/mail`,
      labels: [`${ROOTS.DASHBOARD}/mail/label/:label`, (label) => `${ROOTS.DASHBOARD}/mail/label/${label}`],
      details: [`${ROOTS.DASHBOARD}/mail/:id`, (id) => `${ROOTS.DASHBOARD}/mail/${id}`],
      compose: `${ROOTS.DASHBOARD}/mail/compose`,
    },
    chat: {
      root: `${ROOTS.DASHBOARD}/chat`,
      new: `${ROOTS.DASHBOARD}/chat/new`,
      conversation: [`${ROOTS.DASHBOARD}/chat/:conversationKey`, (conversationKey) => `${ROOTS.DASHBOARD}/chat/${conversationKey}`],
    },
    // ... other existing paths ...
    
    business: {
      root: `${ROOTS.DASHBOARD}/business`,
      new: `${ROOTS.DASHBOARD}/business/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/business/${id}/edit`,
    },
    
    services: {
      root: `${ROOTS.DASHBOARD}/services`,
      new: `${ROOTS.DASHBOARD}/services/new`,
      edit: (id) => `${ROOTS.DASHBOARD}/services/${id}/edit`,
    },
    
    // ... other existing paths ...
  },
  // ... other existing paths ...
}; 