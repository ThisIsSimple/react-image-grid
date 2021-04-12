# React Image Grid

Facebook-like Image Grid for React.

## Installation

`npm i @cordelia273/react-image-grid`

`yarn add @cordelia273/react-image-grid`

## Structure

## Usage

```jsx
import ReactImageGrid from "@cordelia273/react-image-grid";

const App = () => {
  const images = [
    "https://cdn.pixabay.com/photo/2021/03/26/07/18/japanese-cherry-blossoms-6125088_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/12/12/07/01/beomeosa-temple-4689959_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/08/09/21/54/lake-1581879_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/10/15/21/34/cat-4552983_1280.jpg",
  ];

  return (
    <div style={{ maxWidth: 750, margin: "auto" }}>
      <ReactImageGrid images={images} />
    </div>
  );
};
```

![Result Screenshot](./screenshot.png)

## Options

| option    | type   | description                       | required | default  |
| --------- | ------ | --------------------------------- | -------- | -------- |
| images    | array  | array of image urls               | Yes      | []       |
| className | string | class name of container           | No       | ''       |
| onClick   | func   | return image url on image click   | No       | () => {} |
| modal     | bool   | show modal gallery on iamge click | No       | true     |
