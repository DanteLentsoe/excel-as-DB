import { Tooltip as ReactToolTip } from 'react-tooltip';
import { CSSProperties, FC, ReactNode } from 'react';

export type TooltipProps = {
  /** Unique identifier for the tooltip.*/
  id: string;
  /** The content that will be displayed inside the tooltip. */
  text: ReactNode;
  /** The anchor selector for targeting the tooltip. Defaults to '.my-anchor-element' */
  anchorSelect?: string;
  /** The position of the tooltip. Defaults to 'top'. */
  place?: 'top' | 'right' | 'bottom' | 'left';

  /** Additional class names to apply to the tooltip. */
  className?: string;

  style?: CSSProperties;
};

/**
 * Displays a tooltip with the specified content.
 *
 * This component wraps the `react-tooltip` library to provide easy tooltip functionality.
 * It supports customization for the anchor element and position.
 *
 * @param {TooltipProps} props - The props for the Tooltip component.
 * @param {ReactNode} text - The content to display within the tooltip.
 * @param {string} [anchorSelect=".my-anchor-element"] - The CSS selector for the anchor element.
 * @param {'top' | 'right' | 'bottom' | 'left'} [place='top'] - The position of the tooltip.
 * @returns {JSX.Element} The Tooltip component.
 *
 *  * @example
 * <div>
 *   <a data-tooltip-id="exampleTooltip">Hover me</a>
 *   <Tooltip
 *   anchorSelect="#example-anchor"
 *  id="exampleTooltip"
 *   place="bottom"
 * >
 *   Hover over me to see the tooltip!
 * </Tooltip>
 *  </div>
 */
export const Tooltip: FC<TooltipProps> = ({
  id,
  text,
  place = 'top',
  className,
  style,
}) => {
  return (
    <ReactToolTip id={id} className={className} style={style} place={place}>
      {text}
    </ReactToolTip>
  );
};
