import { cookies } from "next/headers"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SidebarToggle from "./SidebarToggle"

type SidebarLayoutProps = {
  children: React.ReactNode
}

const SidebarLayout = async ({ children }: SidebarLayoutProps) => {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <SidebarToggle />
      {/* <SidebarTrigger /> */}
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default SidebarLayout
