import { IMenu } from '../types/types';

const MENU: IMenu[] = [
  {
    category: 'Coffee',
    additionally: {
      size: [
        {
          name: 'S',
          price: 0,
          volume: '200 ml',
        },
        {
          name: 'M',
          price: 0.5,
          volume: '300 ml',
        },
        {
          name: 'L',
          price: 1.0,
          volume: '400 ml',
        },
      ],
      additives: [
        {
          price: 0.5,
          name: 'Sugar',
        },
        {
          price: 0.5,
          name: 'Cinnamon',
        },
        {
          price: 0.5,
          name: 'Syrup',
        },
      ],
    },
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
    additionally: {
      size: [
        {
          name: 'S',
          price: 0,
          volume: '200 ml',
        },
        {
          name: 'M',
          price: 0.5,
          volume: '300 ml',
        },
        {
          name: 'L',
          price: 1.0,
          volume: '400 ml',
        },
      ],
      additives: [
        {
          price: 0.5,
          name: 'Sugar',
        },
        {
          price: 0.5,
          name: 'Lemon',
        },
        {
          price: 0.5,
          name: 'Syrup',
        },
      ],
    },
    menuItems: [
      {
        name: 'Moroccan',
        description:
          'Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint',
        price: 4.5,
        pathToImg: 'moroccan',
      },
      {
        name: 'Ginger',
        description: 'Original black tea with fresh ginger, lemon and honey',
        price: 5.0,
        pathToImg: 'ginger',
      },
      {
        name: 'Cranberry',
        description: 'Invigorating black tea with cranberry and honey',
        price: 5.0,
        pathToImg: 'cranberry',
      },
      {
        name: 'Sea buckthorn',
        description:
          'Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon',
        price: 5.5,
        pathToImg: 'buckthorn',
      },
    ],
  },
  {
    category: 'Dessert',
    additionally: {
      size: [
        {
          name: 'S',
          price: 0,
          volume: '50 g',
        },
        {
          name: 'M',
          price: 0.5,
          volume: '100 g',
        },
        {
          name: 'L',
          price: 1.0,
          volume: '200 g',
        },
      ],
      additives: [
        {
          price: 0.5,
          name: 'Berries',
        },
        {
          price: 0.5,
          name: 'Nuts',
        },
        {
          price: 0.5,
          name: 'Jam',
        },
      ],
    },
    menuItems: [
      {
        name: 'Marble cheesecake',
        description:
          'Philadelphia cheese with lemon zest on a light sponge cake and red currant jam',
        price: 3.5,
        pathToImg: 'marble',
      },
      {
        name: 'Red velvet',
        description: 'Layer cake with cream cheese frosting',
        price: 4.0,
        pathToImg: 'velvet',
      },
      {
        name: 'Cheesecakes',
        description:
          'Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar',
        price: 4.5,
        pathToImg: 'cheesecakes',
      },
      {
        name: 'Creme brulee',
        description:
          'Delicate creamy dessert in a caramel basket with wild berries',
        price: 4.0,
        pathToImg: 'brulee',
      },
      {
        name: 'Pancakes',
        description:
          'Tender pancakes with strawberry jam and fresh strawberries',
        price: 4.5,
        pathToImg: 'pancakes',
      },
      {
        name: 'Honey cake',
        description: 'Classic honey cake with delicate custard',
        price: 4.5,
        pathToImg: 'honey-cake',
      },
      {
        name: 'Chocolate cake',
        description:
          'Cake with hot chocolate filling and nuts with dried apricots',
        price: 5.5,
        pathToImg: 'chocolate',
      },
      {
        name: 'Black forest',
        description:
          'A combination of thin sponge cake with cherry jam and light chocolate mousse',
        price: 6.5,
        pathToImg: 'forest',
      },
    ],
  },
];

export default MENU;
