// import { IconType } from "react-icons";

import { IconBaseProps } from "react-icons";

export type NavBarItemsProps = {
    pathname?: string;
    icon?: any;
    text?: string;
    permissions?: string | string[];
    visible?: boolean;
    items?: NavBarItemsProps[];
    isSelected?: boolean;
}

export type NavBarProps = {
    open?: boolean;
    items: NavBarItemsProps[];
}

export type NavbarLinkProps = {
    item: NavBarItemsProps;
    currentPath: string;
}
