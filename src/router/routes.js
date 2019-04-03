
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Notes.vue') },
      { path: 'notes', component: () => import('pages/Notes.vue') },
      { path: 'notes/detail/:id?', component: () => import('pages/NoteDetail.vue') },
      { path: 'trash', component: () => import('pages/Trash.vue') },
      { path: 'settings', component: () => import('pages/Settings.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
