
/* IMPORT */

import {describe} from 'fava';
import colors from 'tiny-colors';
import truncate from '../dist/index.js';

/* MAIN */

describe ( 'ANSI Truncate', it => {

  it ( 'works with escaped shorter strings', t => {

    t.is ( truncate ( colors.red ( 'foo' ), 100 ), colors.red ( 'foo' ) );

  });

  it ( 'works with escaped longer strings', t => {

    t.is ( truncate ( colors.red ( 'foo' ), 2 ), colors.red ( 'f…' ) );

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
    t.is ( truncate ( colors.red ( 'foo' ), 2, { ellipsis: colors.blue ( '+' ) } ), colors.red ( `f${colors.blue ( '+' )}` ) );

  });


});
