interface INavigationItems {
  title: string;
  href: string;
}

interface IFooterContacts extends INavigationItems {
  type: string;
}

interface IDrink {
  name: string;
  description: string;
  price: number;
  pathToImg: string;
}

export { INavigationItems, IFooterContacts, IDrink };
