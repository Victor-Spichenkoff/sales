'use client'

import { useSelector } from "react-redux";
import { RootState } from "@/providers/redux";

export const userData = () => useSelector((state: RootState) => state.user)  