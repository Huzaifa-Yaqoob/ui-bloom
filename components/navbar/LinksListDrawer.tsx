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
  return (
    <Drawer direction={"left"}>
      <DrawerTrigger className={"md:hidden"}>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className={"flex flex-row items-end gap-4"}>
          <Logo className={"size-12"} />
          <DrawerTitle>
            <Typography render={<h3 />}>UI Bloom</Typography>
          </DrawerTitle>
        </DrawerHeader>
        <MainNavList className={"flex w-full flex-col"} />
      </DrawerContent>
    </Drawer>
  );
}

export default LinksListDrawer;
