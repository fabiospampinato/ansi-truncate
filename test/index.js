
/* IMPORT */

import {describe} from 'fava';
import truncate from '../dist/index.js';

/* HELPERS */

const RED_START = '\u001b[31m';
const RED_END = '\u001b[39m';
const BLUE_START = '\u001b[34m';
const BLUE_END = '\u001b[39m';
const RESET = '\u001b[0m';

/* MAIN */

describe ( 'ANSI Truncate', it => {

  it ( 'works with escaped shorter strings', t => {

    t.is ( truncate ( `${RED_START}foo${RED_END}`, 100 ), `${RED_START}foo${RED_END}` );

  });

  it ( 'works with escaped longer strings', t => {

    t.is ( truncate ( `${RED_START}foo${RED_END}`, 2 ), `${RED_START}f…${RESET}` );

  });

  it ( 'works with plain shorter strings', t => {

    t.is ( truncate ( 'foo', 100 ), 'foo' );

  });

  it ( 'works with plain longer strings', t => {

    t.is ( truncate ( 'foo', 2 ), 'f…' );

  });

  it ( 'works with a non-sensical width', t => {

    t.is ( truncate ( 'foo', -1 ), '' );

  });

  it ( 'works with a custom ellipsis', t => {

    t.is ( truncate ( 'foo', 2, { ellipsis: '+' } ), 'f+' );
    t.is ( truncate ( 'foo', 2, { ellipsis: '' } ), 'fo' );
    t.is ( truncate ( `${RED_START}foo${RED_END}`, 2, { ellipsis: `${BLUE_START}+${BLUE_END}` } ), `${RED_START}f${BLUE_START}+${BLUE_END}${RESET}` );

  });

});
