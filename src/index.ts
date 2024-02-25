
/* IMPORT */

import stringWidth from 'fast-string-width';
import {ANSI_RE, ELLIPSIS} from './constants';
import strip from './strip';

/* MAIN */

const truncate = ( str: string, width: number, options?: { ellipsis?: string } ): string => {

  if ( width <= 0 ) return '';

  const strNoAnsi = strip ( str );

  if ( stringWidth ( strNoAnsi ) <= width ) return str;

  const ellipsis = options?.ellipsis ?? ELLIPSIS;

  width -= stringWidth ( strip ( ellipsis ) );

  const parts = str.split ( ANSI_RE );

  let truncated = '';
  let truncatedWidth = 0;

  for ( let i = 0, l = parts.length; i < l; i++ ) {

    const part = parts[i];

    if ( !( i % 2 ) ) { // Non-ANSI part

      const partWidth = stringWidth ( part );

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
