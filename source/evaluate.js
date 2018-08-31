
////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2018, Perry L Miller IV
//  All rights reserved.
//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//
//  Module for evaluating an arithmetic expression.
//
//  Typical input looks like this:
//
//    "5 * 2 - 4 * 2 + 4 / 2 + 3 * 5"
//
////////////////////////////////////////////////////////////////////////////////

const lodash = require ( "lodash" );


////////////////////////////////////////////////////////////////////////////////
//
//  Evaluate the expression which should just be multiplication and/or division.
//
////////////////////////////////////////////////////////////////////////////////

const multiplyAndDivide = function ( exp )
{
  // If we can't find these symbols then assume it is a number.
  if ( ( -1 === exp.indexOf ( "*" ) ) &&
       ( -1 === exp.indexOf ( "/" ) ) )
  {
    return parseFloat ( exp );
  }

  // When we get down here we know it is an expression.

  // Get the number on the left of the symbol.
  let left = parseFloat ( exp );
  exp = exp.substr ( left.toString().length );

  // Make sure.
  if ( isNaN ( left ) )
  {
    throw new Error ( "Invalid expression:", exp );
  }

  // Loop through the expression until it is empty.
  while ( exp.length )
  {
    // Get the symbol and discard it from the expression.
    const symbol = exp.charAt ( 0 );
    exp = exp.substr ( 1 );

    // Get the number on the right of the symbol
    // and discard it from the expression.
    const right = parseFloat ( exp );
    exp = exp.substr ( right.toString().length );

    // Make sure.
    if ( isNaN ( right ) )
    {
      throw new Error ( "Invalid expression:", exp );
    }

    // Do the correct math.
    if ( "*" === symbol )
    {
      left *= parseFloat ( right );
    }
    if ( "/" === symbol )
    {
      left /= parseFloat ( right );
    }
  }

  // Return the answer.
  return left;
};


////////////////////////////////////////////////////////////////////////////////
//
//  Main function that evaluates an arithmetic expression.
//
////////////////////////////////////////////////////////////////////////////////

const evaluate = function ( exp )
{
  // console.log ( "exp:", exp );

  // Handle bad input.
  if ( !lodash.isString ( exp ) )
  {
    throw new Error ( "Expression has to be a string" );
  }

  // Remove any white space.
  exp = exp.replace ( /\s/g,"" );
  // console.log ( "exp:", exp );

  // Use one symbol for division.
  exp = exp.replace ( /÷/g, "/" );
  // console.log ( "exp:", exp );

  // Minus a negative is plus a positive.
  exp = exp.replace ( /--/g, "+" );
  // console.log ( "exp:", exp );

  // Move these special cases out of the way.
  exp = exp.replace ( /\*-/g, "times_negative" );
  exp = exp.replace ( /\/-/g, "divided_by_negative" );
  exp = exp.replace ( /\+-/g, "plus_negative" );

  // Replace all subtractions with addition of the negative.
  exp = exp.replace ( /-/g, "+-" ); // This is the line that does it.

  // Put things back.
  exp = exp.replace ( /times_negative/g, "*-" );
  exp = exp.replace ( /divided_by_negative/g, "/-" );
  exp = exp.replace ( /plus_negative/g, "+-" );
  // console.log ( "exp:", exp );

  // Since we've replaced all the subtractions with addition of negatives,
  // we just have to split on the addition symbol.
  let parts = exp.split ( "+" );
  // console.log ( "parts:", parts );

  // Initialize the answer.
  let answer = 0;

  // Each part should either be a numerical value, or an expression that just
  // has multiplication and/or division. Loop through the parts and evaluate
  // them, adding their numerical values to the answer.
  for ( let i = 0; i < parts.length; ++i )
  {
    parts[i] = multiplyAndDivide ( parts[i] );
  }
  // console.log ( "parts:", parts );

  for ( let i = 0; i < parts.length; ++i )
  {
    answer += parseFloat ( parts[i] );
  }
  // console.log ( "answer:", answer );

  return answer;
};


////////////////////////////////////////////////////////////////////////////////
//
//  The end of this module.
//
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  evaluate
};
