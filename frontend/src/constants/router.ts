import {
  Icon,
  IconProps,
  IconChecklist,
  IconTag,
  IconUser,
} from "@tabler/icons-react"


export type ROUTER_FIELD = 
  | "TASK"
  | "TAG"
  | "USER"

export type RouteType = {
  href: string
  name?: string
  type: "public" | "protected"
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
  hash?: Record<string, string>
}

export const ROUTER: Record<ROUTER_FIELD, RouteType> = {
  TASK: {
    href: "/task",
    name: "Nhiệm vụ",
    type: "public",
    icon: IconChecklist,
  },
  TAG: {
    href: "/tag",
    name: "Tag",
    type: "public",
    icon: IconTag,
  },
  USER: {
    href: "/user",
    name: "Thành viên",
    type: "public",
    icon: IconUser,
  }
}