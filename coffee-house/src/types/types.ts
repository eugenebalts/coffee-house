interface INavigationItems {
  title: string;
  href: string;
}

interface IFooterContacts extends INavigationItems {
  type: string;
}

interface IMenuItem {
  name: string;
  description: string;
  price: number;
  pathToImg: string;
}

interface IMenu {
  category: string;
  menuItems: IMenuItem[];
}

export { INavigationItems, IFooterContacts, IMenuItem, IMenu };
