interface INavigationItems {
  title: string;
  href: string;
}

interface IFooterContacts extends INavigationItems {
  type: string;
}

export { INavigationItems, IFooterContacts };
