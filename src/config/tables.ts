export const platformTableConfig = [
  {
    header: 'Nazwa',
    name: 'platform_name',
    component: 'link',
    config: { linkType: 'adminPlatform', idName: 'platform_id' },
  },
  {
    header: 'Nazwa do sortowania',
    name: 'platform_sort_name',
    component: 'default',
    config: {},
  },
  { header: 'Kod', name: 'platform_code', component: 'default', config: {} },
  {
    header: 'Producent',
    name: 'platform_producer',
    component: 'default',
    config: {},
  },
  { header: 'Data', name: 'platform_date', component: 'date', config: {} },
  {
    header: 'Opis',
    name: 'platform_description',
    component: 'description',
    config: {},
  },
  {
    header: 'Opcje',
    name: '',
    component: 'menu',
    config: {
      menuType: 'adminPlatforms',
    },
  },
];
