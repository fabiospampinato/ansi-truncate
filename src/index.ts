
/* IMPORT */

import fastStringTruncatedWidth from 'fast-string-truncated-width';
import {ANSI_RE, ELLIPSIS, RESET} from './constants';
import type {Options} from './types';

/* MAIN */

//TODO: Maybe detect where "RESET" is necessary more precisely

const truncate = ( input: string, width: number, options?: { ellipsis?: string } ): string => {

  const limit = width;
  const ellipsis = options?.ellipsis ?? ELLIPSIS;
  const {index, ellipsed, truncated} = fastStringTruncatedWidth ( input, { limit, ellipsis } );

  if ( !truncated ) return input;

  const slice = input.slice ( 0, index );
  const resettable = ANSI_RE.test ( slice );

  return `${slice}${ellipsed ? ellipsis : ''}${resettable ? RESET : ''}`;

};

/* EXPORT */

export default truncate;
export type {Options};
