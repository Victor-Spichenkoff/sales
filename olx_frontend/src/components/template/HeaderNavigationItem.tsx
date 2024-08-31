import Link from "next/link"

interface INavigationItem {
    label: string
    href: string
    isButton?: boolean
}

export const NavigationItem = ({ label, href, isButton }: INavigationItem) => {
    return (
        <li className={`
            ${isButton ? "bg-[#FF8100] rounded-md py-1 px-2 hover:scale-105 hover:bg-[#E57706]" : "hover:text-gray-700"}
        `}>
            <Link href={href}>{ label }</Link>
        </li>
    )
}