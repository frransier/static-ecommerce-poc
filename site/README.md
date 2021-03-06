
## 🚀 Quick start
## Prereq to prereqs: You need a modern version of node.js (>10.5.0)


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
3. **Get Sanity, Snipcart and Algolia api keys from 1password**

    Look for .env in 1password

3.  **Run site in dev**
    
    ```sh
    cd c:\projects\static-ecommerce-poc\site
    gatsby develop
    ```
    
    Your site is now running at `http://localhost:8000`  
    Your local graphql explorer is running at `http://localhost:8000/___graphql`
    
4. **Run studio in dev**

    ```sh
    cd c:\projects\static-ecommerce-poc\studio
    sanity start
    ```
    Your studio is now running at `http://localhost:3333`
    
    
## 🧐 Wat is dis?

This is a static ecommerce proof of concept site built with:

Gatsby - a static site generator  
Sanity - a headless cms  
Snipcart - an ecommerce engine
Algolia - a search index
Netlify - for effortless continous integration, deployment and hosting   

