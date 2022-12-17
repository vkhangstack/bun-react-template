
export default {
    routes: [
      { path: '/', component: './a' },
      { path: '/users', component: './users/_layout',
        routes: [
          { path: '/users/detail', component: './users/detail' },
          { path: '/users/:id', component: './users/id' }
        ]
      },
    ],
  };