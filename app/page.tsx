import Logo from "@/components/common/Logo";
import PageSection from "@/components/common/Page";
import { Typography } from "@/components/common/Typography";

export default function Posts() {
  return (
    <PageSection className={"grid place-items-center"}>
      <div className={"flex flex-col items-center gap-8"}>
        <Logo className={"size-100"} />
        <Typography render={<h1 />}>UI Bloom</Typography>
      </div>
    </PageSection>
  );
}
