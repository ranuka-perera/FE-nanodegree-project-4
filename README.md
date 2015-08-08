## Website Performance Optimization portfolio project

### About the repo

The website has 3 versions and 2 branches. The main development is done in the `src` folder of the **dev** branch. The **master** branch contains the `src` folder, `dev` folder & the `dist` folder.
The contents in the folders are as follows.

- src  ->   Contains the unprocessed source code. [weblink](https://ranuka-perera.github.io/FE-nanodegree-project-4/src/index.html)
- dev  ->   Contains the sourcecode that is inlined and preprocessed. It is the final code before minification. [weblink](https://ranuka-perera.github.io/FE-nanodegree-project-4/dev/index.html)
- dist ->   Preprocessed, inlined and minified code. [weblink](https://ranuka-perera.github.io/FE-nanodegree-project-4/dist/index.html)

All of the code in all folders are runnable.

### PageSpeed Insights link

The website has a PageSpeed Insight score of 92/100 in mobile and a 94/100 in desktop using the public github-pages servers. (Even with its caching issues)
[weblink](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Franuka-perera.github.io%2FFE-nanodegree-project-4%2Fdist%2Findex.html)

### Gulp automated tasks

The workflow of developing the app is maintained by gulp tasks. This is the list of main gulp tasks.

- `gulp watch`    ->  Inline and minify the js & css, optimize images and create the dist directory. Rerun if the code changes.
- `gulp devwatch` ->  Inline the (without minication) css & js, optimize the images and create dev directory. Rerun if the code changes.
- `gulp deploy`   ->  Create the dev & dists directory and upload all those directories with the src directory to the `gh-pages` branch for web deployment.

### Some of the Optimisations done

- Standardise the image paths by using local links only.
- Resize images where the large sizes are unnecessary.
- Add media queries to not download the stylesheeet used for printing.
- Make javascript code async. (Font load and timing js).
- Make the pizza page work on Firefox & Firefox mobile.
- Optimize sliding pizzas.
- Optimize pizza reszing to be under 5ms.
- Use gulp to inline javascript code and css.
