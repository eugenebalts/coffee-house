import { IMenu } from '../types/types';

const MENU: IMenu[] = [
  {
    category: 'Coffee',
    menuItems: [
      {
        name: 'Irish coffee',
        description:
          'Fragrant black coffee with Jameson Irish whiskey and whipped milk',
        price: 7.0,
        pathToImg: 'irish',
      },
      {
        name: 'Kahlua coffee',
        description:
          'Classic coffee with milk and Kahlua liqueur under a cap of frothed milk',
        price: 7.0,
        pathToImg: 'kahlua',
      },
      {
        name: 'Honey raf',
        description: 'Espresso with frothed milk, cream and aromatic honey',
        price: 5.5,
        pathToImg: 'honey',
      },
      {
        name: 'Ice cappuccino',
        description:
          'Cappuccino with soft thick foam in summer version with ice',
        price: 5.0,
        pathToImg: 'cappuccino',
      },
      {
        name: 'Espresso',
        description: 'Classic black coffee',
        price: 4.5,
        pathToImg: 'espresso',
      },
      {
        name: 'Latte',
        description:
          'Espresso coffee with the addition of steamed milk and dense milk foam',
        price: 5.5,
        pathToImg: 'latte',
      },
      {
        name: 'Latte macchiato',
        description: 'Espresso with frothed milk and chocolate',
        price: 5.5,
        pathToImg: 'macchiato',
      },
      {
        name: 'Coffee with cognac',
        description: 'Fragrant black coffee with cognac and whipped cream',
        price: 6.5,
        pathToImg: 'cognac',
      },
    ],
  },
  {
    category: 'Tea',
    menuItems: [],
  },
  {
    category: 'Dessert',
    menuItems: [],
  },
];

export default MENU;
