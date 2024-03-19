import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
    NavBarItemsProps,
    NavBarProps,
    NavbarLinkProps,
} from "../../../types/layout/nav-bar.type";
import { useAuth } from "../../../hooks/use-auth";

export function SideBarDrawer({ items, open }: NavBarProps) {
    const router = useRouter();
    const { permissions } = useAuth();

    items = filterItems(items, permissions);

    if (!items.length) return <></>;

    let current = findLast(items, (v) => IsSelected(v, router.asPath));

    if (!current) current = items[0];
    return (
        <div className="space-y-4 ">
            {items.map((v, i) => (
                <NavbarLink
                    key={v.text}
                    item={v}
                    currentPath={router.asPath}
                />
            ))}
        </div>
    );
}

function filterItems(
    values: NavBarItemsProps[],
    userPermissions: string[]
): NavBarItemsProps[] {
    return values
        .map((i) => {
            let { permissions, items, visible } = i;

            if (visible === false) return null;

            if (items) {
                items = filterItems(items, userPermissions);
                if (!items?.length) return null;

                if (items.length === 1)
                    return {
                        ...items[0],
                        text: i.text,
                        icon: i.icon,
                    };

                return {
                    ...i,
                    pathname: items[0].pathname,
                    items: items,
                };
            }

            if (permissions) {
                const authorize = !Array.isArray(permissions)
                    ? userPermissions.includes(permissions)
                    : permissions.some((p) =>
                        Boolean(userPermissions.includes(p)) ? true : false
                    );

                if (!authorize) return null;
            }

            return i;
        })
        .filter((v) => v != null);
}

function IsSelected(item: NavBarItemsProps, currentPath: string) {
    if ("isSelected" in item) return item.isSelected;

    return (item.isSelected = currentPath == item.pathname);
}

function findLast<In>(
    arr: In[],
    predicate: (value: In, index: number) => boolean
) {
    for (let i = arr.length - 1; i > -1; i--) {
        let value = arr[i];

        if (predicate(value, i)) return value;
    }
}

function NavbarLink(props: NavbarLinkProps) {
    let {
        currentPath,
        item: { icon, pathname, items, text },
    } = props;

    if (!pathname && items) pathname = items[0]?.pathname;

    return (
          <Link href={pathname} legacyBehavior>
            <a className=" flex items-center p-2 text-white rounded-lg  hover:bg-custom-btn dark:hover:bg-[#7b71b6] cursor-pointer py-2">
                <div className="text-white text-base"> {icon} </div>
                <span className="w-1/1 ml-1.5 text-base hover:font-semi-bold" id="navbar_links">{text}</span>
            </a>
        </Link>
    );
}
