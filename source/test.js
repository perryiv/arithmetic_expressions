
////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2018, Perry L Miller IV
//  All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//
//  Main test file.
//
////////////////////////////////////////////////////////////////////////////////

const { evaluate } = require ( "./evaluate" );

const { expect } = require ( "chai" );


////////////////////////////////////////////////////////////////////////////////
//
//  Test evaluating arithmetic expressions.
//
////////////////////////////////////////////////////////////////////////////////

describe ( "Evaluate", function ()
{
  const test = function ( expression )
  {
    expect ( evaluate ( expression ) ).equal ( eval ( expression ) );
  };

  it ( "Does the math correctly for valid expressions", function()
  {
    test ( "3 * 4" );
    test ( "3 * -4" );
    test ( "0.2 * -1.7 / 4.3 * -9.1 + 7.7" );
    test ( "5 * 2 - -4 * 2 + 4 / 2 + 4 / -2 - 4 / 2 + -4 / 2 + 3 * 5 + 6 * 0.5 / -2 - 7 + 10" );
  } );

  it ( "Throws exceptions for invalid expressions", function()
  {
    expect ( function() { evaluate ( "*2 + 2" ); } ).to.throw ( "Invalid expression" );
    expect ( function() { evaluate ( "2 + 2*" ); } ).to.throw ( "Invalid expression" );
    expect ( function() { evaluate ( "/2 + 2" ); } ).to.throw ( "Invalid expression" );
    expect ( function() { evaluate ( "2 + 2/" ); } ).to.throw ( "Invalid expression" );
    expect ( function() { evaluate ( "2 ** 2" ); } ).to.throw ( "Invalid expression" );
    expect ( function() { evaluate ( "2 /* 2" ); } ).to.throw ( "Invalid expression" );
  } );
} );
