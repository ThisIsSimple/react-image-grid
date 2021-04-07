# React Image Grid

Facebook-like image grid for react. (beta)

## Installation

`npm i react-image-grid`
`yarn add react-image-grid`

## Usage

```jsx
import ReactImageGrid from "react-image-grid";

const App = () => {
  const images = [
    "https://cdn.pixabay.com/photo/2021/03/26/07/18/japanese-cherry-blossoms-6125088_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/12/12/07/01/beomeosa-temple-4689959_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/08/09/21/54/lake-1581879_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/10/15/21/34/cat-4552983_1280.jpg",
  ];

  return <ReactImageGrid images={images} />;
};
```

## Options

| option    | type     | description             | required | default  |
| --------- | -------- | ----------------------- | -------- | -------- |
| images    | array    | Array of image urls     | Yes      | []       |
| className | string   | Class name of container | No       | ''       |
| onClick   | function | On image click          | No       | () => {} |

## Todo

- [x] onClick method.
- [ ] when image is exact square.
- [ ] other options.
