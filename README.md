# Plantilla de webpack para proyectos web front-end

Plantilla para desarrollar aplicaciones con Javascript con las
siguientes dependencias instaladas como `devDependencies` mediante el gestor de paquetes de `node` (16.15.0), `npm` (8.5.5):

- Babel
- css, sass, y style loader
- webpack
- webpack-bundle-analyzer
- webpack-cli
- webpack-dev-server
- Eslint con la siguiente configuración:

![Captura de pantalla de 2022-10-22 11-30-26](https://user-images.githubusercontent.com/49815325/197332678-e26822dd-33ee-4b9c-9ac4-773da24b7a75.png)

Habiendo instalado `node`, para instalar `npm` en un directorio local basta con ejecutar en la terminal:

```
$ npm install
```

Para disparar el entorno de desarrollo:

```
$ npm run dev
```

Para empaquetar las dependencias y compilar en `dist/`:

```
$ npm run build
```

Para instalar un paquete como dependencia de desarrollo:

```
$ npm install package-name --save-dev
```

o

``` 
$ npm install -D package-name
```

Para instalarla como dependencia de producción:

```
$ npm install package-name
```
