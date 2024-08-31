"use client"

import { Footer } from "@/components/template/Footer";
import { Header } from "@/components/template/Header";
import { Template } from "@/components/template/Template";
import { apiUrl } from "@/global";
import { userData } from "@/hook/getReduxData"
import { setName } from "@/redux/userReducer";
import axios from "axios"
import { useDispatch } from "react-redux";

export default () => {
  

  return (
    <Template>
      <Header title="Home"></Header>
      <div className="">
        Olá, <span></span>
      </div>

      <Footer />

    </Template>
  )
}