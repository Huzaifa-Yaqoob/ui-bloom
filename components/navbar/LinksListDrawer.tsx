"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import Logo from "@/components/common/Logo";
import { Typography } from "@/components/common/Typography";
import MainNavList from "@/components/navbar/MainNavList";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function LinksListDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <Drawer direction={"left"} open={open} onOpenChange={setOpen}>
      <DrawerTrigger className={"md:hidden"}>{open ? <X /> : <Menu />}</DrawerTrigger>

      <DrawerContent className="bottom-16 h-[calc(100vh-64px)] rounded-none">
        <DrawerHeader className={"flex flex-row items-end gap-4"}>
          <Logo className={"size-12"} />
          <Typography variant="h3" render={<DrawerTitle />}>
            UI Bloom
          </Typography>
        </DrawerHeader>
        <MainNavList className={"flex w-full flex-col"} />
      </DrawerContent>
    </Drawer>
  );
}

export default LinksListDrawer;
