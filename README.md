## 🚀 Quick start will only be a quick start if you have node.js > 10.5.0 installed

1.  **Prereqs**

    Install gatsby-cli and sanity-cli globally

    ```sh
    # gatsby-cli
    npm install -g gatsby-cli

    # sanity-cli
    npm install -g @sanity/cli
    ```

2.  **Clone this repo**

    ```sh
    git clone https://github.com/frransier/static-ecommerce-poc.git
    ```

3.  **Get the project key set from 1password**

    Search for `static-ecommerce-poc` in 1password. Copy the key file and follow the instructions in `site/_.env.README`

4.  **Run site in dev**

    ```sh
    cd c:\projects\static-ecommerce-poc\site
    gatsby develop
    ```

    site is now running at `http://localhost:8000`  
    local graphql explorer is running at `http://localhost:8000/___graphql`

5.  **Run studio in dev**

    ```sh
    cd c:\projects\static-ecommerce-poc\studio
    sanity start
    ```

    Your studio is now running at `http://localhost:3333`

## 🧐 Wat is dis?

This is a static ecommerce proof of concept site built with:

Gatsby - static site generator  
Sanity - headless cms  
Snipcart - ecommerce engine  
Netlify - hosting, serverless functions, deployment and continous integration
Algolia - search and indexing service

## Live environment links

[Site](https://static-ecommerce-poc.netlify.com)  
[Studio](https://static-ecommerce-poc.sanity.studio) - credentials in 1password
