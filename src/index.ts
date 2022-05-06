
/* IMPORT */

import {ANSI_RE, ELLIPSIS} from './constants';
import getWidth from './get_width';
import strip from './strip';

/* MAIN */

const truncate = ( str: string, width: number, options: { ellipsis?: string } ): string => {

  if ( width <= 0 ) return '';

  const strNoAnsi = strip ( str );

  if ( getWidth ( strNoAnsi ) <= width ) return str;

  const ellipsis = options?.ellipsis ?? ELLIPSIS;

  width -= getWidth ( strip ( ellipsis ) );

  const parts = str.split ( ANSI_RE );

  let truncated = '';
  let truncatedWidth = 0;

  for ( let i = 0, l = parts.length; i < l; i++ ) {

    const part = parts[i];

    if ( !( i % 2 ) ) { // Non-ANSI part

      const partWidth = getWidth ( part );

      if ( ( truncatedWidth + partWidth ) >= width ) { // Exceeding part, truncating and exiting

        const escapesRight = parts.slice ( i ).filter ( ( _, i ) => ( i % 2 ) ).join ( '' );

        return `${truncated}${part.slice ( 0, width - partWidth )}${ellipsis}${escapesRight}`;

      }

      truncatedWidth += partWidth;

    }

    truncated += part;

  }

  return str;

};

/* EXPORT */

export default truncate;
