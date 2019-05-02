const settings = {
  recommended: {
    title:'Recommended',
    text: 'Recomended count',
    count: ['5 users', '10 users', '15 users', '20 users'],
    key: 'set-01'
  },
  notifications: {
    title:'Notifications',
    text: 'Show Notifications',
    key: 'set-02',
    childSetting: {
      title: 'Notifications Delay',
      text: 'Notification delay',
      count: ['15', '30', '45', '60'],
      key: 'set-001',
    }
  }
}

export default settings;