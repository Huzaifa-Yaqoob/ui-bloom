const importCode = `import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Code,
  Large,
  Lead,
  Muted,
  Small,
  BlockQoute,
  Title,
} from '@/components/ui/bloom/typography'`;

const componentCode = `export default function TypographyView() {
  return (
    <div className="space-y-8">
      <Title>Typography</Title>

      <div className="space-y-4">
        <H1>Heading 1 - The Quick Brown Fox</H1>
        <H2>Heading 2 - Jumps Over The Lazy Dog</H2>
        <H3>Heading 3 - Pack My Box With Five Dozen Liquor Jugs</H3>
        <H4>Heading 4 - The Five Boxing Wizards Jump Quickly</H4>
        <H5>Heading 5 - How Vexingly Quick Daft Zebras Jump</H5>
        <H6>Heading 6 - The Quick Onyx Goblin Jumps</H6>
      </div>

      <div className="space-y-4">
        <P>
          This is a regular paragraph with some text. It demonstrates the base
          typography style. The paragraph includes proper line height and
          spacing that adjusts responsively.
        </P>

        <BlockQoute>
          This is a block quote that showcases how quotations look. It includes
          proper styling with a left border and italic text that adjusts based
          on screen size.
        </BlockQoute>

        <P>
          Here is some text with a <Code>code snippet</Code> embedded within it.
          Below are different text variations:
        </P>

        <div className="space-y-2">
          <div>
            <Lead>
              This is lead text that stands out from regular paragraphs
            </Lead>
          </div>
          <div>
            <Large>This is large text for emphasis</Large>
          </div>
          <div>
            <Small>This is small text for less emphasis</Small>
          </div>
          <div>
            <Muted>This is muted text for secondary information</Muted>
          </div>
        </div>
      </div>
    </div>
  );
}`;

export { importCode, componentCode };
