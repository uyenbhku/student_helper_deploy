# description 
A template to create a server-side rendering app using Flask and React. 

# prerequisites
Please install Node, NPM, and Python before continuing

# development
1. Install all packages in the requirements.txt and package.json

```
npm install
pip install -r requirements.txt
```
2. Start the development
Run this to make the webpack compile the babel to javascript
```
npm run build
```

To activate the watcher to watch any changes in the view and compile to javascript, execute
```
npx babel --watch view  --out-dir static/js
```

And run the Flask app
```
flask run --debug #flag debug is optional but recommended
```

3. Write code

Now, just write services using Flask and frontend code using React in the `view/`

# production
To be updated...


# reference
- https://realpython.com/the-ultimate-flask-front-end/#react-explained
- https://ephemera.medium.com/using-react-with-flask-without-create-react-app-eb81edb641b8
