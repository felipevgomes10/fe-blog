import { constants } from "@/utils/constants";
import type { ExtraProps } from "react-markdown";
import { CopyableLink } from "./copyable-link";

export type BookmarkableHeadingProps = JSX.IntrinsicElements["h1"] &
  ExtraProps & {
    children: string;
  };

export function BookmarkableHeading(
  heading: (typeof constants.headings)[number],
  props: Readonly<BookmarkableHeadingProps>,
) {
  const { node, children, ...rest } = props;
  const id = (children as string).toLowerCase().replace(/\s/g, "-");

  const Heading = heading;

  return (
    <CopyableLink id={id}>
      <Heading {...rest} id={id}>
        {children}
      </Heading>
    </CopyableLink>
  );
}
