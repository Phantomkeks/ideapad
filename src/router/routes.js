
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Notes.vue') },
      { path: 'notes', component: () => import('pages/Notes.vue') },
      { path: 'trash', component: () => import('pages/Trash.vue') },
      { path: 'settings', component: () => import('pages/Settings.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/DetailLayout.vue'),
    children: [
      { path: 'notes/detail/:id?', component: () => import('pages/NoteDetail.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/DetailTrashLayout.vue'),
    children: [
      { path: 'deletedNotes/detail/:id?', component: () => import('pages/TrashDetail.vue') }
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
