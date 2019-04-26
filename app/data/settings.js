const settings = {
  recommended: {
    title:'Recommended',
    text: 'Recomended count',
    count: [5, 10, 15, 20],
    key: 'set-01'
  },
  notifications: {
    title:'Notifications',
    text: 'Show Notifications',
    key: 'set-02',
    childSetting: {
      title: 'Notifications Delay',
      text: 'Notification delay',
      count: [15, 30, 45, 60],
      key: 'set-001',
    }
  }
}

export default settings;