/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-ts-ignore */

import getTemplate from '.';

const heading = {
  signup: 'verify email'
};
getTemplate;


export const commonTemplate = (type: string, data: object) => {
  let headerText;
  switch (type) {
  case `${type}`:
    // @ts-ignore
    headerText = heading[type];
    break;
  default:
    headerText = '';
    break;
  }

  return `
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <title></title>
  </head>
  <body>
          
        ${getTemplate(type, data)}
        
      </table>
  </body>
  </html>`;
};

