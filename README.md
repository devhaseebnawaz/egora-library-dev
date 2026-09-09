# Egora Library

A custom React component library built with Material-UI (MUI) designed for seamless integration with Franchise Theme Editor, Preview, and Live Store environments. Compatible with both React and Next.js projects.

- Franchise Theme Editor and Preview
- Live Store  

The library is compatible with both **React** and **Next.js** projects.  

# Installation

# Production Version

 `npm install egora-library`

# Environment-Specific Versions

  # For development
  `npm install egora-library-dev`

  # For testing
  `npm install egora-library-test`
 
  # For staging
 `npm install egora-library-staging`

# Requirements

  - React 16.8+
  - Material-UI (MUI) 5.x
  - Node.js 14+

# To Reflect the changes in Dist File 

 1. Remove dist folder node modules and package.lock.json file 
   `rm -rf dist node_modules package-lock.json`

 2. Install the dependencies again 
   `npm i --force`  

 3. Create the build
   `npm run build`  

# Troubleshooting

  - If encountering issues after installation:
  - Clear your project's node_modules and package-lock.json
  - Reinstall dependencies
  - Restart your development server

# Environment Setup

 - Set the environment variable in a .env file:

 # For React
 - REACT_APP_ENV='development'   # development
 - REACT_APP_ENV='test'          # test
 - REACT_APP_ENV='staging'       # staging
 - REACT_APP_ENV='production'    # production

 # For Next.js
 - NEXT_PUBLIC_ENV='development'   # development
 - NEXT_PUBLIC_ENV='test'          # test
 - NEXT_PUBLIC_ENV='staging'       # staging
 - NEXT_PUBLIC_ENV='production'    # production

 # DigitalOcean Spaces image delivery
 # Use the public CDN endpoint in the client application. Do not expose
 # SPACES_ACCESS_KEY or SPACES_SECRET_KEY in React/Next.js environment vars.
 - REACT_APP_SPACES_NAME='egora-dev'
 - REACT_APP_SPACES_ENDPOINT='https://egora-dev.sgp1.cdn.digitaloceanspaces.com'

 # For Next.js, use the NEXT_PUBLIC_ equivalents instead:
 - NEXT_PUBLIC_SPACES_NAME='egora-dev'
 - NEXT_PUBLIC_SPACES_ENDPOINT='https://egora-dev.sgp1.cdn.digitaloceanspaces.com'

 # The store can also keep its existing names:
 - NEXT_PUBLIC_DO_SPACES_BUCKET_NAME='egora-dev'
 - NEXT_PUBLIC_DO_SPACES_CDN_URL='https://egora-dev.sgp1.cdn.digitaloceanspaces.com'

 # Access and secret keys belong only in the server-side upload/API service.

# Notes

 - Automatically loads the correct package based on environment.  
 - No manual setup.(Egora project detects environment and installs automatically).  
 - Always rebuild the library after making changes to reflect updates in the `dist` folder.  
 - Dynamic imports enable seamless environment switching.

# Team 

  - Mahum Maqbool - https://github.com/mahum24 
  - Muhammad Sufyan - https://github.com/msufyan634
  - Musfirah Saleem - https://github.com/musfirah-saleem
  - Zain ul Abideen - https://github.com/ZA535
