import Link from "next/link"
import { Logo } from "./Logo"
import { NavigationItem } from "./HeaderNavigationItem"
import { userData } from "@/hook/getReduxData"

interface IHeader {
  title: string
}

export const Header = ({ title }: IHeader) => {
  const userInfo = userData()

  return (
    <header className="h-24 bg-gray-400 flex items-center px-4">
      {/* logo */}
      <div className="flex-1">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <nav className="py-[10px] ">
        <ul className="flex items-center h-[40px] space-x-5">
          {/* Logado */}
          {userInfo.token && (
            <>
            <NavigationItem href="/my-account" label="Minha conta" />
            <NavigationItem href="/logout" label="Sair" />
            <NavigationItem href="creaete/ad" label="Anuncie aqui" isButton />
            </>
          )}
          {/* Não logado */}
          {!userInfo.token && (
            <>
              <NavigationItem href="auth/signin" label="Entrar" />
              <NavigationItem href="auth/signup" label="Cadastrar" />
              <NavigationItem href="signup" label="Anuncie aqui" isButton />
            </>
          )}

          
        </ul>
      </nav>
    </header>
  )
}