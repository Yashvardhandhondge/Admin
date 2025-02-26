import { LayoutGrid, LucideIcon, Plane } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/home",
          label: "Home",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: "Content",
          icon: Plane,
          submenus: [
            {
              href: "/airlines",
              label: "Airlines"
            },
            {
              href: "/offerpage",
              label: "Offers"
            }
          ]
        }
      ]
    }
  ];
}
