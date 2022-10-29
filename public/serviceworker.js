
self.addEventListener('notificationclick', function (e) {
    console.log('clicked')
})

self.addEventListener('push', e => {
    const data = e.data.json()
    self.registration.showNotification(data.title, {
        body: data.content,
        icon: './favicon-32x32.png'
    })
})
