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
  additionally: IProductAdditionally;
}

type ProductSize = {
  name: string;
  price: number;
  volume: string;
};

type ProductAdditives = {
  price: number;
  name: string;
};

interface IProductAdditionally {
  size: ProductSize[];
  additives: ProductAdditives[];
}

export {
  INavigationItems,
  IFooterContacts,
  IMenuItem,
  IMenu,
  IProductAdditionally,
};
