"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
    redirect('/api/auth/login?post_login_redirect_url=/dashboard')
  },[])
  return (
    <div>
      

    </div>
  );
}
