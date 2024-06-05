# Auto APP
It is a rapid internal tool development platform.
Create custom internal tools quickly and easily, with less code and fewer resources. Boost productivity, cut costs, and deploy your tools faster, all while ensuring enterprise-grade security.

Demo Link: https://auto-app-client.vercel.app/

![image](https://github.com/609harsh/AutoApp_Client/assets/97297407/1c424170-d037-45a6-afcc-7af1498d4edb)

# Dashboard
Place to manage all your apps.

![image](https://github.com/609harsh/AutoApp_Client/assets/97297407/756c3b87-e4e0-4936-b59a-0c994f5385dc)

# Editor
Place to create your app,drag and drop components, preview and publish it on the web

![image](https://github.com/609harsh/AutoApp_Client/assets/97297407/2f997dca-9d11-4c87-a541-b636efa97c64)


### Tech Stack 
- React
- TypeScript
- Vite

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname
  }
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

Have a look at out Auto-APP-Server repository to know more!!!
