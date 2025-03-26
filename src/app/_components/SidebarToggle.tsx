import { Home, Inbox, ChevronDown, Anchor } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Hooks",
    url: "/",
    icon: Anchor,
    subItems: [
      { title: "useState", url: "/hooks/useState" },
      { title: "useRef", url: "/hooks/useRef" },
      { title: "useEffect", url: "/hooks/useEffect" },
      { title: "useTransition", url: "/hooks/useTransition" },
      { title: "useOptimistic", url: "/hooks/useOptimistic" },
      { title: "useActionState", url: "/hooks/useActionState" },
      { title: "useContext", url: "/hooks/useContext" },
      { title: "useDeferredValue", url: "/hooks/useDeferredValue" },
      { title: "useDebugValue", url: "/hooks/useDebugValue" },
      { title: "useCallback", url: "/hooks/useCallback" },
      { title: "useMemo", url: "/hooks/useMemo" },
      { title: "useReducer", url: "/hooks/useReducer" },
    ]
  },
]

const SidebarToggle = () => {
  return (
    <Sidebar collapsible="icon" variant="floating" side="left">
      <SidebarContent>
        {items.map((item) => (
          item.subItems ?
            <Collapsible key={item.title} className="group/collapsible" >
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                    </a>
                    <span className="sidebar-expanded:inline-block ml-2">
                      {item.title}
                    </span>
                    {item.subItems?.length > 0 && (
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=closed]/collapsible:-rotate-90" />
                    )}
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      {item.subItems?.length > 0 && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <a href={subItem.url} className="flex items-center ml-2">
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </Collapsible>
            :
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>
                <a href={item.url}>
                  <item.icon className="h-4 w-4" />
                </a>
                <span className="sidebar-expanded:inline-block ml-2">
                  {item.title}
                </span>
              </SidebarGroupLabel>
            </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar >
  )
}

export default SidebarToggle








