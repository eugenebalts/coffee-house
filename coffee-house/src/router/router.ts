const router = async () => {
  const router = [
    {
      path: '/home',
      view: () => console.log('home-page'),
    },
    {
      path: '/menu',
      view: () => console.log('menu-page'),
    },
  ];

  const match = router.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  console.log(match);
};

export default router;
