import { IDrink } from '../types/types';

const FAVORITE_DRINKS: IDrink[] = [
  {
    name: 'S’mores Frappuccino',
    description: `This new drink takes an espresso and mixes
      it with brown sugar and cinnamon before being topped with
      oat milk.`,
    price: 5.5,
    pathToImg: 'coffee',
  },
  {
    name: 'Caramel Macchiato',
    description: `Fragrant and unique classic espresso with rich
      caramel-peanut syrup, with cream under whipped thick foam.`,
    price: 5.0,
    pathToImg: 'coffee2',
  },
  {
    name: 'Ice coffee',
    description: `A popular summer drink that tones and invigorates.
      Prepared from coffee, milk and ice.`,
    price: 4.5,
    pathToImg: 'coffee3',
  },
];

export default FAVORITE_DRINKS;
